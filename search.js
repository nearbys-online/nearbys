// Function to show devices based on category
function showDevices(category) {
    const popup = document.getElementById('devicesPopup');
    const container = document.getElementById('devicesContainer');

    // Fetch the devices HTML for the selected category
    fetch(`https://nearbysx.pages.dev/${category}.html`)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            addDeviceClickListeners(); // Add click listeners to dynamically loaded elements
        })
        .catch(error => {
            container.innerHTML = "Failed to load devices.";
            console.error("Error fetching devices", error);
        });

    popup.style.display = 'block'; // Display the devices popup
}

// Function to add click listeners to device cards
function addDeviceClickListeners() {
    document.querySelectorAll('#devicesContainer .item-card').forEach(item => {
        item.addEventListener('click', function () {
            const match = this.getAttribute('onclick')?.match(/'([^']+)'/);
            if (match) {
                showSeries(match[1]); // Pass series name to showSeries function
            }
        });
    });
}

// Function to show series based on selected device
function showSeries(series) {
    const popup = document.getElementById('seriesPopup');
    const container = document.getElementById('seriesContainer');

    // Fetch the series HTML for the selected device
    fetch(`https://nearbysx.pages.dev/${series}.html`)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            addSeriesClickListeners(); // Add click listeners to dynamically loaded series cards
        })
        .catch(error => {
            container.innerHTML = "Failed to load series.";
            console.error("Error fetching series", error);
        });

    popup.style.display = 'block'; // Display the series popup
}

// Function to add click listeners to series cards
function addSeriesClickListeners() {
    document.querySelectorAll('#seriesContainer .item-card').forEach(item => {
        item.addEventListener('click', function () {
            const model = this.getAttribute('mn'); // Get 'mn' attribute
            if (model) {
                searchByModel(model); // Pass model name to searchByModel function
            }
        });
    });
}

// Function to close any popup by ID
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

//xxxxxxxxxxxxxxxxxxxxxxxx

function searchByModel(mn) {
    let userLocation = getActiveLocation();

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

    if (nearbyVendors.length > 0) {
        window.location.href = `https://nearbysx.myshopify.com/search?q=${encodeURIComponent(mn)}+${nearbyVendors.join(" OR ")}`;
    } else {
        showNoItemPopup();  // Use the function to show the popup
    }
}
        
//xxxxxxxxxxxxxxxxxxxxxxxx

function showItems(category) {
    fetch(categoryUrls[category])
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, "text/html");
            let items = [];

            doc.querySelectorAll(".item-card").forEach(card => {
                let img = card.querySelector("img")?.src;
                let name = card.querySelector("p")?.textContent;
                let cn = card.getAttribute("cn");

                if (img && name && cn) items.push({ name, image: img, cn });
            });

            let itemList = `<div class="item-grid">`;
            items.forEach(item => {
                itemList += `
                    <div class="item-card" cn="${item.cn}" onclick="searchItem('${item.name}', '${item.cn}')">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <p>${item.name}</p>
                    </div>
                `;
            });
            itemList += `</div>`;

            document.getElementById("itemList").innerHTML = itemList;
            document.getElementById("itemPopup").style.display = "block";
        })
        .catch(error => {
            console.error("Error loading items:", error);
            showNoItemPopup();
        });
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function searchItem(item, cn) {
    let userLocation = getActiveLocation();

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

if (nearbyVendors.length > 0) {
    window.location.href = `https://nearbysx.myshopify.com/search?q=${cn}+${nearbyVendors.join(" OR ")}`;
} else {
    document.getElementById("noItemPopup").style.display = "block";
}
}    

//xxxxxxxxxxxxxxxxxxxxxxxxxxx

function getActiveLocation() {
    const selectedLocation = localStorage.getItem('selectedLocation');
    const selectedLocationCoords = localStorage.getItem('selectedLocationCoords');
    const currentLocation = localStorage.getItem('currentLocation');
    const locationExpiry = localStorage.getItem('locationExpiry');

    // If the last active location was "Current Location"
    if (selectedLocation === "Current Location") {
        if (currentLocation && locationExpiry) {
            // Check if the location has expired
            if (Date.now() > parseInt(locationExpiry)) {
                // Clear expired location data
                localStorage.removeItem('currentLocation');
                localStorage.removeItem('locationExpiry');
                localStorage.removeItem('selectedLocation');
                localStorage.removeItem('selectedLocationCoords');

                // Reset displayed location text
                document.querySelector('.replaceable-text').textContent = "Select Location";

                return null; // No active location
            } else {
                return JSON.parse(currentLocation); // Return valid current location
            }
        } else {
            // If no valid current location, reset text
            document.querySelector('.replaceable-text').textContent = "Select Location";
            return null;
        }
    }

    // If a saved location exists and isn't "Current Location," return it
    if (selectedLocation && selectedLocationCoords) {
        return JSON.parse(selectedLocationCoords);
    }

    return null; // No active location
}

