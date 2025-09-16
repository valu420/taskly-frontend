import { getTasks } from "../services/taskService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const email = localStorage.getItem("userEmail");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  try {
    // Mostrar nombre completo si existe, si no, fallback al email
    const displayName = firstName && lastName ? `${firstName} ${lastName}` : firstName || email || "Usuario";

    document.getElementById("userName").textContent = displayName;
    document.getElementById("greeting").textContent = `Hola, ${displayName} 👋`;

    // Contenedor de tareas
    const tasksContainer = document.getElementById("tasksContainer");
    tasksContainer.innerHTML = "<p>Cargando tareas...</p>";

    // 🚀 Pedir tareas al backend
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
          <p><strong>Estado:</strong> ${task.status === "pending" ? "Pendiente" : task.status}</p>
          <p><strong>Completada:</strong> ${task.completed ? "✅ Sí" : "❌ No"}</p>
        `;
        tasksContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("❌ Error al cargar el dashboard:", error);
    alert("Error cargando el dashboard. Revisa la consola.");
  }

  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
  });
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES");
}
