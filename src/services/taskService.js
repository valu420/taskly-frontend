import http from "../api/http.js";

/**
 * Gets all tasks of the authenticated user.
 * @returns {Promise<Object>} Promise resolving to the list of tasks.
 */
export const getTasks = () => {
  return http.get("/tasks");
};

/**
 * Creates a new task.
 * @param {Object} taskData - Task data.
 * @param {string} taskData.title - Task title.
 * @param {string} [taskData.description] - Task description.
 * @param {string} [taskData.date] - Task date.
 * @param {string} [taskData.hour] - Task hour.
 * @param {string} taskData.status - Task status.
 * @param {boolean} [taskData.completed] - Task completion state.
 * @returns {Promise<Object>} Promise resolving to the created task.
 */
export const addTask = (taskData) => {
  return http.post("/tasks", taskData);
};

/**
 * Updates an existing task.
 * @param {string} taskId - Task ID.
 * @param {Object} updates - Fields to update.
 * @param {string} [updates.title] - Updated title.
 * @param {string} [updates.description] - Updated description.
 * @param {string} [updates.date] - Updated date.
 * @param {string} [updates.hour] - Updated hour.
 * @param {string} [updates.status] - Updated status.
 * @param {boolean} [updates.completed] - Updated completion state.
 * @returns {Promise<Object>} Promise resolving to the updated task.
 */
export const updateTask = (taskId, updates) => {
  return http.put(`/tasks/${taskId}`, updates);
};

/**
 * Deletes a task.
 * @param {string} taskId - Task ID.
 * @returns {Promise<Object>} Promise resolving to the deletion result.
 */
export const deleteTask = (taskId) => {
  return http.delete(`/tasks/${taskId}`);
};