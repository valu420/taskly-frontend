document.addEventListener("DOMContentLoaded", () => {
  // Simulación: obtén los datos del usuario desde localStorage o una API
  const name = localStorage.getItem("userName") || "Usuario";
  const email = localStorage.getItem("userEmail") || "Sin email";
  const age = localStorage.getItem("userAge") || "N/A";
  const registeredAt = localStorage.getItem("userRegisteredAt");
  const year = registeredAt ? new Date(registeredAt).getFullYear() : "N/A";

  document.getElementById("profileName").textContent = name;
  document.getElementById("profileEmail").textContent = email;
  document.getElementById("profileAge").textContent = age;
  document.getElementById("userSince").textContent = year;
});