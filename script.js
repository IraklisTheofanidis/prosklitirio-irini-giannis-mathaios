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

    // ------------------------------
    // Observer for ceremony + reception
    // ------------------------------
    const observerA = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                entry.target.classList.remove("init");
            }
        });
    }, {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    });

    document.querySelectorAll(".ceremony, .reception").forEach(el => {
        el.classList.add("init");
        observerA.observe(el);
    });


    // ------------------------------
    // Observer for god father container
    // ------------------------------
    const observerB = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                entry.target.classList.remove("init");
            }
        });
    }, {
        threshold: 0,
        rootMargin: "0px 0px 150px 0px"  // different behavior
    });

    document.querySelectorAll(".god-father-container").forEach(el => {
        el.classList.add("init");
        observerB.observe(el);
    });

    document.querySelectorAll('a.link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // stop default jump
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            const offset = 50;
            const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: topPos,
            });
        });
    });


});
