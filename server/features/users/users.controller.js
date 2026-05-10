import bcrypt from 'bcrypt'

import { usersModel } from './users.model.js'

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

            const existingUser = await usersModel.getUserByEmail(email)

            if (existingUser) {
                return res.status(400).json({
                    message: 'Пользователь уже существует',
                })
            }

            const password_hash = await bcrypt.hash(password, 10)

            const user = await usersModel.createUser({
                email,
                password_hash,
                role,
                full_name,
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

            await usersModel.deleteUser(id)

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