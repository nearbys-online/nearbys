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
// Define the strict closing order
const POPUP_CLOSE_ORDER = [
    "seriesPopup",
    "devicesPopup",
    "storesPopup",
    "itemPopup"
];

// Track current popup closing state
let activePopupIndex = -1;

function getNextPopupToClose() {
    // Check which popups are currently open
    const openPopups = POPUP_CLOSE_ORDER.map(id => ({
        id,
        element: document.getElementById(id),
        isOpen: document.getElementById(id)?.style.display === "block"
    }));

    // Find the highest priority open popup
    for (let i = 0; i < openPopups.length; i++) {
        if (openPopups[i].isOpen) {
            return { index: i, id: openPopups[i].id, element: openPopups[i].element };
        }
    }
    return null;
}

window.addEventListener("popstate", function(event) {
    const nextPopup = getNextPopupToClose();
    
    if (nextPopup) {
        // Close only this specific popup
        nextPopup.element.style.display = "none";
        // Stay on current page
        history.pushState(null, null, location.href);
        return;
    }

    // If we get here, no popups are open
    // Keep user on main page no matter what
    if (window.location.href !== "https://nearbys.online") {
        window.location.href = "https://nearbys.online";
    }
    history.pushState(null, null, location.href);
});

// Initialize
window.onload = function() {
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
