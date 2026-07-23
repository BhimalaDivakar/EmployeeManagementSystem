import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "admin@gmail.com" && password === "admin123") {

            localStorage.setItem("isLoggedIn", "true");

            toast.success("Login Successful");

            setTimeout(() => {
                navigate("/");
            }, 700);

        } else {

            toast.error("Invalid Email or Password");

        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background:
                    "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)"
            }}
        >
            <div
                className="card p-5 shadow-lg"
                style={{
                    width: "430px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,.08)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "white"
                }}
            >

                <div className="text-center mb-4">

                    <FaUserShield
                        size={60}
                        color="#3b82f6"
                    />

                    <h2 className="fw-bold mt-3">
                        Employee Management
                    </h2>

                    <p className="text-light">
                        Welcome Back Admin
                    </p>

                </div>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="mb-2">
                            Password
                        </label>

                        <div className="input-group">

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div className="form-check">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />

                            <label
                                className="form-check-label"
                                htmlFor="remember"
                            >
                                Remember Me
                            </label>

                        </div>

                        <small style={{ color: "#60a5fa" }}>
                            Forgot Password?
                        </small>

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        type="submit"
                    >
                        🔐 Login
                    </button>

                </form>

                <hr />

                <div className="text-center">

                    <small>

                        Demo Login

                        <br />

                        <b>Email:</b> admin@gmail.com

                        <br />

                        <b>Password:</b> admin123

                    </small>

                </div>

            </div>

        </div>
    );
}

export default Login;