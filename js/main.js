import { initializeTheme } from './modules/theme.js';
import { initializeCursor } from './modules/cursor.js';
import { initializeIntro } from './modules/intro.js';

// Initialize all modules on page load
function onLoad() {
    initializeTheme();
    initializeCursor();
    initializeIntro();
}

window.onload = onLoad;