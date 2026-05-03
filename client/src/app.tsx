import {reatomComponent} from "@reatom/npm-react";
import {BrowserRouter as Router, Link, Navigate, Route, Routes, useLocation} from "react-router";
import {ConfigProvider, theme as antdTheme} from "antd";
import {authAtom, isAuthAtom, refreshAsync} from './entities/api';
import {type FC, type ReactNode, useEffect} from "react";
import {AdminMainPage} from "./pages/admin";
import {themeAtom} from "./entities/theme.ts";
import {MainPage} from "./pages/main";

// admin@test.com


const RequireAuth: FC<{ children: ReactNode }> = reatomComponent(({ctx, children}) => {
    const location = useLocation();
    const isAuth = ctx.spy(isAuthAtom)
    const {isPending} = ctx.spy(refreshAsync.statusesAtom);

    if (isPending) {
        return <div>loading...</div>;
    }

    if (!isAuth) {
        return <Navigate to="/" state={{from: location}} replace/>;
    }

    return children;
})
const RequireGuest: FC<{ children: ReactNode }> = reatomComponent(({ctx, children}) => {
    const {role} = ctx.spy(authAtom);
    const isAuth = ctx.spy(isAuthAtom);

    if (isAuth) {
        return <Navigate to={`/${role}`} replace/>;
    }

    return children;
});

export const App = reatomComponent(({ctx}) => {
    const theme = ctx.spy(themeAtom)

    useEffect(() => {
        refreshAsync(ctx);
    })

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    theme === 'dark'
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
            }}
        >
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/admin">Admin</Link>
                            </li>
                        </ul>
                    </nav>

                    <Routes>
                        <Route path="/" element={
                            <RequireGuest>
                                <MainPage/>
                            </RequireGuest>
                        }/>
                        <Route path="/admin" element={
                            <RequireAuth>
                                <AdminMainPage/>
                            </RequireAuth>
                        }
                        />
                    </Routes>
                </div>
            </Router>
        </ConfigProvider>
    )
})

