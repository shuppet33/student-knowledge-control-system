import styles from './main.module.css'
import {Button} from "$shared/ui-kit/button";
import {Modal} from "$shared/ui-kit/modal";
import {atom} from "@reatom/core";
import {reatomComponent} from "@reatom/react";
import {useEffect, useState} from "react";
import {authAtom} from "$entities/auth/auth.atom.ts";
import {useNavigate} from "@tanstack/react-router";
import {loginAsync} from "$entities/auth/auth.actions.ts";

const loginAtom = atom(false)

export const MainPage = reatomComponent(() => {
        const isOpenModal = loginAtom()
        const navigate = useNavigate()

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const {token, role} = authAtom()

        useEffect(() => {
            if (token && role) {
                navigate({to: `/${role}`})
            }
        }, [token, role])

        return (
            <>
                <div className={styles.layout}>
                    <div className={styles.header}>
                        <div className={styles.container}>
                            <Button onClick={() => loginAtom.set(true)}>войти</Button>
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.wrapper}>
                            <h1 className={styles.title}>ИМСИТ</h1>
                            <h2 className={styles.subtitle}>тесты</h2>
                        </div>
                    </div>
                </div>

                <Modal
                    open={isOpenModal}
                    onOpenChange={(open) => loginAtom.set(open)}
                    hideCloseButton
                >
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type="text"/> <br/>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="text"/>
                    <Button onClick={() => loginAsync(email, password)}>Войти</Button>
                </Modal>
            </>

        )
    }
)