export function customCursor() {
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
}