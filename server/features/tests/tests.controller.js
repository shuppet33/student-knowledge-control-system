import { testsModel } from './tests.model.js'

export const testsController = {
    async getTests(req, res) {
        try {
            const tests = await testsModel.getTests()

            return res.json(tests)
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка получения тестов',
            })
        }
    },

    async deleteTest(req, res) {
        try {
            const { id } = req.params
            const test = await testsModel.deleteTest(id)

            if (!test) {
                return res.status(404).json({
                    message: 'Тест не найден',
                })
            }

            return res.json({
                message: 'Тест удалён',
            })
        } catch (error) {
            console.error(error)

            return res.status(500).json({
                message: 'Ошибка удаления теста',
            })
        }
    },
}
