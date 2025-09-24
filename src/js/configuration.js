import { CONFIG } from "../js/config.js";
import { getUserById, updateUser } from "../services/userService.js"; // 👈 servicios backend

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    window.location.href = "login.html";
    return;
  }

  try {
    // 👇 Obtener datos del usuario desde backend
    const res = await getUserById(userId, token);
    const user = res.data;

    // Guardar en localStorage para mantener sesión
    localStorage.setItem("firstName", user.firstName);
    localStorage.setItem("lastName", user.lastName);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userAge", user.age || "");
    localStorage.setItem("userRegisteredAt", user.createdAt);

    // Mostrar en tarjeta
    document.querySelector(".profile-name").textContent = `${user.firstName} ${user.lastName}`;
    document.querySelector(".email").textContent = user.email;
    document.querySelector(".age").textContent = user.age || "N/A";
    document.querySelector(".user-since").textContent = new Date(user.createdAt).getFullYear();

    // Precargar en formulario
    document.getElementById("newName").value = `${user.firstName} ${user.lastName}`;
    document.getElementById("newEmail").value = user.email;
    document.getElementById("newAge").value = user.age || "";

  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    alert("⚠️ No se pudo cargar la información del usuario");
  }

  // --- Guardar cambios perfil ---
  const configForm = document.getElementById("configurationForm");
  const updateForm = document.getElementById("updateForm");
  const newPasswordInput = document.getElementById("newPassword");

  if (configForm) {
    configForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newName = document.getElementById("newName").value.trim();
      const newEmail = document.getElementById("newEmail").value.trim();
      const newAge = document.getElementById("newAge").value.trim();
      const currentPassword = document.getElementById("currentPassword").value.trim();
      const newPassword = newPasswordInput?.value.trim();

      if (!currentPassword) {
        alert("⚠️ Debes ingresar tu contraseña actual para confirmar cambios.");
        return;
      }

      const [firstNameUpdate, ...lastNameParts] = newName.split(" ");
      const lastNameUpdate = lastNameParts.join(" ") || "";

      try {
        // 👇 Llamada a backend
        const res = await updateUser(userId, {
          firstName: firstNameUpdate,
          lastName: lastNameUpdate,
          email: newEmail,
          age: Number(newAge),
          currentPassword,
          newPassword: newPassword || undefined,
        });

        const updatedUser = res.data;

        // Actualizar localStorage
        localStorage.setItem("firstName", updatedUser.firstName);
        localStorage.setItem("lastName", updatedUser.lastName);
        localStorage.setItem("userEmail", updatedUser.email);
        localStorage.setItem("userAge", updatedUser.age);

        // Refrescar tarjeta
        document.querySelector(".profile-name").textContent =
          `${updatedUser.firstName} ${updatedUser.lastName}`.trim();
        document.querySelector(".email").textContent = updatedUser.email;
        document.querySelector(".age").textContent = updatedUser.age;

        alert("✅ Cambios guardados correctamente");
        configForm.reset();
        updateForm.classList.add("hidden");
      } catch (error) {
        console.error("Error actualizando perfil:", error);
        alert("❌ No se pudo actualizar el perfil");
      }
    });
  }

  // --- Logout ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "login.html";
    });
  }
});
