// 1. Sample product list
const products = [
  { name: "Naruto Pendant", category: "Pendant", anime: "Naruto", price: "$10", image: "img/naruto.jpg" },
  { name: "Luffy Hat", category: "Hat", anime: "One Piece", price: "$12", image: "images/ONEPIECE.jpg" },
  { name: "Gojo Shirt", category: "T-Shirt", anime: "Jujutsu Kaisen", price: "$15", image: "img/gojo.jpg" },
];

// 2. Variables to hold current filters
let currentCategory = null;
let currentAnime = null;

// 3. Get initial filter from URL (category=...)
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("category")) {
  currentCategory = urlParams.get("category");
}
if (urlParams.get("anime")) {
  currentAnime = urlParams.get("anime");
}

// 4. Function to display filtered products
function displayProducts() {
  const container = document.querySelector(".product-container");
  container.innerHTML = "";

  let filtered = products;

  if (currentCategory) {
    filtered = filtered.filter(p => p.category === currentCategory);
  }
  if (currentAnime) {
    filtered = filtered.filter(p => p.anime === currentAnime);
  }

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.anime} | ${p.category}</p>
        <p>${p.price}</p>
      </div>
    `;
  });
}

// 5. Add click event to filter buttons (on product page)
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.getAttribute("data-type");
    const value = button.getAttribute("data-value");

    if (type === "category") {
      currentCategory = value;
    } else if (type === "anime") {
      currentAnime = value;
    }

    displayProducts(); // Re-render with new filter
  });
});

// 6. Initial display based on URL
window.onload = displayProducts;

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});