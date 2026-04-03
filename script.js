/**
 * Hotel In-Room Display - Script Logic
 * Handles automated section transitions and real-time clock.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock and Date Management
    const updateTime = () => {
        const now = new Date();
        const timeEl = document.getElementById('current-time');
        const dateEl = document.getElementById('current-date');

        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        }

        if (dateEl) {
            const options = { weekday: 'long', month: 'long', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('en-US', options);
        }
    };

    updateTime();
    setInterval(updateTime, 1000);

    // 2. Automated Section Rotation
    const sections = ['welcome', 'tv-guide', 'dining', 'activities', 'service'];
    let currentIdx = 0;
    const ROTATION_INTERVAL = 8000; // 8 seconds per section

    const rotateSection = () => {
        // Remove active class from current section and nav
        document.querySelector('.content-section.active')?.classList.remove('active');
        document.querySelector('.nav-item.active')?.classList.remove('active');

        // Increment index
        currentIdx = (currentIdx + 1) % sections.length;
        const nextSectionId = sections[currentIdx];

        // Add active class to next section and nav
        const nextSection = document.getElementById(nextSectionId);
        const nextNav = document.querySelector(`.nav-item[data-section="${nextSectionId}"]`);

        if (nextSection) nextSection.classList.add('active');
        if (nextNav) nextNav.classList.add('active');
    };

    // Start rotation after initial delay
    setInterval(rotateSection, ROTATION_INTERVAL);

    // 3. Background Animation
    const bgImage = document.querySelector('.background-image');
    if (bgImage) {
        bgImage.classList.add('ken-burns');
    }

    // 4. Duplicate ticker content for seamless scrolling
    const tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        const clone = tickerContent.innerHTML;
        tickerContent.innerHTML += clone;
    }
});
