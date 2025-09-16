import { getTasks } from "../services/taskService.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Nombre de usuario (si existe en localStorage)
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const displayName = firstName && lastName ? `${firstName} ${lastName}` : firstName || "Usuario";

    document.getElementById("userName").textContent = displayName;
    document.getElementById("greeting").textContent = `Hola, ${displayName} 👋`;

    // Contenedor de tareas
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "<p>Cargando tareas...</p>";

    // 🚀 Obtener tareas del backend
    const tasks = await getTasks();
    console.log("📌 Tareas desde backend:", tasks);

    if (!tasks || tasks.length === 0) {
      tasksContainer.innerHTML = "<p>No tienes tareas creadas aún.</p>";
    } else {
      tasksContainer.innerHTML = "";

      tasks.forEach((task) => {
        const card = document.createElement("div");
        card.className = "task-card";

        const fecha = task.date ? formatDate(task.date) : "Sin fecha";
        const hora = task.hour ? task.hour : "";

        card.innerHTML = `
          <h4>${task.title}</h4>
          <p>${task.description || ""}</p>
          <p><strong>Fecha:</strong> ${fecha} ${hora ? `- ${hora}` : ""}</p>
          <p><strong>Estado:</strong> ${task.status || "Pendiente"}</p>
          <p><strong>Completada:</strong> ${task.completed ? "✅ Sí" : "❌ No"}</p>
        `;
        tasksContainer.appendChild(card);
      });
    }

    // Botón para crear nueva tarea
    const createBtn = document.createElement("button");
    createBtn.textContent = "➕ Crear nueva tarea";
    createBtn.className = "create-task-btn";
    createBtn.addEventListener("click", () => {
      window.location.href = "add-task.html";
    });
    tasksContainer.appendChild(createBtn);

  } catch (error) {
    console.error("❌ Error al cargar el dashboard:", error);
    alert("Error cargando las tareas. Revisa la consola.");
  }
});

// Formatear fecha a DD/MM/YYYY
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES");
}