import styles from './not-found.module.css'
import {useNavigate} from "@tanstack/react-router";
import {Button} from 'antd'
import {authAtom} from '$entities/auth/auth.atom.ts';

export const NotFoundPage = () => {
    const navigate = useNavigate()
    const { role } = authAtom()

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperText}>
                <h1 className={styles.title}>404</h1>

                <p className={styles.text}>
                    такой страницы не существует
                </p>
            </div>

            <Button
                type={'primary'}
                onClick={() => role ? navigate({ to: `/${role}` }) : navigate({ to: `/` })}
            >
                вернуться на главную
            </Button>
        </div>
    )
}