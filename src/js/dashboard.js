import http from "../api/http.js";
import { getTasks } from "../services/taskService.js";

// Proteger la página
document.addEventListener("DOMContentLoaded", async () => {
  // Verificar si el usuario ya inició sesión
  const email = localStorage.getItem("userEmail");

  if (!email) {
    // Si no hay correo guardado, redirigir al login
    window.location.href = "login.html";
    return;
  }

  try {
    // Mostrar el correo en el sidebar y saludo
    document.getElementById("userName").textContent = email;
    document.getElementById("greeting").textContent = `Hola, ${email} 👋`;

    // Aquí podrías simular carga de tareas
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "";

    // Si aún no conectas con backend, simulamos tareas de prueba
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
    alert("Ocurrió un error al cargar el dashboard.");
  }

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail"); // eliminamos el email guardado
    window.location.href = "login.html";
  });
});
