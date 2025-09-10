import { getTasks, updateTask, deleteTask } from "../services/taskService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    // Obtener tareas
    const res = await getTasks();
    const tasks = res.data;

    // Referencias a columnas
    const columns = {
      todo: document.getElementById("todo"),
      inProgress: document.getElementById("in-progress"),
      done: document.getElementById("done"),
    };

    // Limpiar columnas
    Object.entries(columns).forEach(([key, col]) => {
      col.innerHTML = `<h3>${
        key === "todo"
          ? "Por hacer"
          : key === "inProgress"
          ? "Haciéndose"
          : "Finalizadas"
      }</h3>`;
    });

    // Renderizar tareas
    tasks.forEach((task) => {
      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card");
      taskCard.setAttribute("draggable", "true");
      taskCard.dataset.id = task._id;

      taskCard.innerHTML = `
        <div class="task-header">
          <h4>${task.title}</h4>
          <button class="delete-btn" title="Eliminar">❌</button>
        </div>
        <p>${task.description}</p>
        <small>⏳ ${task.priority} | 📅 ${task.endDate}</small>
      `;

      // Botón eliminar
      taskCard.querySelector(".delete-btn").addEventListener("click", async () => {
        if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
          try {
            await deleteTask(task._id);
            taskCard.remove();
            alert("✅ Tarea eliminada correctamente");
          } catch (error) {
            console.error("Error eliminando tarea:", error);
            alert("❌ No se pudo eliminar la tarea.");
          }
        }
      });

      // Drag start
      taskCard.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("taskId", task._id);
      });

      switch (task.status) {
        case "ToDo":
          columns.todo.appendChild(taskCard);
          break;
        case "InProgress":
          columns.inProgress.appendChild(taskCard);
          break;
        case "Done":
          columns.done.appendChild(taskCard);
          break;
        default:
          columns.todo.appendChild(taskCard);
      }
    });

    // Configurar droppable en columnas
    Object.entries(columns).forEach(([key, col]) => {
      col.addEventListener("dragover", (e) => {
        e.preventDefault();
        col.classList.add("highlight");
      });

      col.addEventListener("dragleave", () => {
        col.classList.remove("highlight");
      });

      col.addEventListener("drop", async (e) => {
        e.preventDefault();
        col.classList.remove("highlight");

        const taskId = e.dataTransfer.getData("taskId");
        const newStatus =
          key === "todo" ? "ToDo" : key === "inProgress" ? "InProgress" : "Done";

        try {
          await updateTask(taskId, { status: newStatus });
          const taskCard = document.querySelector(`[data-id="${taskId}"]`);
          col.appendChild(taskCard);
        } catch (error) {
          console.error("Error actualizando estado:", error);
          alert("❌ No se pudo mover la tarea.");
        }
      });
    });
  } catch (error) {
    console.error("Error cargando Kanban:", error);
    alert("Error al cargar tus tareas. Inicia sesión nuevamente.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
});
