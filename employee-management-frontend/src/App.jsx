import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const location = useLocation();

    if (!isLoggedIn && location.pathname !== "/login") {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="app-bg">

            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#1c1c24",
                        color: "#fff",
                    },
                }}
            />

            {location.pathname !== "/login" && <Navbar />}

            <div className="container py-4">

                <Routes>

                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/employees" element={<EmployeeList />} />

                    <Route path="/add" element={<AddEmployee />} />

                    <Route path="/edit/:id" element={<EditEmployee />} />

                </Routes>

            </div>

            {location.pathname !== "/login" && <Footer />}

        </div>
    );
}

export default App;