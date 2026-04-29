
export const serverError = (res, message = 'ошибка сервера') => {
    return res.status(500).json({
        error: message
    });
}

export const clientError = (res, message = 'ошибка клиента') => {
    return res.status(400).json({
        error: message
    });
}