import axios from "axios";

const BASE_URL = "https://employeemanagementsystem-o3vo.onrender.com/api/employees";

export const getAllEmployees = () => axios.get(BASE_URL);

export const getEmployeeById = (id) =>
    axios.get(`${BASE_URL}/${id}`);

export const addEmployee = (employee) =>
    axios.post(BASE_URL, employee);

export const updateEmployee = (id, employee) =>
    axios.put(`${BASE_URL}/${id}`, employee);

export const deleteEmployee = (id) =>
    axios.delete(`${BASE_URL}/${id}`);