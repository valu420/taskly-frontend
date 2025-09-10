import http from "../api/http.js";
import { getTasks } from "../services/taskService.js";

// Proteger la página
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    // Obtener usuario actual desde el backend
    const userRes = await http.get("/auth/me");
    const user = userRes.data;

    // Mostrar el nombre en el sidebar y saludo
    document.getElementById("userName").textContent = user.nombre;
    document.getElementById("greeting").textContent = `Hola, ${user.nombre} 👋`;

    // Cargar tareas
    const tasksRes = await getTasks();
    const tasks = tasksRes.data;

    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "";

    if (tasks.length === 0) {
      tasksContainer.innerHTML = "<p>No tienes tareas pendientes.</p>";
    } else {
      tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.textContent = `✔️ ${task.title}`;
        tasksContainer.appendChild(taskDiv);
      });
    }

  } catch (error) {
    console.error("Error cargando dashboard:", error);
    alert("Tu sesión ha expirado. Vuelve a iniciar sesión.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});
