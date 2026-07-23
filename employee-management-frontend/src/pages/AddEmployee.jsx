import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../services/employeeService";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEmployee({
            ...employee,
            [name]: value
        });

    };

    const saveEmployee = async (e) => {

        e.preventDefault();

        try {

            await addEmployee({
                ...employee,
                salary: Number(employee.salary)
            });

            alert("Employee Added Successfully!");

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert("Unable to Add Employee");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow-lg border-0">

                        <div className="card-header text-center">

                            <h2 className="fw-bold text-primary">
    ➕ Add New Employee
</h2>

                        </div>

                        <div className="card-body">

                            <form onSubmit={saveEmployee}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Employee Name

                                    </label>

                                   <input
    type="text"
    name="name"
    className="form-control"
    placeholder="Enter Employee Name"
    value={employee.name}
    onChange={handleChange}
    required
/>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={employee.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Department

                                    </label>

                                    <input
                                        type="text"
                                        name="department"
                                        className="form-control"
                                        placeholder="Enter Department"
                                        value={employee.department}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">

                                        Salary

                                    </label>

                                    <input
                                        type="number"
                                        name="salary"
                                        className="form-control"
                                        placeholder="50000"
                                        value={employee.salary}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="d-flex justify-content-between">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate("/employees")}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        💾 Save Employee
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddEmployee;