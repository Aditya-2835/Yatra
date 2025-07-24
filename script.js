const sections = document.querySelectorAll('section');
let currentSection = 0;
let isScrolling = false;

// Scroll to a section
function scrollToSection(index) {
  isScrolling = true;
  sections[index].scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    isScrolling = false;
  }, 1000); // delay before next scroll allowed
}

// Wheel event listener
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0) {
    // Scroll down
    if (currentSection < sections.length - 1) {
      currentSection++;
      scrollToSection(currentSection);
    }
  } else {
    // Scroll up
    if (currentSection > 0) {
      currentSection--;
      scrollToSection(currentSection);
    }
  }
});


// // Sample suggestion list
// const suggestions = [
//   "Restaurants",
//   "Cafes",
//   "Temples",
//   "Beaches",
//   "Museums",
//   "Local Markets",
//   "Historical Places",
//   "Street Food",
//   "Shopping Malls"
// ];

// const searchInput = document.querySelector('.search-container input[type="text"]');
// const suggestionBox = document.createElement('div');
// suggestionBox.classList.add('suggestion-box');
// document.querySelector('.search-container').appendChild(suggestionBox);

// // Display filtered suggestions
// searchInput.addEventListener('input', () => {
//   const value = searchInput.value.toLowerCase();
//   suggestionBox.innerHTML = '';

//   if (value) {
//     const filtered = suggestions.filter(s =>
//       s.toLowerCase().includes(value)
//     );
//     filtered.forEach(item => {
//       const div = document.createElement('div');
//       div.textContent = item;
//       div.classList.add('suggestion-item');
//       div.onclick = () => {
//         searchInput.value = item;
//         suggestionBox.innerHTML = '';
//       };
//       suggestionBox.appendChild(div);
//     });
//   }
// });

// // Navigate to new page on Enter
// searchInput.addEventListener('keydown', e => {
//   if (e.key === 'Enter') {
//     e.preventDefault();
//     const query = encodeURIComponent(searchInput.value.trim());
//     if (query) {
//       window.location.href = `result.html?query=${query}`;
//     }
//   }
// });

const suggestions = [
  "Restaurants",
  "Belagavi",
  "Cafes",
  "Temples",
  "Beaches",
  "Museums",
  "Local Markets",
  "Historical Places",
  "Street Food",
  "Shopping Malls"
];

const searchInput = document.querySelector('.search-container input[type="text"]');
const suggestionBox = document.createElement('div');
suggestionBox.classList.add('suggestion-box');
document.querySelector('.search-container').appendChild(suggestionBox);

let currentFocus = -1; // Index of highlighted suggestion

// Show suggestions
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  suggestionBox.innerHTML = '';
  currentFocus = -1;

  if (value) {
    const filtered = suggestions.filter(s =>
      s.toLowerCase().includes(value)
    );
    filtered.forEach((item, index) => {
      const div = document.createElement('div');
      div.textContent = item;
      div.classList.add('suggestion-item');
      div.setAttribute('data-index', index);

      div.onclick = () => {
        searchInput.value = item;
        suggestionBox.innerHTML = '';
      };

      suggestionBox.appendChild(div);
    });
  }
});

