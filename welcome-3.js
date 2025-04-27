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
