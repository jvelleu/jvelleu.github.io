// Initialize cursor functionality
export function initializeCursor() {
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
    });

    // Restore cursor size when re-entering the page
    document.addEventListener('mouseenter', () => {
        cursor.style.width = 'var(--radius)';
        cursor.style.height = 'var(--radius)';
        cursorBg.style.width = 'var(--radius)';
        cursorBg.style.height = 'var(--radius)';
    });

    // Hover effect for links
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = 'calc(var(--radius) * 2)'; // Increase size for main cursor
            cursor.style.height = 'calc(var(--radius) * 2)';

            cursorBg.style.width = 'calc(var(--radius) * 2)'; // Increase size for background
            cursorBg.style.height = 'calc(var(--radius) * 2)';
            cursorBg.style.backgroundColor = 'var(--link-color)'; // Add tint
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.width = 'var(--radius)'; // Reset size for main cursor
            cursor.style.height = 'var(--radius)';

            cursorBg.style.width = 'var(--radius)'; // Reset size for background
            cursorBg.style.height = 'var(--radius)';
            cursorBg.style.backgroundColor = 'transparent'; // Remove tint
        });
    });
    document.documentElement.setAttribute("cursor", "custom") // Remove default cursor
}