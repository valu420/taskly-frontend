import http from "../api/http.js";
import { getTasks } from "../services/taskService.js";

/**
 * Initializes the dashboard page.
 * Checks user authentication, displays user info, loads tasks, and handles logout.
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Check if the user is logged in
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("userName"); //cambiar

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  try {
    // Display the user's name in the sidebar and greeting
    document.getElementById("userName").textContent = name;
    document.getElementById("greeting").textContent = `Hola, ${name} 👋`;

    // Load tasks (currently from localStorage, can be replaced with backend)
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "";

    /**
     * @type {Array<{title: string, description?: string, dueDate?: string, status?: string}>}
     */
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length === 0) {
      tasksContainer.innerHTML = "<p>No tienes tareas pendientes.</p>";
    } else {
      tasks.forEach((task) => {
        const card = document.createElement("div");
        card.className = "card small";
        card.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description || ""}</p>
          <p><strong>Fecha:</strong> ${task.dueDate ? formatDate(task.dueDate) : "Sin fecha"}</p>
          <p><strong>Estado:</strong> ${task.status || "Pendiente"}</p>
        `;
        tasksContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error loading dashboard:", error);
    alert("An error occurred while loading the dashboard.");
  }

  // Logout handler
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
  });
});

// Formatea la fecha a DD/MM/YYYY
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES");
}