
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
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Close suggestion box if clicked outside
document.addEventListener("click", function (event) {
  const suggestionBox = document.getElementById("suggestionBox");
  const searchInput = document.getElementById("searchInput");

  if (
    suggestionBox &&
    !suggestionBox.contains(event.target) &&
    !searchInput.contains(event.target)
  ) {
    suggestionBox.style.display = "none";
  }
});

// Leave a space here to add more custom words:
let customWords = [];

// Track search history from localStorage
function getSearchHistory() {
  const history = localStorage.getItem("searchHistory");
  return history ? JSON.parse(history) : [];
}

function saveSearchTerm(term) {
  let history = getSearchHistory();
  if (!history.includes(term.toLowerCase())) {
    history.unshift(term.toLowerCase());
    if (history.length > 20) history = history.slice(0, 20); // limit history
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

// Show suggestion list
function showSuggestions(input) {
  const suggestionBox = document.getElementById("suggestionBox");
  const rect = input.getBoundingClientRect();

  // Update box position based on input position
  suggestionBox.style.top = (rect.bottom + window.scrollY + 5) + "px";
  suggestionBox.style.left = (rect.left + window.scrollX) + "px";

  const searchTerm = input.value.trim().toLowerCase();
  if (!searchTerm) {
    suggestionBox.style.display = "none";
    suggestionBox.innerHTML = "";
    return;
  }

  const history = getSearchHistory();
  const allSuggestions = [...new Set([...history, ...presetWords, ...customWords])];
  const matches = allSuggestions.filter(word => word.toLowerCase().startsWith(searchTerm));

  if (matches.length > 0) {
    suggestionBox.innerHTML = matches
      .map(word => `<div onclick="selectSuggestion('${word}')">${word}</div>`)
      .join("");
    suggestionBox.style.display = "block";
  } else {
    suggestionBox.style.display = "none";
    suggestionBox.innerHTML = "";
  }
}

function selectSuggestion(word) {
  const input = document.getElementById("searchInput");
  input.value = word;
  document.getElementById("suggestionBox").style.display = "none";
  handleSearch(); // auto search on selection
}

// Search handler with vendor filtering
function handleSearch() {
  const input = document.getElementById("searchInput");
  const searchValue = input.value.trim();
  if (!searchValue) return;

  saveSearchTerm(searchValue);

  const userLocation = getActiveLocation();
  if (!userLocation) {
    showSelectLocationPopup();
    return;
  }

  const radii = [1, 2, 3, 4, 5];
  let nearbyVendors = [];

  for (let i = 0; i < radii.length && nearbyVendors.length === 0; i++) {
    const radius = radii[i];
    nearbyVendors = [];

    for (const vendor in vendors) {
      let distance = getDistance(
        userLocation.lat, userLocation.lon,
        vendors[vendor].lat, vendors[vendor].lng
      );
      if (distance <= radius) {
        nearbyVendors.push(`vendor:${vendor}`);
      }
    }
  }

  const query = encodeURIComponent(searchValue);

  if (nearbyVendors.length > 0) {
    window.location.href = `https://nearbysx.myshopify.com/search?q=${query}+${nearbyVendors.join(" OR ")}`;
  } else {
    const popup = document.getElementById("noItemPopup");
    if (popup) popup.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  const searchButton = document.querySelector(".search-icon-button");

  input.addEventListener("input", () => showSuggestions(input));

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });

  if (searchButton) {
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      handleSearch();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => showSuggestions(input));

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  });
});

// Utility functions
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

if (!userLocation) {
  showSelectLocationPopup();
}

// Input key listener
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => showSuggestions(input));
});
