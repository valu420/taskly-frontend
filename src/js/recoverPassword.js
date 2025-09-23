import http from "../api/http.js";

/**
 * Envía el correo de recuperación de contraseña al backend.
 */
const form = document.getElementById("recoverForm");
const resend = document.getElementById("resend");

async function sendRecoverEmail(email) {
  try {
    const res = await http.post("/auth/forgot-password", { email });
    if (res.data.success) {
      alert("📧 " + res.data.message);
    } else {
      alert("❌ " + (res.data.error || "No se pudo enviar el correo."));
    }
  } catch (err) {
    alert("❌ Error de conexión con el servidor.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) {
    alert("⚠️ Por favor ingresa un correo válido.");
    return;
  }
  sendRecoverEmail(email);
  form.reset();
});

resend.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  if (!email) {
    alert("⚠️ Ingresa tu correo antes de reenviar el enlace.");
    return;
  }
  sendRecoverEmail(email);
});