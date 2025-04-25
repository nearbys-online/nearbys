let index = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;

    function showSlide() {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");

        let delay = index === 0 ? 4000 : 3000;
        index = (index + 1) % totalSlides;

        setTimeout(showSlide, delay);
    }

    showSlide();

    // Move this function here to make it global
    function showMainContent() {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }

    document.addEventListener("DOMContentLoaded", function () {
        const welcomeScreen = document.getElementById("welcome");
        const mainContent = document.getElementById("main-content");
        const now = new Date().getTime();
        const lastVisit = localStorage.getItem("lastVisit");

        const isPWA = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;

        if (isPWA || (lastVisit && now - lastVisit < 60 * 60 * 1000)) {
            showMainContent();
        } else {
            welcomeScreen.style.display = "block";
            mainContent.style.display = "none";

            setTimeout(() => {
                showMainContent();
                localStorage.setItem("lastVisit", now);
            }, 20000);
        }
    });
