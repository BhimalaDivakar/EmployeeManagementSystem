import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function EmployeeChart({ employees }) {

    const departments = {};

    employees.forEach((employee) => {
        departments[employee.department] =
            (departments[employee.department] || 0) + 1;
    });

    const data = {
        labels: Object.keys(departments),

        datasets: [
            {
                label: "Employees",
                data: Object.values(departments),

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997",
                ],
            },
        ],
    };

    return (
        <div className="card shadow p-3">

            <h4 className="text-center mb-3">
                Employees by Department
            </h4>

            <Pie data={data} />

        </div>
    );
}

export default EmployeeChart;