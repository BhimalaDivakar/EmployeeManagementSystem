import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../services/employeeService";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

function Dashboard() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const response = await getAllEmployees();
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const totalEmployees = employees.length;

    const departments = [
        ...new Set(
            employees.map(emp => emp.department.toUpperCase())
        )
    ];

    const totalDepartments = departments.length;

    const totalSalary = employees.reduce(
        (sum, emp) => sum + emp.salary,
        0
    );

    const averageSalary =
        totalEmployees === 0
            ? 0
            : totalSalary / totalEmployees;

    const departmentCount = {};

    employees.forEach(emp => {
        const dept = emp.department.toUpperCase();
        departmentCount[dept] =
            (departmentCount[dept] || 0) + 1;
    });

    const barData = {
        labels: Object.keys(departmentCount),
        datasets: [
            {
                label: "Employees",
                data: Object.values(departmentCount),
                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6"
                ],
                borderRadius: 10
            }
        ]
    };

    const doughnutData = {
        labels: Object.keys(departmentCount),
        datasets: [
            {
                data: Object.values(departmentCount),
                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6"
                ]
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#ffffff"
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#ffffff"
                }
            },
            y: {
                ticks: {
                    color: "#ffffff"
                }
            }
        }
    };

    return (
        <div className="container mt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
            <h2 className="text-white fw-bold">
                📊 Employee Dashboard
            </h2>

            <p className="text-secondary">
                Welcome back, Admin
            </p>
        </div>

        <button
            className="btn btn-primary"
            onClick={() => navigate("/add")}
        >
            Add Employee
        </button>

    </div>

    <div className="row">

        <div className="col-md-3 mb-3">

            <div className="card text-center p-3">

                <h1 className="text-info">
                    {totalEmployees}
                </h1>

                <h6>Total Employees</h6>

            </div>

        </div>

        <div className="col-md-3 mb-3">

            <div className="card text-center p-3">

                <h1 className="text-success">
                    {totalDepartments}
                </h1>

                <h6>Departments</h6>

            </div>

        </div>

        <div className="col-md-3 mb-3">

            <div className="card text-center p-3">

                <h4 className="text-warning">
                    ₹ {totalSalary.toLocaleString()}
                </h4>

                <h6>Total Salary</h6>

            </div>

        </div>

        <div className="col-md-3 mb-3">

            <div className="card text-center p-3">

                <h4 className="text-danger">
                    ₹ {averageSalary.toFixed(2)}
                </h4>

                <h6>Average Salary</h6>

            </div>

        </div>

    </div>

    <div className="row mt-4">

        <div className="col-lg-7 mb-4">

            <div className="card">

                <div className="card-header">
                    Employees by Department
                </div>

                <div className="card-body">

                    <Bar
                        data={barData}
                        options={options}
                    />

                </div>

            </div>

        </div>

        <div className="col-lg-5 mb-4">

            <div className="card">

                <div className="card-header">
                    Department Distribution
                </div>

                <div className="card-body">

                    <Doughnut
                        data={doughnutData}
                        options={options}
                    />

                </div>

            </div>

        </div>

    </div>

    <div className="card mt-4">

        <div className="card-header d-flex justify-content-between">

            <h5>Recent Employees</h5>

            <button
                className="btn btn-success"
                onClick={() => navigate("/add")}
            >
                Add Employee
            </button>

        </div>

        <div className="card-body">

            <table className="table table-hover">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                    </tr>

                </thead>

                <tbody>
                    {employees.length === 0 ? (

    <tr>

        <td
            colSpan="5"
            className="text-center"
        >
            No Employees Found
        </td>

    </tr>

) : (

    employees
        .slice()
        .reverse()
        .slice(0, 5)
        .map((emp) => (

            <tr key={emp.id}>

                <td>{emp.id}</td>

                <td>{emp.name}</td>

                <td>{emp.email}</td>

                <td>

                    <span className="badge bg-primary">
                        {emp.department}
                    </span>

                </td>

                <td>
                    ₹ {Number(emp.salary).toLocaleString()}
                </td>

            </tr>

        ))

)}

                </tbody>

            </table>

        </div>

    </div>

</div>

    );

}

export default Dashboard;