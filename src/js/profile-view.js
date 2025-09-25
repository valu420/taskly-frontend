import { getUserProfile } from "../services/userService";

document.addEventListener("DOMContentLoaded", async () => {

  try{
    const user = await getUserProfile();
    console.log(user);
     document.getElementById("profileName").textContent = user.firstName + " " + user.lastName  ;
  document.getElementById("profileEmail").textContent = user.email;
  document.getElementById("profileAge").textContent = user.age;
  // document.getElementById("userSince").textContent = user.registeredAt;


  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
  // Simulación: obtén los datos del usuario desde localStorage o una API
  // const name = localStorage.getItem("userName") || "Usuario";
  // const email = localStorage.getItem("userEmail") || "Sin email";
  // const age = localStorage.getItem("userAge") || "N/A";
  // const registeredAt = localStorage.getItem("userRegisteredAt");
  // const year = registeredAt ? new Date(registeredAt).getFullYear() : "N/A";


});