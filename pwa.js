
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

function closeVisiblePopup() {
    // List all possible popups to check
    const popups = [
        { id: 'likedPopup', display: 'block' },
        { id: 'storesPopup', display: 'block' },    
        { id: 'seriesPopup', display: 'block' },
        { id: 'devicesPopup', display: 'block' }, 
        { id: 'itemPopup', display: 'block' }
    ];

    // Find the first visible popup and close it
    for (const popup of popups) {
        const element = document.getElementById(popup.id);
        if (element && element.style.display === popup.display) {
            closePopup(popup.id);
            return; // Exit after closing the first visible popup
        }
    }
}
