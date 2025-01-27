// Add listeners for system color-change events.
function setupThemeListeners() {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => e.matches && activateDarkTheme());
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => e.matches && activateLightTheme());
}

// Activate a specific theme
function activateTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("theme", theme);
}

// Activate dark theme
export function activateDarkTheme() {
  activateTheme("dark");
}

// Activate light theme
export function activateLightTheme() {
  activateTheme("light");
}

// Activate system color scheme
function activateColorScheme() {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
  const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches;
  const isNotSupported = !isDarkTheme && !isLightTheme && !isNotSpecified;

  if (isDarkTheme) activateDarkTheme();
  if (isLightTheme) activateLightTheme();
  if (isNotSpecified || isNotSupported) {
      console.log("Your browser doesn't have or support a color scheme preference. Defaulting to dark theme.");
      activateDarkTheme();
  }
}

// Toggle between dark and light themes
export function toggleTheme() {
  if (document.documentElement.getAttribute("theme") === "dark") {
      activateLightTheme();
  } else {
      activateDarkTheme();
  }
}

// Initialize theme functionality
export function initializeTheme() {
  setupThemeListeners();

  // Check local storage for explicit theme preference, else check system.
  if (localStorage.getItem("theme") === "dark") {
      activateDarkTheme();
  } else if (localStorage.getItem("theme") === "light") {
      activateLightTheme();
  } else {
      activateColorScheme();
  }
}