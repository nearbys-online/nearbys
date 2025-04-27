
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
        { id: 'removeliked-popup', display: 'block' },
        { id: 'storesPopup', display: 'block' },
        { id: 'likedPopup', display: 'block' },    
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

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

document.addEventListener("DOMContentLoaded", function () {
    let currentHandleToRemove = null; // Track the handle to remove

    window.showLiked = function() {
      const storesPopup = document.getElementById('storesPopup');
      if (storesPopup && storesPopup.style.display !== 'none') {
        storesPopup.style.display = 'none';
      }

      const popup = document.getElementById('likedPopup');
      const container = document.getElementById('likedCollections');
      const favorites = JSON.parse(localStorage.getItem('favoriteCollections')) || [];

      container.innerHTML = ''; // Clear previous content

      if (favorites.length === 0) {
        container.innerHTML = '<p style="text-align: left; color: #009500; white-space: nowrap;">No Liked Stores yet.</p>';
      } else {
        favorites.forEach(handle => {
          const collection = window.Shopify.collections?.find(c => c.handle === handle) || {
            handle: handle,
            title: handle.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
            url: `/collections/${handle}`,
            image: { src: 'https://via.placeholder.com/300' }
          };

          const collectionUrl = collection.url && collection.url !== 'undefined' ? collection.url : `/collections/${handle}`;

          const collectionHtml = `
            <div class="liked-card" data-handle="${handle}">
              <div class="remove-icon" onclick="confirmRemove('${handle}')">×</div>
              <img src="${collection.image.src}" alt="${collection.title}" onclick="window.location.href='${collectionUrl}'">
              <p>${collection.title}</p>
            </div>
          `;
          console.log('Card HTML:', collectionHtml); // Debug to confirm icon is included
          container.insertAdjacentHTML('beforeend', collectionHtml);
        });
      }
      popup.style.display = 'block';
    };

    window.confirmRemove = function(handle) {
      currentHandleToRemove = handle;
      document.getElementById('removeliked-popup').style.display = 'block';
    };

    document.getElementById('confirmRemove').addEventListener('click', function() {
      if (currentHandleToRemove) {
        let favorites = JSON.parse(localStorage.getItem('favoriteCollections')) || [];
        favorites = favorites.filter(h => h !== currentHandleToRemove);
        localStorage.setItem('favoriteCollections', JSON.stringify(favorites));

        const card = document.querySelector(`.liked-card[data-handle="${currentHandleToRemove}"]`);
        if (card) card.remove();

        const container = document.getElementById('likedCollections');
        if (favorites.length === 0) {
          container.innerHTML = '<p style="text-align: center; color: #009500; white-space:nowrap;">No Liked Stores yet.</p>';
        }

        document.getElementById('removeliked-popup').style.display = 'none';
        currentHandleToRemove = null;
      }
    });
  });
