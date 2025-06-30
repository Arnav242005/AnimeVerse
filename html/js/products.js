let products = [];
let currentCategory = null;
let currentAnime = null;
let currentPage = 1;
const itemsPerPage = 15;

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

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  // Slice the data for current page
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filtered.slice(start, end);

  // Render the paginated products
  paginatedItems.forEach(p => {
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

  // Render pagination
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("pagination-btn");
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
    });

    paginationContainer.appendChild(btn);
  }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) return parts.pop().split(';').shift();
    
    return null;
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("Addtocart")) {
    let user = getCookie("username");
    console.log(user);
    
    if(user){
    const productStr = decodeURIComponent(e.target.getAttribute("data-product"));
    const product = JSON.parse(productStr);

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    document.getElementById("modalBodyContent").textContent =
      `"${product.name}" has been added to your cart!`;

    // Show Bootstrap modal manually
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
    }else{
      alert("You need to Login First");
      window.location.href="login.html";
    }

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
    currentPage = 1;
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
