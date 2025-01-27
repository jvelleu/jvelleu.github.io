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

// Shrink cursor when leaving the page
document.addEventListener('mouseleave', () => {
    cursor.style.width = '0px';
    cursor.style.height = '0px';
    cursorBg.style.width = '0px';
    cursorBg.style.height = '0px';
    console.log("leave");
});

// Restore cursor size when re-entering the page
    document.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorBg.style.width = '20px';
    cursorBg.style.height = '20px';
    console.log("enter");
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

//INTRO
// Function to get the width of text using the measureText method
function getTextWidth(text, font = '2rem Arial') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = font;
    return ctx.measureText(text).width;
  }
  
// Function to set initial positions on page load
function initializePositions() {
    const rightText = document.getElementById("right-text");
    const columnText = document.querySelectorAll(".column-text li");
    const columnTextContainer = document.querySelector(".column-text");
  
    // Get the width of the first column-text word
    const firstWordWidth = getTextWidth(columnText[0].textContent);
  
    // Get the width of the entire column-text container
    const columnTextContainerWidth = columnTextContainer.offsetWidth;
  
    // Calculate the initial horizontal offset for "designer"
    const initialOffsetX = firstWordWidth - columnTextContainerWidth;
  
    // Set the horizontal transformation for "designer"
    rightText.style.transform = `translateX(${initialOffsetX}px)`;
  
    // Set initial opacity for the column-text
    updateOpacity(0);
}
  
// Function to update opacity based on the active line
function updateOpacity(activeIndex) {
    const columnText = document.querySelectorAll(".column-text li");
    columnText.forEach((li, index) => {
        const distance = Math.abs(index - activeIndex);
        if (distance === 0) {
            li.style.opacity = "1";
        } else if (distance === 1) {
            li.style.opacity = "0.5";
        } else if (distance === 2) {
            li.style.opacity = "0.25";
        } else {
            li.style.opacity = "0";
        }
    });
}
  
document.addEventListener("mousemove", (event) => {
    const leftText = document.getElementById("left-text");
    const rightText = document.getElementById("right-text");
    const columnText = document.querySelectorAll(".column-text li");
    const columnTextContainer = document.querySelector(".column-text");
    const columnLength = document.getElementById("ul_o").getElementsByTagName("li").length-1;

    // Get the height of the column-text container and the column-text height
    const columnTextContainerRect = columnTextContainer.getBoundingClientRect();
    const columnTextHeight = columnText[0].offsetHeight;

    // Ensure mouse is only interacting over the column-text container
    if (event.clientY < columnTextContainerRect.top || event.clientY > columnTextContainerRect.bottom) {
        return; // Exit if mouse is outside the container
    }

    // Calculate normalized position based on the column-text container's height
    const mouseYWithinContainer = event.clientY - columnTextContainerRect.top;
    const normalizedPosition = Math.min(Math.max(mouseYWithinContainer / columnTextContainerRect.height, 0), 1);

    // Determine which line we're aligned with based on the mouse position
    const lineIndex = Math.min(Math.floor(normalizedPosition * columnText.length), columnLength);

    // Update opacity of column-text
    updateOpacity(lineIndex);

    // Calculate vertical translation (move the lines up/down)
    const translateY = lineIndex * columnTextHeight;

    // Get the width of each column-text word
    const columnTextWidths = Array.from(columnText).map(div => getTextWidth(div.textContent));
    const columnTextContainerWidth = columnTextContainer.offsetWidth;

    // Calculate horizontal translation for the 'designer' text
    const currentWordWidth = columnTextWidths[lineIndex];
    const translateX = currentWordWidth - columnTextContainerWidth;

    // Adjust the position of left-text to ensure it moves vertically but is constrained properly
    leftText.style.transform = `translateY(${translateY}px)`;

    // Apply the same vertical translation to right-text and include the horizontal offset
    rightText.style.transform = `translateY(${translateY}px) translateX(${translateX}px)`;

    // Fix the over-scrolling behavior of left-text by ensuring its position remains within the bounds of columnTextContainer
    const maxTranslateY = columnTextContainerRect.height - columnTextHeight; // Prevent scroll past the container height
    if (translateY > maxTranslateY) {
        leftText.style.transform = `translateY(${maxTranslateY}px)`;
        rightText.style.transform = `translateY(${maxTranslateY}px) translateX(${translateX}px)`;
    }
});

  
// Initialize positions on page load
window.onload = initializePositions;