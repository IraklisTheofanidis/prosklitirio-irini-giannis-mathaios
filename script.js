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

    updateCountdown();
    timer = setInterval(updateCountdown, 1000);

    const menuButton = document.getElementById("menu-svg");

    menuButton.addEventListener("click", () => {
        sideNav.classList.toggle("open");
    });

    const sideNav = document.getElementById("sideNav");
    document.querySelector("#sideNav .close-area")
        .addEventListener("click", () => {
            document.body.classList.remove("menu-open");
            sideNav.classList.remove("open");
        });
});
