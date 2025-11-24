import axios from "axios";

// Replace with your backend URL when ready
const API_URL = "https://example.com/api";

const api = axios.create({
  baseURL: API_URL,
});

export const getPatients = () => api.get("/patients");
export const addPatient = (data) => api.post("/patients", data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);
export const deletePatient = (id) => api.delete(`/patients/${id}`);

export default api;
