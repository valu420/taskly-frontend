import { getTasks, updateTask, deleteTask } from "../services/taskService.js";

/**
 * Initializes the Kanban board on DOMContentLoaded.
 * Fetches tasks, renders them in columns, and enables drag-and-drop and delete functionality.
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch tasks from backend
    const res = await getTasks();
    /**
     * @type {Array<Object>} List of tasks
     */
    const tasks = Array.isArray(res.data) ? res.data : res.data.tasks;

    /**
     * References to Kanban columns.
     * @type {{todo: HTMLElement, inProgress: HTMLElement, done: HTMLElement}}
     */
    const columns = {
      todo: document.getElementById("todo"),
      inProgress: document.getElementById("in-progress"),
      done: document.getElementById("done"),
    };

    // Clear columns and set headers
    Object.entries(columns).forEach(([key, col]) => {
      col.innerHTML = `<h3>${
        key === "todo"
          ? "Por hacer"
          : key === "inProgress"
          ? "Haciéndose"
          : "Finalizadas"
      }</h3>`;
    });

    // Render each task in the appropriate column
    tasks.forEach((task) => {
      /**
       * Task card element.
       * @type {HTMLDivElement}
       */
      const taskCard = document.createElement("div");
      taskCard.classList.add("task-card");
      taskCard.setAttribute("draggable", "true");
      taskCard.dataset.id = task._id;

      taskCard.innerHTML = `
        <div class="task-header">
          <h4>${task.title}</h4>
          <div class="task-actions">
          <button class="edit-btn" title="Editar">✏️</button>
          <button class="delete-btn" title="Eliminar">❌</button>
        </div>
        </div>
        <p>${task.description}</p>
        <small>📌 ${task.status} | 📅 ${task.date} ⏰ ${task.hour}</small>
      `;

      // Edit button handler
      taskCard.querySelector(".edit-btn").addEventListener("click", () => {
        window.location.href = `add-task.html?id=${task._id}`;
      });

      // Delete button handler
      taskCard
        .querySelector(".delete-btn")
        .addEventListener("click", async () => {
          if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
            try {
              await deleteTask(task._id);
              taskCard.remove();
            } catch (error) {
              console.error("Error eliminando tarea:", error);
            }
          }
        });

      // Drag start handler
      taskCard.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("taskId", task._id);
      });

      // Place task in the correct column based on status
      switch (task.status) {
        case "pending":
          columns.todo.appendChild(taskCard);
          break;
        case "in-progress":
          columns.inProgress.appendChild(taskCard);
          break;
        case "done":
          columns.done.appendChild(taskCard);
          break;
        default:
          columns.todo.appendChild(taskCard);
      }
    });

    // Enable columns as drop targets for drag-and-drop
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
          key === "todo"
            ? "pending"
            : key === "inProgress"
            ? "in-progress"
            : "done";

        try {
          await updateTask(taskId, { status: newStatus });
          const taskCard = document.querySelector(`[data-id="${taskId}"]`);
          col.appendChild(taskCard);
        } catch (error) {
          console.error("Error actualizando estado:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error cargando Kanban:", error);
  }

  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("userEmail");
    window.location.href = "login.html";
  });
});
