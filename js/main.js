// THEME
// https://github.com/TehBrian/tehbrian.github.io/blob/main/assets/js/theme.js
function onLoad() {
    // Add listeners for system color-change events.
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => e.matches && activateDarkTheme());
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => e.matches && activateLightTheme());

    // Check local storage for explicit theme preference, else check system.
    if (localStorage.getItem("theme") === "dark") {
        activateDarkTheme();
    } else if (localStorage.getItem("theme") === "light") {
        activateLightTheme();
    } else {
        activateColorScheme();
    }
    }

function activateTheme(theme) {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("theme", theme);
}

function activateDarkTheme() {
    activateTheme("dark");
}

function activateLightTheme() {
    activateTheme("light");
}

function activateColorScheme() {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches;
    const isNotSupported = !isDarkTheme && !isLightTheme && !isNotSpecified;

    if (isDarkTheme) activateDarkTheme();
    if (isLightTheme) activateLightTheme();
    if (isNotSpecified) {
        console.log("Your browser doesn't have a color scheme preference. Defaulting to dark theme.");
        activateDarkTheme();
    }
    if (isNotSupported) {
        console.log("Your browser doesn't support the color scheme preference media query. Defaulting to dark theme.");
        activateDarkTheme();
    }
 }

function toggleTheme() {
    if (document.documentElement.getAttribute("theme") === "dark") {
        activateLightTheme();
    } else {
        activateDarkTheme();
    }
}
onLoad();

// CURSOR
const cursor = document.getElementById('cursor');
const cursorBg = document.getElementById('cursor-bg');
const links = document.querySelectorAll('a');

// Update cursor position
document.addEventListener('mousemove', (e) => {
    const x = e.clientX; // Cursor X position
    const y = e.clientY; // Cursor Y position

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    cursorBg.style.left = `${x}px`;
    cursorBg.style.top = `${y}px`;
});

// Hover effect for links
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
    cursor.style.width = '40px'; // Increase size for main cursor
    cursor.style.height = '40px';

    cursorBg.style.width = '40px'; // Increase size for background
    cursorBg.style.height = '40px';
    cursorBg.style.backgroundColor = 'var(--link-color)'; // Add tint
    });

    link.addEventListener('mouseleave', () => {
    cursor.style.width = '20px'; // Reset size for main cursor
    cursor.style.height = '20px';

    cursorBg.style.width = '20px'; // Reset size for background
    cursorBg.style.height = '20px';
    cursorBg.style.backgroundColor = 'transparent'; // Remove tint
    });
});