document.addEventListener("DOMContentLoaded", function () {
const welcomeScreen = document.getElementById("welcome");
const mainContent = document.getElementById("main-content");
const now = new Date().getTime();
const lastVisit = localStorage.getItem("lastVisit");

function showMainContent() {  
    welcomeScreen.style.display = "none";  
    mainContent.style.display = "block";  
}  

// Check if running as a PWA  
const isPWA = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;  

if (isPWA || (lastVisit && now - lastVisit < 60 * 60 * 1000)) {    
    // Skip welcome screen if PWA or revisited within 01 hour 
    showMainContent();  
} else {  
    // Show welcome screen for 20 seconds, then hide  
    welcomeScreen.style.display = "block";  
    mainContent.style.display = "none";  

    setTimeout(() => {  
        showMainContent();  
        localStorage.setItem("lastVisit", now);  
    }, 20000);  
}

});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Function to check and close open popups in specific order
function closeOpenPopup() {
    // Define the order of popups to close
    const popupOrder = [
        "seriesPopup",
        "devicesPopup",
        "storesPopup",
        "itemPopup"
    ];

    // Check each popup in order
    for (const popupId of popupOrder) {
        const popup = document.getElementById(popupId);
        if (popup?.style.display === "block") {
            popup.style.display = "none";
            return true; // Indicate that a popup was closed
        }
    }

    return false; // No popups were closed
}

// Handle back button press
window.addEventListener("popstate", function (event) {
    if (closeOpenPopup()) {
        // Prevent further back navigation if a popup was closed
        history.pushState(null, null, location.href);
        return;
    }

    // If already on the main page, prevent leaving
    if (window.location.href === "https://nearbys.online") {
        history.pushState(null, null, location.href);
        return;
    }

    // Otherwise, allow regular back navigation
    history.back();
});

// Initialize history state
window.onload = function () {
    history.pushState(null, null, location.href);
};
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

window.addEventListener("popstate", function (event) {
    if (window.location.pathname === "/") {
        history.pushState(null, null, location.href);
    }
});

window.onload = function () {
    history.pushState(null, null, location.href);
};

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

document.addEventListener("DOMContentLoaded", function() {
        document.querySelectorAll(".install-container").forEach(container => {
            const dimOverlay = container.querySelector(".dim-overlay");
            const iosInstallGuide = container.querySelector(".ios-install-guide");
            const iosInstallButton = container.querySelector(".ios-install-button");
            const closeGuideButton = container.querySelector(".close-guide");

            function closeGuide() {  
                dimOverlay.style.display = "none";  
                iosInstallGuide.style.display = "none";  
            }

            iosInstallButton.addEventListener("click", function() {
                dimOverlay.style.display = "block";
                iosInstallGuide.style.display = "block";
            });

            closeGuideButton.addEventListener("click", closeGuide);
            dimOverlay.addEventListener("click", closeGuide);
        });
    });

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

document.addEventListener("DOMContentLoaded", function() {
const installContainers = document.querySelectorAll(".install-container");

// Check if the app is running in standalone (installed as a PWA) mode  
if (window.matchMedia('(display-mode: standalone)').matches) {  
    // Hide all install containers if the app is a PWA  
    installContainers.forEach(container => {  
        container.style.display = "none";  
    });  
}

});
