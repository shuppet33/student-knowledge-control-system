import {clientError, serverError} from "../../utils/errors.util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {authModel} from "./auth.model.js";

export const authController = {
    async login(req, res) {
        const {email, password} = req.body;

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

            const accessToken = jwt.sign(
                {id: user.id, role: user.role, email: user.email},
                process.env.JWT_SECRET,
                {expiresIn: '15m'}
            );

            const refreshToken = jwt.sign(
                {id: user.id, role: user.role, email: user.email},
                process.env.JWT_REFRESH_SECRET,
                {expiresIn: '7d'}
            );

            const hash = await bcrypt.hash(refreshToken, 10);

            await authModel.createRefreshToken({
                userId: user.id,
                tokenHash: hash,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                role: user.role,
                token: accessToken,
            });
        } catch (e) {
            return serverError(res, 'Ошибка сервера');
        }
    },

    me(req, res) {
        return res.json(req.user);
    },

    async refresh(req, res) {
        const token = req.cookies.refreshToken;

        if (!token) {
            return clientError(res, 'Нет refresh токена');
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            const tokens = await authModel.getRefreshTokensByUser(payload.id);

            let valid = false;

            for (const t of tokens) {
                if (await bcrypt.compare(token, t.token_hash)) {
                    valid = true;
                    break;
                }
            }

            if (!valid) {
                return clientError(res, 'Токен не найден');
            }

            const accessToken = jwt.sign(
                {
                    id: payload.id,
                    role: payload.role,
                    email: payload.email,
                },
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );

            return res.json({token: accessToken, role: payload.role});

        } catch (e) {
            return clientError(res, 'Refresh токен невалиден');
        }
    },

    async logout(req, res) {
        const token = req.cookies.refreshToken;

        if (token) {
            const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            const tokens = await authModel.getRefreshTokensByUser(payload.id);

            for (const t of tokens) {
                if (await bcrypt.compare(token, t.token_hash)) {
                    await authModel.deleteRefreshToken(t.id);
                }
            }
        }

        res.clearCookie('refreshToken', {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.json({success: true});
    }
}