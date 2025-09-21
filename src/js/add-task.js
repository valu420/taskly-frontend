import http from "../api/http.js";

/**
 * Creates a new task by sending a POST request to the backend.
 * @param {Object} taskData - Task data.
 * @returns {Promise<Object>} Promise resolving to the created task.
 */
export const addTask = async (taskData) => {
  const response = await http.post("/tasks", taskData);
  return response.data;
};

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("taskForm");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  if (!form) return;

  // --- NUEVO: Botón para cargar tarea por ID manualmente ---
  const loadTaskBtn = document.getElementById("loadTaskBtn");
  const taskIdInput = document.getElementById("taskIdInput");

  let currentTaskId = null;

  if (loadTaskBtn && taskIdInput) {
    loadTaskBtn.addEventListener("click", async () => {
      const inputTaskId = taskIdInput.value.trim();
      if (!inputTaskId) {
        alert("Ingresa un ID de tarea válido.");
        return;
      }
      try {
        const res = await http.get(`/tasks/${inputTaskId}`);
        const task = res.data;
        document.getElementById("titulo").value = task.title || "";
        document.getElementById("descripcion").value = task.description || "";
        document.getElementById("status").value = task.status || "pending";
        document.getElementById("date").value = task.date || "";
        document.getElementById("hour").value = task.hour || "";
        document.getElementById("completed").checked = !!task.completed;
        currentTaskId = inputTaskId;
        alert("Tarea cargada. Puedes editar y guardar los cambios.");
      } catch (error) {
        alert("No se pudo cargar la tarea. Verifica el ID.");
      }
    });
  }

  // --- Cargar datos si es edición por parámetro en la URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  if (taskId) {
    try {
      const res = await http.get(`/tasks/${taskId}`);
      console.log("Respuesta de la tarea:", res.data);
      const task = res.data;
      document.getElementById("titulo").value = task.title || "";
      document.getElementById("descripcion").value = task.description || "";
      document.getElementById("status").value = task.status || "pending";
      document.getElementById("date").value = task.date || "";
      document.getElementById("hour").value = task.hour || "";
      document.getElementById("completed").checked = !!task.completed;
      currentTaskId = taskId;
      if (formTitle) formTitle.textContent = "Editar tarea";
      if (submitBtn) submitBtn.textContent = "Editar tarea";
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
      if (currentTaskId) {
        // Edit existing task
        await http.put(`/tasks/${currentTaskId}`, {
          title,
          description,
          status,
          date,
          hour,
          completed
        });
        alert("Task updated successfully.");
      } else {
        // Create new task
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
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("Could not save the task. Please try again.");
    }
  });

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("userEmail");
      window.location.href = "login.html";
    });
  }
});