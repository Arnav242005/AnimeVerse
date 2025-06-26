function renderCart() {
  const cartContainer = document.getElementById("cart-container");
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Update cart count
  const countElement = document.getElementById("cart-count");
  if (countElement) countElement.textContent = cart.length;

  // Clear old content
  cartContainer.innerHTML = "";

  // If empty
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="emptycart">Your cart is empty.</p>`;
    return;
  }

  // Render items
  cart.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("cart-item");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>${item.anime} | ${item.category}</p>
        <p>${item.price}</p>
        <button class="removeitem" data-index="${index}">Remove</button>
      </div>
      <div class="pitch">
        <p class="instock">In Stock</p>
        <p class="pitchp">Limited Time Offer</p>
        <p class="cashback">Cashback Available on Net Banking</p>
      </div>
    `;

    cartContainer.appendChild(card);
  });

  // Bind Remove buttons after rendering
  document.querySelectorAll(".removeitem").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const removeIndex = parseInt(e.target.getAttribute("data-index"));
      let updatedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      updatedCart.splice(removeIndex, 1); // remove the item
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCart(); // re-render after removal
    });
  });
}

// Empty Cart button handler
document.addEventListener("DOMContentLoaded", () => {
  renderCart(); // Initial render

  document.querySelector(".clear-cart").addEventListener("click", () => {
    sessionStorage.removeItem("cart");
    renderCart();

    const countElement = document.getElementById("cart-count");
    if (countElement) countElement.textContent = "0";
  });
});
