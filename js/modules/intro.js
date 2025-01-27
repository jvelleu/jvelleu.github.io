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

// Initialize intro functionality
export function initializeIntro() {
    initializePositions();

    document.addEventListener("mousemove", (event) => {
        const leftText = document.getElementById("left-text");
        const rightText = document.getElementById("right-text");
        const columnText = document.querySelectorAll(".column-text li");
        const columnTextContainer = document.querySelector(".column-text");
        const columnLength = document.getElementById("ul_o").getElementsByTagName("li").length - 1;

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
}