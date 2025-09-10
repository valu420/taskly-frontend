import http from "../api/http.js";

/**
 * Crear una nueva tarea
 * @param {Object} taskData - Datos de la tarea
 * @returns {Promise<Object>}
 */
export const addTask = async (taskData) => {
  const response = await http.post("/tasks", taskData);
  return response.data; // axios devuelve {data, status, ...}
};