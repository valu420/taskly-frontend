import { getUserById, updateUser } from "../services/userService.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Si no hay sesión -> redirige a login
  if (!userId || !token) {
    window.location.href = "login.html";
    return;
  }

  // Elementos del DOM
  const profileNameEl = document.getElementById("profileName");
  const profileEmailEl = document.getElementById("profileEmail");
  const profileAgeEl = document.getElementById("profileAge");
  const userNameSidebar = document.getElementById("userName");

  const editBtn = document.getElementById("editProfileBtn");
  const configForm = document.getElementById("configurationForm");

  // --- Obtener datos frescos del backend ---
  try {
    const res = await getUserById(userId);
    const user = res.data;

    // Mostrar datos en la tarjeta
    profileNameEl.textContent = `${user.firstName} ${user.lastName}`;
    profileEmailEl.textContent = user.email;
    profileAgeEl.textContent = user.age || "N/A";

    // Mostrar nombre en el sidebar
    userNameSidebar.textContent = user.firstName;

    // Precargar formulario
    document.getElementById("newName").value = `${user.firstName} ${user.lastName}`;
    document.getElementById("newEmail").value = user.email;
    document.getElementById("newAge").value = user.age || "";

  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error);
    alert("❌ No se pudieron cargar los datos del perfil");
  }

  // --- Mostrar/ocultar formulario ---
  editBtn.addEventListener("click", () => {
    configForm.classList.toggle("hidden");
    if (!configForm.classList.contains("hidden")) {
      configForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // --- Guardar cambios ---
  configForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newName = document.getElementById("newName").value.trim();
    const newEmail = document.getElementById("newEmail").value.trim();
    const newAge = document.getElementById("newAge").value.trim();
    const currentPassword = document.getElementById("currentPassword").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (!currentPassword) {
      alert("⚠️ Debes ingresar tu contraseña actual para confirmar cambios.");
      return;
    }

    // separar nombre y apellidos
    const [firstNameUpdate, ...lastNameParts] = newName.split(" ");
    const lastNameUpdate = lastNameParts.join(" ") || "";

    try {
      const res = await updateUser(userId, {
        firstName: firstNameUpdate,
        lastName: lastNameUpdate,
        email: newEmail,
        age: Number(newAge),
        currentPassword,
        newPassword: newPassword || undefined,
      });

      const updatedUser = res.data;

      // Actualizar vista
      profileNameEl.textContent = `${updatedUser.firstName} ${updatedUser.lastName}`;
      profileEmailEl.textContent = updatedUser.email;
      profileAgeEl.textContent = updatedUser.age || "N/A";
      userNameSidebar.textContent = updatedUser.firstName;

      alert("✅ Cambios guardados correctamente");
      configForm.classList.add("hidden");

    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert("❌ No se pudo actualizar el perfil");
    }
  });

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
