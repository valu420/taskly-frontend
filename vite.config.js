import { defineConfig } from "vite";


// Configuración para múltiples páginas
export default defineConfig({
  root: ".", // raíz del proyecto
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        home: "src/pages/home.html",
        dashboard: "src/pages/dashboard.html",
        addTask: "src/pages/add-task.html",
        kanban: "src/pages/kanban.html",
        login: "src/pages/login.html",
        register: "src/pages/register.html",
        recoverPassword: "src/pages/recoverPassword.html",
        confirmPassword: "src/pages/confirmPassword.html"
      }
    }
  }
})