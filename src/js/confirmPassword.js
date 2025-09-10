import http from "../api/http.js";

/**
 * Handles the password change form submission.
 * Validates the new password and confirmation, then sends the request to the backend.
 */
const form = document.getElementById("changePasswordForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  /** @type {string} */
  const newPassword = document.getElementById("new-password").value.trim();
  /** @type {string} */
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (!newPassword || !confirmPassword) {
    alert("⚠️ Debes llenar ambos campos.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("❌ Las contraseñas no coinciden.");
    return;
  }

  try {
    // Sends the new password to the backend to change it
    await http.post("/auth/change-password", { password: newPassword });

    alert("✅ Your password has been changed successfully.");
    form.reset();

    // Redirect to login page
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error changing password:", error);
    alert("❌ Could not change the password. Please try again.");
  }
});