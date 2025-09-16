import { get } from "../api/http.js"; 
import { getTasks } from "../services/taskService.js"; // si ya lo tienes, úsalo

/**
 * Inicializa el dashboard:
 * - Verifica autenticación
 * - Muestra info del usuario
 * - Carga tareas desde backend
 * - Maneja logout
 */
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Verificar autenticación
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("userName") || "Usuario";

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  try {
    // 2. Mostrar info usuario
    document.getElementById("userName").textContent = name;
    document.getElementById("greeting").textContent = `Hola, ${name} 👋`;

    // 3. Cargar tareas
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "<p>Cargando tareas...</p>";

    // Puedes elegir entre servicio o llamada directa al API
    let tasks;
    try {
      // Versión con servicio si lo implementaste
      tasks = await getTasks(); 
    } catch {
      // Fallback directo al endpoint
      const response = await get("tasks");
      tasks = response.tasks || response;
    }

    if (!tasks || tasks.length === 0) {
      tasksContainer.innerHTML = "<p>No tienes tareas pendientes.</p>";
    } else {
      tasksContainer.innerHTML = "";
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
    document.getElementById("tasksContainer").innerHTML = "<p>Error al cargar las tareas.</p>";
  }

  // 4. Logout
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "login.html";
  });
});

// Utilidad: formatear fecha DD/MM/YYYY
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES");
}