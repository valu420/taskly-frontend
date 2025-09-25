import http from "../api/http.js";
import { showToast } from "./toast.js";

/**
 * Envía el correo de recuperación de contraseña al backend.
 */
const form = document.getElementById("recoverForm");
const resend = document.getElementById("resend");

async function sendRecoverEmail(email) {
  try {
    const res = await http.post("/auth/forgot-password", { email });
    console.log(res.data);
    if (res.data.message) {
      showToast("📧 " + res.data.message, "success");
    } else {
      showToast("❌ " + (res.data.error || "No se pudo enviar el correo."), "error");
    }
  } catch (err) {
    alert("❌ Error de conexión con el servidor.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) {
    showToast("⚠️ Por favor ingresa un correo válido.", "error");
    return;
  }
  sendRecoverEmail(email);
  form.reset();
});

resend.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) {
    showToast("⚠️ Ingresa tu correo antes de reenviar el enlace.", "error");
    return;
  }
  sendRecoverEmail(email);
});