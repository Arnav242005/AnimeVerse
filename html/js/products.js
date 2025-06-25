let products = [];
let currentCategory = null;
let currentAnime = null;

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("category")) {
  currentCategory = urlParams.get("category");
}
if (urlParams.get("anime")) {
  currentAnime = urlParams.get("anime");
}

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
    const productStr = encodeURIComponent(JSON.stringify(p));
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <p class="main-p">AnimeVerse Store</p>
        <h3>${p.name}</h3>
        <p class="other-p">${p.anime} | ${p.category}</p>
        <p class="other-p">${p.price}</p>
        <button class="Addtocart" data-product="${productStr}">Add To Cart</button>
      </div>
    `;
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("Addtocart")) {
    const productStr = decodeURIComponent(e.target.getAttribute("data-product"));
    const product = JSON.parse(productStr);

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount(); // Optional: to update cart icon
    // window.location.href = "cart.html"; // Optional: redirect to cart
    document.getElementById("modalBodyContent").textContent =
      `"${product.name}" has been added to your cart!`;

    // Show Bootstrap modal manually
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  }
});

//Update cart count in navbar
function updateCartCount() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.getAttribute("data-type");
    const value = button.getAttribute("data-value");

    if (type === "category") {
      currentCategory = value;
      currentAnime = null;
    } else if (type === "anime") {
      currentAnime = value;
      currentCategory = null;
    }

    displayProducts();
  });
});

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

window.onload = () => {
  fetch("data/productdata.json")
    .then(res => res.json())
    .then(data => {
      products = data;
      displayProducts();
      updateCartCount();
    })
    .catch(err => {
      console.error("Error loading products:", err);
      document.querySelector(".product-container").innerHTML = "<p>Error loading products.</p>";
    });
};
