document.addEventListener("DOMContentLoaded", () => {

    const targetDate = new Date("2026-05-23T17:00:00");
    let timer = null;

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";

            clearInterval(timer);
            return;
        }

        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / (1000 * 60)) % 60;
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }

    function closeMenu() {
        document.body.classList.remove("menu-open");
        sideNav.classList.remove("open");
    }

    updateCountdown();
    timer = setInterval(updateCountdown, 1000);

    const menuButton = document.getElementById("menu-svg");

    menuButton.addEventListener("click", () => {
        sideNav.classList.toggle("open");
    });

    // close-area behavior
    document.querySelector("#sideNav .close-area")
        .addEventListener("click", closeMenu);

    // same behavior for navigation links
    document.querySelectorAll(".mobile-nav .link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                entry.target.classList.remove("init");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".ceremony, .reception, .god-father-container").forEach(el => {
        el.classList.add("init");       // starting position
        observer.observe(el);           // watch each block
    });

});
