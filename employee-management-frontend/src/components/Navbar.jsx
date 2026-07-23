import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("isLoggedIn");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    💼 Employee Management
                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/"
                                        ? "active fw-bold text-info"
                                        : ""
                                }`}
                                to="/"
                            >
                                📊 Dashboard
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/employees"
                                        ? "active fw-bold text-info"
                                        : ""
                                }`}
                                to="/employees"
                            >
                                👨‍💼 Employees
                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link
                                className={`nav-link ${
                                    location.pathname === "/add"
                                        ? "active fw-bold text-info"
                                        : ""
                                }`}
                                to="/add"
                            >
                                ➕ Add Employee
                            </Link>

                        </li>

                        <li className="nav-item ms-3">

                            <span
                                className="badge bg-success p-2"
                            >
                                Admin
                            </span>

                        </li>

                        <li className="nav-item ms-3">

                            <button
                                className="btn btn-danger"
                                onClick={logout}
                            >
                                🚪 Logout
                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;