/**
 * Entry point of the application.
 * 
 * - Imports the global base CSS styles.
 * - Imports and initializes the router to handle hash-based navigation.
 */

import './styles/styles.css';
import { navigateTo, getCurrentRoute } from './routes/route.js';

// Ejemplo: mostrar en consola la ruta actual
console.log("Ruta actual:", getCurrentRoute());

// Ejemplo: redirigir al home al iniciar
// navigateTo('/home');