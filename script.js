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
