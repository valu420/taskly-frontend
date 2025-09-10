import http from "../api/http.js";

/**
 * Get all tasks of the authenticated user
 */
export const getTasks = () => {
  return http.get("/tasks");
};

/**
 * Create a new task
 * @param {Object} taskData - { title, description, date, hour, status, completed} }
 */
export const addTask = (taskData) => {
  return http.post("/tasks", taskData);
};

/**
 * Actualizar una tarea existente
 * @param {string} taskId - ID de la tarea
 * @param {Object} updates - { title?, description?, date?, hour?, status?, completed? }
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
