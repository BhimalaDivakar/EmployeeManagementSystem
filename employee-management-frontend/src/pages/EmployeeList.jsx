import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllEmployees,
    deleteEmployee,
} from "../services/employeeService";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);

            const response = await getAllEmployees();

            console.log("Full Response:", response);
            console.log("Data:", response.data);

            setEmployees(response.data);

        } catch (error) {
            console.error("API Error:", error);

            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }

            alert("Unable to load employees");
        } finally {
            setLoading(false);
        }
    };

    const removeEmployee = async (id) => {
        if (!window.confirm("Delete this employee?")) return;

        try {
            await deleteEmployee(id);

            alert("Employee Deleted Successfully");

            loadEmployees();
        } catch (error) {
            console.error(error);
            alert("Delete Failed");
        }
    };

    const exportCSV = () => {
        const headers = [
            "ID",
            "Name",
            "Email",
            "Department",
            "Salary",
        ];

        const rows = employees.map((emp) => [
            emp.id,
            emp.name,
            emp.email,
            emp.department,
            emp.salary,
        ]);

        let csv =
            headers.join(",") +
            "\n" +
            rows.map((row) => row.join(",")).join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "employees.csv";

        link.click();
    };

    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch =
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email.toLowerCase().includes(search.toLowerCase()) ||
            emp.department.toLowerCase().includes(search.toLowerCase());

        const matchesDepartment =
            department === "All" || emp.department === department;

        return matchesSearch && matchesDepartment;
    });

    const departments = [
        "All",
        ...new Set(employees.map((emp) => emp.department)),
    ];

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <h5 className="mt-3">Loading Employees...</h5>
            </div>
        );
    }

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-white">
    👨‍💼 Employee Management
</h2>

                
                

                <div>

                    <button
                        className="btn btn-success me-2"
                        onClick={() => navigate("/add")}
                    >
                        Add Employee
                    </button>

                    <button
                        className="btn btn-dark"
                        onClick={exportCSV}
                    >
                        Export CSV
                    </button>

                </div>

            </div>

            <div className="row mb-3">

                <div className="col-md-8">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >

                        {departments.map((dep) => (
                            <option key={dep}>{dep}</option>
                        ))}

                    </select>

                </div>

            </div>

            <table className="table table-hover align-middle">

                <thead className="table-dark">

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Department</th>

                    <th>Salary</th>

                    <th width="180">Action</th>

                </tr>

                </thead>

                <tbody>

                {filteredEmployees.length === 0 ? (

                    <tr>

                        <td colSpan="6" className="text-center">

                            No Employees Found

                        </td>

                    </tr>

                ) : (

                    filteredEmployees.map((emp) => (

                        <tr key={emp.id}>

                            <td>{emp.id}</td>

                            <td>{emp.name}</td>

                            <td>{emp.email}</td>

                            <td>
    <span className="badge bg-info">
        {emp.department}
    </span>
</td>

                            <td className="fw-bold text-success">
    ₹ {Number(emp.salary).toLocaleString()}
</td>

                            <td>

                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => navigate(`/edit/${emp.id}`)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeEmployee(emp.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeList;