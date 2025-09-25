/**
 * Muestra un toast con el mensaje indicado.
 * @param {string} message - Mensaje a mostrar.
 * @param {number} duration - Duración en ms (opcional, por defecto 3000).
 */
export function showToast(message, type = "error", duration = 3000) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove("toast-success", "toast-error");
  toast.classList.add(type === "success" ? "toast-success" : "toast-error");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// Mostrar toast guardado en localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const toastData = localStorage.getItem("toast");
  if (toastData) {
    const { message, type } = JSON.parse(toastData);
    showToast(message, type);
    localStorage.removeItem("toast");
  }
});