import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getEmployeeById,
    updateEmployee,
} from "../services/employeeService";

function EditEmployee() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: "",
    });

    useEffect(() => {
        loadEmployee();
    }, []);

    const loadEmployee = async () => {

        try {

            const response = await getEmployeeById(id);

            setEmployee(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to Load Employee");

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEmployee({
            ...employee,
            [name]: value,
        });

    };

    const updateData = async (e) => {

        e.preventDefault();

        try {

            await updateEmployee(id, {
                ...employee,
                salary: Number(employee.salary),
            });

            alert("Employee Updated Successfully!");

            navigate("/employees");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow-lg border-0">

                        <div className="card-header text-center">

                            <h2 className="fw-bold text-warning">
    ✏️ Edit Employee
</h2>

                        </div>

                        <div className="card-body">

                            <form onSubmit={updateData}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Name

                                    </label>

                                   <select
    name="department"
    className="form-select"
    value={employee.department}
    onChange={handleChange}
    required
>
    <option>IT</option>
    <option>HR</option>
    <option>Finance</option>
    <option>Marketing</option>
    <option>Sales</option>
</select>
                                </div>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email

                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
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
                                        className="btn btn-warning"
                                    >
                                        💾 Update Employee
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

export default EditEmployee;