// Handle keyboard navigation
searchInput.addEventListener('keydown', e => {
  const items = suggestionBox.querySelectorAll('.suggestion-item');

  if (e.key === 'ArrowDown') {
    currentFocus++;
    highlightItem(items);
  } else if (e.key === 'ArrowUp') {
    currentFocus--;
    highlightItem(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (currentFocus > -1 && items[currentFocus]) {
      searchInput.value = items[currentFocus].textContent;
      suggestionBox.innerHTML = '';
    }
    const query = encodeURIComponent(searchInput.value.trim());
    if (query) {
      window.location.href = `result.html?query=${query}`;
    }
  }
});

function highlightItem(items) {
  if (!items.length) return;
  items.forEach(item => item.classList.remove('active'));

  if (currentFocus < 0) currentFocus = 0;
  if (currentFocus >= items.length) currentFocus = items.length - 1;

  items[currentFocus].classList.add('active');
  searchInput.value = items[currentFocus].textContent;
}


function openMap(url) {
  window.open(url, '_blank');
}

function openReviewPopup(placeName) {
  document.getElementById("popup-title").textContent = `Review for ${placeName}`;
  document.getElementById("review-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("review-popup").style.display = "none";
}

function submitReview() {
  const userType = document.getElementById("user-type").value;
  const reviewText = document.querySelector(".popup-content textarea").value;
  
  if (reviewText.trim() === "") {
    alert("Please write a review before submitting.");
    return;
  }

  alert(`Thank you for your ${userType} review!`);
  document.querySelector(".popup-content textarea").value = "";
  closePopup();
}


function openMap(url) {
  window.open(url, '_blank');
}

function openReviewPopup(placeName) {
  document.getElementById("popup-title").textContent = `Review for ${placeName}`;
  document.getElementById("review-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("review-popup").style.display = "none";
}

function submitReview() {
  const userType = document.getElementById("user-type").value;
  const reviewText = document.querySelector(".popup-content textarea").value;

  if (reviewText.trim() === "") {
    alert("Please write a review before submitting.");
    return;
  }

  alert(`Thank you for your ${userType} review!`);
  document.querySelector(".popup-content textarea").value = "";
  closePopup();
}


const dummyPlaces = [
  { name: "Golden Temple", type: "place", distance: 0.8, rating: 4, image: "https://source.unsplash.com/300x200/?temple" },
  { name: "Goa Beach", type: "place", distance: 2.5, rating: 5, image: "https://source.unsplash.com/300x200/?beach" },
  { name: "Chandni Chowk", type: "place", distance: 0.5, rating: 3, image: "https://source.unsplash.com/300x200/?market" },
  { name: "Indian Museum", type: "place", distance: 4, rating: 4, image: "https://source.unsplash.com/300x200/?museum" },
  { name: "Manali Hills", type: "place", distance: 45, rating: 5, image: "https://source.unsplash.com/300x200/?hillstation" },
  { name: "Delhi Street Food", type: "restaurant", distance: 0.6, rating: 3, image: "https://source.unsplash.com/300x200/?streetfood" },
  { name: "Spice Villa", type: "restaurant", distance: 3.2, rating: 4, image: "https://source.unsplash.com/300x200/?restaurant" },
  { name: "Cafe Delhi Heights", type: "restaurant", distance: 7, rating: 5, image: "https://source.unsplash.com/300x200/?cafe" },
];

let selectedType = 'restaurants';
let selectedMood = 'all';

function switchCategory(type) {
  selectedType = type;
  renderFilteredPlaces();
}

function filterByMood(mood) {
  selectedMood = mood;
  renderFilteredPlaces();
}

function renderFilteredPlaces() {
  const container = document.getElementById("filtered-container");
  container.innerHTML = "";

  const filtered = dummyPlaces.filter(place => {
    const matchType = selectedType === 'all' || place.type === selectedType.slice(0, -1);
    const matchMood = (
      selectedMood === 'all' ||
      (selectedMood === 'lazy' && place.distance <= 1) ||
      (selectedMood === 'moderate' && place.distance <= 10) ||
      (selectedMood === 'active' && place.distance <= 50)
    );
    return matchType && matchMood;
  });

  filtered.forEach(place => {
    const card = document.createElement("div");
    card.className = "place-card";
    card.innerHTML = `
      <img src="${place.image}" alt="${place.name}" />
      <div class="place-details">
        <h2>${place.name}</h2>
        <p class="stars">${'★'.repeat(place.rating)}${'☆'.repeat(5 - place.rating)} <span style="margin-left:10px;">(${place.distance} km)</span></p>
        <button onclick="openMap('https://www.google.com/maps?q=${encodeURIComponent(place.name)}')">Direction</button>
        <a href="#" onclick="openReviewPopup('${place.name}')">Been here?!! Tell us more about this place</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Dummy functions for existing buttons
function openMap(url) {
  window.open(url, '_blank');
}

function openReviewPopup(place) {
  const popup = document.getElementById('review-popup');
  document.getElementById('popup-title').textContent = `Review - ${place}`;
  popup.style.display = 'flex';
}

function closePopup() {
  document.getElementById('review-popup').style.display = 'none';
}

function submitReview() {
  alert('Thank you for your review!');
  closePopup();
}

window.onload = renderFilteredPlaces;




