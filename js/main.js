import { initializeTheme } from './modules/theme.js';
import { initializeCursor } from './modules/cursor.js';
import { initializeIntro } from './modules/intro.js';

// Initialize all modules on page load
function onLoad() {
    initializeTheme();
    initializeCursor();
    initializeIntro();
}

// Expose toggleTheme globally for use in HTML
window.toggleTheme = toggleTheme;

window.onload = onLoad;