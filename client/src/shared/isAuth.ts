export const isAuth = () => {
    return localStorage.getItem('isAuth') === 'true'
}

export const signIn = async () => {
    return localStorage.setItem('isAuth', 'true')
}

export const signOut = async () => {
    return localStorage.removeItem('isAuth')
}