import {clientError} from "../utils/errors.util.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return clientError(res, 'Нет токена');
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        return clientError(res, 'Токен невалиден или истёк');
    }
}
