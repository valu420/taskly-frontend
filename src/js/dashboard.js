import { getTasks } from "../services/taskService.js";

/**
 * Inicializa la página del Dashboard.
 * Verifica autenticación, muestra usuario, carga tareas y maneja logout.
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Verificar si el usuario está logueado
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("userName");

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  try {
    // Mostrar datos del usuario en sidebar y saludo
    document.getElementById("userName").textContent = name || "Usuario";
    document.getElementById("greeting").textContent = `Hola, ${name || "Usuario"} 👋`;

    // Contenedor de tareas
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "<p>Cargando tareas...</p>";

    // 🚀 Cargar tareas desde el backend
    const tasks = await getTasks();

    if (!tasks || tasks.length === 0) {
      tasksContainer.innerHTML = "<p>No tienes tareas creadas aún.</p>";
    } else {
      tasksContainer.innerHTML = "";

      tasks.forEach((task) => {
        const card = document.createElement("div");
        card.className = "task-card";
        card.innerHTML = `
          <h4>${task.title}</h4>
          <p>${task.description || ""}</p>
          <p><strong>Fecha:</strong> ${task.dueDate ? formatDate(task.dueDate) : "Sin fecha"}</p>
          <p><strong>Estado:</strong> ${task.status || "Pendiente"}</p>
        `;
        tasksContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error al cargar el dashboard:", error);
    alert("❌ Error cargando el dashboard.");
  }

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
  });
});

// Formatear fecha a DD/MM/YYYY
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES");
}