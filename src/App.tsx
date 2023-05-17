import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import { authRoutes, regularRoutes } from "./routes/routesData";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    {regularRoutes.map((r, i) => (
                        <Route
                            key={i}
                            path={r.path}
                            element={<PrivateRoute>{r.element}</PrivateRoute>}
                        />
                    ))}
                    {authRoutes.map((r, i) => (
                        <Route key={i} path={r.path} element={r.element} />
                    ))}
                </Routes>
            </Router>
        </div>
    );
};

export default App;
