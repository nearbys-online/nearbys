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
// Define the order in which popups should be closed (first to last)
const POPUP_CLOSE_ORDER = [
    "seriesPopup",
    "devicesPopup",
    "storesPopup",
    "itemPopup"
];

// Track if we're currently processing a popup close
let isProcessingPopup = false;

// Function to close the next popup in order
function closeNextPopup() {
    // Don't process if already handling a popup
    if (isProcessingPopup) return false;
    
    isProcessingPopup = true;
    
    // Find the first open popup in our order
    for (const popupId of POPUP_CLOSE_ORDER) {
        const popup = document.getElementById(popupId);
        if (popup?.style.display === "block") {
            popup.style.display = "none";
            isProcessingPopup = false;
            return true; // Closed one popup
        }
    }
    
    isProcessingPopup = false;
    return false; // No popups were closed
}

// Handle back button press
window.addEventListener("popstate", function(event) {
    // Try to close just one popup
    if (closeNextPopup()) {
        // If we closed a popup, stay on current page
        history.pushState(null, null, location.href);
        return;
    }

    // If on main page and no popups open, prevent leaving
    if (window.location.href === "https://nearbys.online") {
        history.pushState(null, null, location.href);
        return;
    }

    // Otherwise, proceed with normal back navigation
    history.back();
});

// Initialize history state
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
