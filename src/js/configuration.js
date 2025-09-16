import CONFIG from "../js/configuration.js";
import { updateUser } from "../services/userService.js"; // 👈 importar servicio

document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_EMAIL);
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const age = localStorage.getItem("userAge");
  const userId = localStorage.getItem("userId");
  const registeredAt = localStorage.getItem("userRegisteredAt");
  const year = registeredAt ? new Date(registeredAt).getFullYear() : "N/A";
  document.querySelector(".user-since").textContent = year;

  if (!email || !userId) {
    window.location.href = "login.html";
    return;
  }

  // --- Mostrar datos en la tarjeta ---
  document.querySelector(".profile-name").textContent =
    `${firstName || ""} ${lastName || ""}`.trim() || "Usuario";
  document.querySelector(".email").textContent = email;
  document.querySelector(".age").textContent = age || "N/A";

  // --- Precargar en formulario ---
  document.getElementById("newName").value =
    `${firstName || ""} ${lastName || ""}`.trim();
  document.getElementById("newEmail").value = email || "";
  document.getElementById("newAge").value = age || "";

  // --- Mostrar formulario al presionar editar ---
  const editBtn = document.getElementById("editProfileBtn");
  const updateForm = document.getElementById("updateForm");

  editBtn.addEventListener("click", () => {
    updateForm.classList.toggle("hidden");
    window.scrollTo({ top: updateForm.offsetTop, behavior: "smooth" });
  });

  // --- Validación dinámica de contraseña ---
  const newPasswordInput = document.getElementById("newPassword");
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", () => {
      const password = newPasswordInput.value;

      validateRequirement("req-length", password.length >= 8);
      validateRequirement("req-upper", /[A-Z]/.test(password));
      validateRequirement("req-lower", /[a-z]/.test(password));
      validateRequirement("req-number", /[0-9]/.test(password));
      validateRequirement(
        "req-special",
        /[!@#$%^&*(),.?":{}|<>]/.test(password)
      );
    });
  }

  function validateRequirement(id, condition) {
    const item = document.getElementById(id);
    if (!item) return;

    if (condition) {
      item.classList.remove("invalid");
      item.classList.add("valid");
      item.textContent = item.textContent.replace("❌", "✅");
    } else {
      item.classList.remove("valid");
      item.classList.add("invalid");
      if (!item.textContent.includes("❌")) {
        item.textContent = item.textContent.replace("✅", "❌");
      }
    }
  }

  // --- Mostrar/Ocultar contraseñas ---
  document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const input = document.getElementById(targetId);

      if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "🙈";
      } else {
        input.type = "password";
        toggle.textContent = "👁️";
      }
    });
  });

  // --- Guardar cambios perfil ---
  const configForm = document.getElementById("configurationForm");
  if (configForm) {
    configForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newName = document.getElementById("newName").value.trim();
      const newEmail = document.getElementById("newEmail").value.trim();
      const newAge = document.getElementById("newAge").value.trim();
      const currentPassword = document
        .getElementById("currentPassword")
        .value.trim();
      const newPassword = newPasswordInput?.value.trim();

      if (!currentPassword) {
        alert("⚠️ Debes ingresar tu contraseña actual para confirmar cambios.");
        return;
      }

      if (newPassword && !isPasswordValid(newPassword)) {
        alert("⚠️ La nueva contraseña no cumple con los requisitos.");
        return;
      }

      // 👇 separar nombre y apellido(s)
      const [firstNameUpdate, ...lastNameParts] = newName.split(" ");
      const lastNameUpdate = lastNameParts.join(" ") || "";

      try {
        // Llamar backend
        const res = await updateUser(userId, {
          firstName: firstNameUpdate,
          lastName: lastNameUpdate,
          email: newEmail,
          age: Number(newAge),
          currentPassword,
          newPassword: newPassword || undefined,
        });

        // Actualizar localStorage
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_EMAIL, newEmail);
        localStorage.setItem("firstName", firstNameUpdate);
        localStorage.setItem("lastName", lastNameUpdate);
        localStorage.setItem("userAge", newAge);

        // Refrescar tarjeta
        document.querySelector(".profile-name").textContent =
          `${firstNameUpdate} ${lastNameUpdate}`.trim();
        document.querySelector(".email").textContent = newEmail;
        document.querySelector(".age").textContent = newAge;

        alert("✅ Cambios guardados correctamente");
        console.log(res);
        configForm.reset();
        updateForm.classList.add("hidden");
      } catch (error) {
        console.error("Error actualizando perfil:", error);
        alert("❌ No se pudo actualizar el perfil");
      }
    });
  }

  function isPasswordValid(password) {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  }

  // --- Logout ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_EMAIL);
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("userAge");
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    });
  }
});