// Call getActiveLocation on page load
document.addEventListener("DOMContentLoaded", function () {
    getActiveLocation();
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function showSelectLocationPopup() {
  const selectLocationPopup = document.getElementById("selectLocationPopup");
  selectLocationPopup.style.display = "block";
  setTimeout(() => {
    selectLocationPopup.style.display = "none";
  }, 4000);
}

// Keep the existing getDistance function
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}        

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

     //show brands of mobiles, laptops   
       document.addEventListener("DOMContentLoaded", function() {
    let lastOpenedSection = null; // Store the last opened section

    function showSection(id) {
        // Hide the previously opened section if it exists
        if (lastOpenedSection && lastOpenedSection !== id) {
            document.getElementById(lastOpenedSection).style.display = "none";
        }

        let targetElement = document.getElementById(id);
        if (targetElement) {
            // Toggle visibility
            if (targetElement.style.display === "grid") {
                targetElement.style.display = "none";
                lastOpenedSection = null;
            } else {
                targetElement.style.display = "grid";
                lastOpenedSection = id;
            }
        }
    }
    document.querySelectorAll(".cardx").forEach(card => {
        card.addEventListener("click", function() {
            let targetId = this.getAttribute("data-target");
            if (targetId) {
                showSection(targetId);
            }
        });
    });
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

   document.addEventListener("DOMContentLoaded", function () {
    // Get all sections with an ID
    document.querySelectorAll("[id]").forEach(section => {
        let sectionId = section.id; // Get section ID
        let fetchUrl = `https://nearbysx.pages.dev/${sectionId}.html`; // Construct the fetch URL

        // Fetch content and load it inside the section
        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${sectionId}`);
                }
                return response.text();
            })
            .then(data => {
                section.innerHTML = data; // Inject fetched HTML
            })
            .catch(error => {
                console.error("Error fetching content:", error);
            });
    });
});

//xxxxxxxxxxxxxxxxxxxxxxxx

function closePopup() {
    document.getElementById("storesPopup").style.display = "none";
}

function showNoItemPopup() {
  const noItemPopup = document.getElementById("noItemPopup");
  selectNoItemPopup.style.display = "block";
  setTimeout(() => {
    selectNoItemPopup.style.display = "none";
  }, 2000);
}
        
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  function showStores(category) {
    // Open storesPopup first
    document.getElementById("storesPopup").style.display = "block";

    // Close likedPopup after a short delay for smooth transition
    const likedPopup = document.getElementById('likedPopup');
    if (likedPopup && likedPopup.style.display !== 'none') {
      setTimeout(() => {
        likedPopup.style.display = 'none';
      }, 100); // 100ms delay for smooth transition
    }

    fetch(categoryUrls[category])
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, "text/html");
        let stores = [];

        doc.querySelectorAll(".stores-card").forEach(card => {
          let img = card.querySelector("img")?.src;
          let name = card.querySelector("p")?.textContent;
          if (img && name) stores.push({ name, image: img });
        });

        let storesList = `<div class="stores-grid">`;
        stores.forEach(stores => {
          storesList += `
            <div class="stores-card" onclick="searchStores('${stores.name}')">
              <img src="${stores.image}" alt="${stores.name}" loading="lazy">
              <p>${stores.name}</p>
            </div>
          `;
        });
        storesList += `</div>`;
        document.getElementById("storesList").innerHTML = storesList;
      })
      .catch(error => {
        console.error("Error loading items:", error);
        document.getElementById("errorPopup").style.display = "block";
      });
  }

  function closeErrorPopup() {
    document.getElementById("errorPopup").style.display = "none";
  }

<!-- xxxxxxxxxxxxxxxxxxxxxx --> 

function searchStores(stores) {
  let userLocation = getActiveLocation();
  
  if (!userLocation) {
    showSelectLocationPopup();
    return;
  }
  
  // Define reference coordinates from user's active location
  const refLat = userLocation.lat;
  const refLng = userLocation.lon;

  let nearbyVendors = [];
  let selectedCategory = stores; // The selected category is passed as the 'stores' parameter

  const radii = [1, 2, 3, 4, 5];
  
  // Loop through increasing radii until matches are found
  for (let i = 0; i < radii.length && nearbyVendors.length === 0; i++) {
    const radius = radii[i];
    nearbyVendors = [];
    
    for (let vendor in vendors) {
      const vendorData = vendors[vendor];
      const distance = getDistance(refLat, refLng, vendorData.lat, vendorData.lng);
      
      if (distance <= radius && vendorData.categories.includes(selectedCategory)) {
        nearbyVendors.push(vendor);
      }
    }
  }
  
  if (nearbyVendors.length > 0) {
    window.location.href = `https://nearbysx.myshopify.com/pages/stores?collections=${nearbyVendors.join(",")}`;
  } else {
    document.getElementById("noItemPopup").style.display = "block";
  }
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxx 

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
        container.innerHTML = '<p style="text-align: center; color: #009500;">No liked vendors yet.</p>';
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
          container.innerHTML = '<p style="text-align: center; color: #009500;">No liked vendors yet.</p>';
        }

        document.getElementById('removeliked-popup').style.display = 'none';
        currentHandleToRemove = null;
      }
    });
  });
