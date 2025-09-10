import http from "../api/http.js";

/**
 * Obtener todas las tareas del usuario autenticado
 */
export const getTasks = () => {
  return http.get("/tasks");
};

/**
 * Crear una nueva tarea
 * @param {Object} taskData - { title, description, startDate, endDate, priority }
 */
export const addTask = (taskData) => {
  return http.post("/tasks", taskData);
};

/**
 * Actualizar una tarea existente
 * @param {string} taskId - ID de la tarea
 * @param {Object} updates - { title?, description?, startDate?, endDate?, priority?, status? }
 */
export const updateTask = (taskId, updates) => {
  return http.put(`/tasks/${taskId}`, updates);
};

/**
 * Eliminar una tarea
 * @param {string} taskId - ID de la tarea
 */
export const deleteTask = (taskId) => {
  return http.delete(`/tasks/${taskId}`);
};
