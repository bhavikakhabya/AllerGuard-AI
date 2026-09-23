import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ScanFood from "./pages/ScanFood";
import History from "./pages/History";
import AllergyProfile from "./pages/AllergyProfile";
import LabelScanner from "./pages/LabelScanner.jsx";
import AllergyCard from "./pages/AllergyCard.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* DEFAULT */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />


                {/* PUBLIC */}

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/allergy-card"
                    element={
                        <ProtectedRoute>
                            <AllergyCard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/allergy-card"
                    element={
                        <ProtectedRoute>
                            <AllergyCard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/ocr"
                    element={
                        <ProtectedRoute>
                            <LabelScanner />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* PROTECTED */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/scan"
                    element={
                        <ProtectedRoute>
                            <ScanFood />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <History />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <AllergyProfile />
                        </ProtectedRoute>
                    }
                />


                {/* UNKNOWN URL */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;