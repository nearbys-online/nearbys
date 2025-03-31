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
// Function to check and close open popups
function closeOpenPopup() {
    let seriesPopup = document.getElementById("seriesPopup");
    let devicesPopup = document.getElementById("devicesPopup");
    let itemPopup = document.getElementById("itemPopup");
    let storesPopup = document.getElementById("storesPopup");
    let locationPopup = document.getElementById("locationPopup");

    // Close only seriesPopup first if it's open
    if (seriesPopup?.style.display === "block") {
        seriesPopup.style.display = "none";
        return true; // Return true to indicate a popup was closed
    }

    // Check and close other popups if seriesPopup wasn't open
    if (devicesPopup?.style.display === "block") {
        devicesPopup.style.display = "none";
        return true;
    }
    if (itemPopup?.style.display === "block") {
        itemPopup.style.display = "none";
        return true;
    }
    if (storesPopup?.style.display === "block") {
        storesPopup.style.display = "none";
        return true;
    }
    if (locationPopup?.style.display === "block") {
        locationPopup.style.display = "none";
        return true;
    }
    return false;
}

// Handle back button press
window.addEventListener("popstate", function (event) {
    if (closeOpenPopup()) {
        history.pushState(null, null, location.href); // Keep the page state
    }
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
