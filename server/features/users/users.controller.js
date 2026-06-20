import bcrypt from 'bcrypt'

import { usersModel } from './users.model.js'

const USER_ROLES = new Set(['admin', 'teacher', 'student'])

export const usersController = {
    async getUsers(req, res) {
        try {
            const users = await usersModel.getUsers()

            return res.json(users)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения пользователей',
            })
        }
    },
    async createUser(req, res) {
        try {
            const {
                email,
                password,
                role,
                full_name,
            } = req.body

            if (!email || !password || !role || !full_name) {
                return res.status(400).json({
                    message: 'Не все поля заполнены',
                })
            }

            if (!USER_ROLES.has(role)) {
                return res.status(400).json({
                    message: 'Роль должна быть admin, teacher или student',
                })
            }

            const normalizedEmail = email.trim().toLowerCase()
            const normalizedFullName = full_name.trim()

            if (!normalizedEmail || !normalizedFullName) {
                return res.status(400).json({
                    message: 'Email и ФИО не могут быть пустыми',
                })
            }

            const existingUser =
                await usersModel.getUserByEmail(normalizedEmail)

            if (existingUser) {
                return res.status(400).json({
                    message: 'Пользователь уже существует',
                })
            }

            const password_hash = await bcrypt.hash(password, 10)

            const user = await usersModel.createUser({
                email: normalizedEmail,
                password_hash,
                role,
                full_name: normalizedFullName,
            })

            return res.status(201).json(user)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка создания пользователя',
            })
        }
    },
    async deleteUser(req, res) {
        try {
            const { id } = req.params

            const user = await usersModel.deleteUser(id)

            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден',
                })
            }

            return res.json({
                message: 'Пользователь удален',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления пользователя',
            })
        }
    },
}
