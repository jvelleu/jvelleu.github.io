//import { onLoad, activateTheme, activateColorScheme, toggleTheme } from "./modules/theme.js";
import { customCursor } from "./modules/cursor.js";

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
    /*
    export function activateDarkTheme() {
    activateTheme("dark");
    }

    function activateLightTheme() {
    activateTheme("light");
    }
    */
function activateColorScheme() {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches;
    const isNotSupported = !isDarkTheme && !isLightTheme && !isNotSpecified;

    if (isDarkTheme) activateTheme("dark");//activateDarkTheme();
    if (isLightTheme) activateTheme("light");//activateLightTheme();
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
customCursor();