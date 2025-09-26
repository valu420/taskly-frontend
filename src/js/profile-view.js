import { getUserProfile } from "../services/userService";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = await getUserProfile();
    console.log(user);

    document.getElementById("profileName").textContent =
      (user.firstName || "") + " " + (user.lastName || "");
    document.getElementById("profileEmail").textContent =
      user.email || "Sin email";
    document.getElementById("profileAge").textContent =
      user.age !== undefined ? user.age : "N/A";
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
});