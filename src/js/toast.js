/**
 * Muestra un toast con el mensaje indicado.
 * @param {string} message - Mensaje a mostrar.
 * @param {number} duration - Duración en ms (opcional, por defecto 3000).
 */
export function showToast(message, duration = 3000) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}