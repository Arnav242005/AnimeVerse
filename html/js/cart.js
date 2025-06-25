function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Update cart count
  const countElement = document.getElementById("cart-count");
  if (countElement) countElement.textContent = cart.length;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("cart-item");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>${item.anime} | ${item.category}</p>
        <p>${item.price}</p>
      </div>
    `;

    cartContainer.appendChild(card);
  });
}

renderCart();
