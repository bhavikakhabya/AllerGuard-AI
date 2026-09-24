import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodDecor from "../components/FoodDecor";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:5001/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.success) {

                alert(
                    "Registration successful! 🎉"
                );

                navigate("/login");

            } else {

                alert(
                    data.message ||
                    "Registration failed"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Backend server is not running"
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
                    Create your account
                </h1>

                <p>
                    Start protecting your food choices
                    with AllerGuard AI.
                </p>

                <form onSubmit={handleRegister}>

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

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
                        placeholder="Minimum 6 characters"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        minLength={6}
                        required
                    />

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                <p className="auth-footer">

                    Already have an account?

                    <span
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        {" "}Login
                    </span>

                </p>

            </div>

        </div>
    );
}

export default Register;