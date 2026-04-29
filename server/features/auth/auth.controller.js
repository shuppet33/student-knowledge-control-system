import {clientError, serverError} from "../../utils/errors.util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {authModel} from "./auth.model.js";

export const authController = {
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return clientError(res, 'email or password required');
        }

        try {
            const user = await authModel.getUserByEmail(email);

            if (!user) {
                return clientError(res, 'user not found');
            }

            const isValid = bcrypt.compareSync(password, user.password_hash);

            if (!isValid) {
                return clientError(res, 'password не совпадает');
            }

            const token = jwt.sign(
                {
                    role: user.role,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({
                role: user.role,
                token,
            });
        } catch (e) {
            return serverError(res, 'Ошибка сервера');
        }
    },

    me(req, res) {
        return res.json(req.user);
    }
}