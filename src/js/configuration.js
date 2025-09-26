import { getUserProfile, updateUser, deleteUser } from "../services/userService.js";

// referencias al DOM
const profileFirstName = document.getElementById("profileFirstName");
const profileEmail = document.getElementById("profileEmail");
const profileAge = document.getElementById("profileAge");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");

async function loadUserProfile() {
  try {
    const response = await getUserProfile();
    const user = response.data;

    // Muestra en la carta de perfil
    profileFirstName.textContent = user.firstName || "";
    profileEmail.textContent = user.email || "";
    profileAge.textContent = user.age !== undefined ? user.age : "N/A";

    // Muestra en el formulario
    firstNameInput.value = user.firstName || "";
    lastNameInput.value = user.lastName || "";
    ageInput.value = user.age || "";
    emailInput.value = user.email || "";
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