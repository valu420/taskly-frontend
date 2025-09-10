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

// --- CONEXIÓN CON EL FORMULARIO ---
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Obtener valores del formulario
    const title = document.getElementById("titulo").value.trim();
    const description = document.getElementById("descripcion").value.trim();
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;
    const hour = document.getElementById("hour").value;
    const completed = document.getElementById("completed").checked;

    // Validación básica
    if (!title || !date || !hour) {
      alert("Por favor, completa todos los campos obligatorios.");
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
      alert("Tarea creada exitosamente ✅");
      form.reset();
    } catch (error) {
      console.error("Error creando tarea:", error);
      alert("No se pudo crear la tarea. Intenta de nuevo.");
    }
  });
});