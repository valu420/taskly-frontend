const routes = {
  '/': 'index.html',
  '/home': 'src/views/home.html',
  '/login': 'src/views/login.html',
  '/register': 'src/views/register.html',
  '/dashboard': 'src/views/dashboard.html',
  '/add-task': 'src/views/add-task.html',
  '/kanban': 'src/views/kanban.html',
  '/recover-password': 'src/views/recoverPassword.html',
  '/confirm-password': 'src/views/confirmPassword.html',
  '/configuration': 'src/views/configuration.html',
  
};

// Navega a una ruta específica
export function navigateTo(path) {
  const view = routes[path];
  if (view) {
    window.location.href = view;
  } else {
    window.location.href = 'index.html'; // Ruta por defecto si no existe
  }
}

// Obtiene la ruta actual
export function getCurrentRoute() {
  const path = window.location.pathname.replace(/^\/+/, '');
  return Object.keys(routes).find(route => routes[route] === path) || '/';
}