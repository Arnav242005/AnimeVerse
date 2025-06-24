// Sample product list
const products = [
  { name: "Naruto Pendant", category: "Pendant", anime: "Naruto", price: "$10", image: "img/naruto.jpg" },
  { name: "Luffy Hat", category: "Hat", anime: "One Piece", price: "$12", image: "images/ONEPIECE.jpg" },
  { name: "Gojo Shirt", category: "TShirts", anime: "Jujutsu Kaisen", price: "$15", image: "img/gojo.jpg" }
];

// Global filters
let currentCategory = null;
let currentAnime = null;

// Read URL filters if present
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("category")) {
  currentCategory = urlParams.get("category");
}
if (urlParams.get("anime")) {
  currentAnime = urlParams.get("anime");
}

// Render products based on current filters
function displayProducts() {
  const container = document.querySelector(".product-container");
  container.innerHTML = "";

  let filtered = products;

  if (currentCategory) {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
  }
  if (currentAnime) {
    filtered = filtered.filter(p => p.anime.toLowerCase() === currentAnime.toLowerCase());
  }

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <p class="main-p">AnimeVerse Store</p>
        <h3>${p.name}</h3>
        <p class="other-p">${p.anime} | ${p.category}</p>
        <p class="other-p">${p.price}</p>
        <button class="Addtocart">Add To Cart</button>
      </div>
    `;
  });
}

// Handle filter button clicks
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.getAttribute("data-type");
    const value = button.getAttribute("data-value");

    if (type === "category") {
      currentCategory = value;
      currentAnime = null; // Clear anime filter
    } else if (type === "anime") {
      currentAnime = value;
      currentCategory = null; // Clear category filter
    }

    displayProducts();
  });
});

// Sidebar toggle logic
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Initial display on page load
window.onload = displayProducts;