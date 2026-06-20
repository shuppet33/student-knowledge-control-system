import jwt from 'jsonwebtoken'

import { db } from '../db/connect.js'

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Требуется Bearer access token',
        })
    }

    const token = authHeader.slice('Bearer '.length).trim()

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const { rows } = await db.query(
            `
                SELECT id, email, role, full_name
                FROM users
                WHERE id = $1
                    AND deleted_at IS NULL
                LIMIT 1
            `,
            [payload.id],
        )

        const user = rows[0]

        if (!user) {
            return res.status(401).json({
                message: 'Пользователь не найден или удалён',
            })
        }

        req.user = user

        return next()
    } catch (error) {
        console.error(error)

        return res.status(401).json({
            message: 'Access token невалиден или истёк',
        })
    }
}

export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Требуется авторизация',
            })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Недостаточно прав для выполнения операции',
            })
        }

        return next()
    }
}
