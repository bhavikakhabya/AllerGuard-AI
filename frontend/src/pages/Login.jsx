import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodDecor from "../components/FoodDecor";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                alert("Login successful! 🎉");

                navigate("/dashboard");

            } else {

                alert(
                    data.message ||
                    "Login failed"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to backend"
            );

        }
    };

    return (

        <div className="auth-page">

            <FoodDecor />

            <div className="auth-card">

                <div className="auth-logo">
                    🛡️
                </div>

                <h1>
                    Welcome back
                </h1>

                <p>
                    Login to continue using AllerGuard AI.
                </p>

                <form onSubmit={handleLogin}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                <p className="auth-footer">

                    Don't have an account?

                    <span
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        {" "}Create one
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Login;