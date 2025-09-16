import http from "../api/http.js";

/**
 * Creates a new task by sending a POST request to the backend.
 * @param {Object} taskData - Task data.
 * @param {string} taskData.title - Task title.
 * @param {string} taskData.description - Task description.
 * @param {string} taskData.status - Task status.
 * @param {string} taskData.date - Task date.
 * @param {string} taskData.hour - Task hour.
 * @param {boolean} taskData.completed - Task completion state.
 * @returns {Promise<Object>} Promise resolving to the created task.
 */
export const addTask = async (taskData) => {
  const response = await http.post("/tasks", taskData);
  return response.data; // axios returns {data, status, ...}
};

// --- FORM CONNECTION ---

/**
 * Handles the task creation form submission.
 * Collects form data, validates it, and sends it to the backend.
 */
document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("taskForm");
  if (!form) return;

  // --- NUEVO: Cargar datos si es edición ---
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  if (taskId) {
    try {
      // Obtener tarea por ID
      const res = await http.get(`/tasks/${taskId}`);
      const task = res.data;
      document.getElementById("titulo").value = task.title || "";
      document.getElementById("descripcion").value = task.description || "";
      document.getElementById("status").value = task.status || "pending";
      document.getElementById("date").value = task.date || "";
      document.getElementById("hour").value = task.hour || "";
      document.getElementById("completed").checked = !!task.completed;
    } catch (error) {
      console.error("Error cargando tarea:", error);
      alert("No se pudo cargar la tarea para editar.");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Get form values
    const title = document.getElementById("titulo").value.trim();
    const description = document.getElementById("descripcion").value.trim();
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;
    const hour = document.getElementById("hour").value;
    const completed = document.getElementById("completed").checked;

    // Basic validation
    if (!title || !date || !hour) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      await addTask({
        title,
        description,
        status,
        date,
        hour,
        completed
      });
      alert("Task created successfully.");
      form.reset();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Could not create the task. Please try again.");
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
  });
});