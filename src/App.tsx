import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { authRoutes, regularRoutes } from "./routes/routesData";
import Layout from "./hocs/Layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./store/settings/slice";
import { layoutTheme } from "./store/settings/types";
import { RootState } from "./store";

const App = () => {

    const dispatch = useDispatch()

    const sidebarTheme = useSelector((state:RootState) => state.settings.theme)

    useEffect(()=>{
        const theme = localStorage.getItem("academic-theme")
        if(theme) {
            dispatch(changeTheme(theme))
        } else {
            localStorage.setItem("academic-theme", layoutTheme[0])
        }
    }, [])

    useEffect(()=>{
        if(sidebarTheme === layoutTheme[1]) {
            document.body.classList.add("dark")
            localStorage.setItem("academic-theme", layoutTheme[1])
        } else if(sidebarTheme === layoutTheme[0]) {
            document.body.classList.remove("dark")
            localStorage.setItem("academic-theme", layoutTheme[0])
        }
    }, [sidebarTheme])

    return (
        <div>
            <Router>
                <Routes>
                    {authRoutes.map((r, i) => (
                        <Route key={i} path={r.path} element={r.element} />
                    ))}
                    {regularRoutes.map((r, i) => (
                        <Route
                            key={i}
                            path={r.path}
                            element={
                                <PrivateRoute>
                                    <Layout>{r.element}</Layout>
                                </PrivateRoute>
                            }
                        />
                    ))}
                </Routes>
            </Router>
        </div>
    );
};

export default App;
