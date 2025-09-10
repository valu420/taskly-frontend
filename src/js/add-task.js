import { addTask } from "../services/taskService.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const taskForm = document.getElementById("taskForm");

  if (taskForm) {
    taskForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const titulo = document.getElementById("titulo").value.trim();
      const descripcion = document.getElementById("descripcion").value.trim();
      const fechaInicio = document.getElementById("fechaInicio").value;
      const fechaCierre = document.getElementById("fechaCierre").value;
      const prioridad = document.getElementById("prioridad").value;

      try {
        await addTask({
          title: titulo,
          description: descripcion,
          startDate: fechaInicio,
          endDate: fechaCierre,
          priority: prioridad,
        });

        alert("✅ Tarea creada con éxito");
        window.location.href = "dashboard.html";
      } catch (error) {
        console.error("Error creando tarea:", error);
        alert("❌ No se pudo crear la tarea. Intenta nuevamente.");
      }
    });
  }
});
