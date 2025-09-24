import { getUserProfile, updateUser, deleteUser } from "../services/userService.js";

// referencias al DOM
const firstNameInput = document.getElementById("profileName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("profileAge");
const emailInput = document.getElementById("profileEmail");
const saveButton = document.getElementById("saveProfile");
const deleteButton = document.getElementById("deleteAccount");

// cargar perfil al abrir la página
async function loadUserProfile() {
  try {
    const response = await getUserProfile();
    const user = response.data;

    firstNameInput.value = user.profileName || "";
    lastNameInput.value = user.lastName || "";
    ageInput.value = user.profileAge || "";
    emailInput.value = user.profileEmail || "";
  } catch (error) {
    console.error("Error cargando perfil:", error);
    alert("No se pudo cargar el perfil, intenta iniciar sesión de nuevo.");
  }
}

// guardar cambios
saveButton.addEventListener("click", async () => {
  try {
    const updated = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      age: ageInput.value,
    };

    await updateUser(updated);
    alert("Perfil actualizado con éxito ✅");
  } catch (error) {
    console.error("Error actualizando perfil:", error);
    alert("No se pudo actualizar el perfil.");
  }
});

// borrar cuenta
deleteButton.addEventListener("click", async () => {
  if (confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
    try {
      await deleteUser();
      localStorage.removeItem("token");
      window.location.href = "/pages/login.html";
    } catch (error) {
      console.error("Error eliminando cuenta:", error);
      alert("No se pudo eliminar la cuenta.");
    }
  }
});

// inicializar
document.addEventListener("DOMContentLoaded", loadUserProfile);