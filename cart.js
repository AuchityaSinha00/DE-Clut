const cartList = document.querySelector("[data-cart-list]");
const confirmBorrow = document.querySelector("[data-confirm-borrow]");

function renderCart() {
  const cart = getCart();
  if (!cart.length) {
    cartList.innerHTML = `
      <div class="empty-state">
        <strong>Your cart is empty</strong>
        <span>Borrow options appear here after you choose a customer listing.</span>
      </div>
    `;
    confirmBorrow.disabled = true;
    updateHeaderStats();
    return;
  }

  confirmBorrow.disabled = false;
  cartList.replaceChildren(
    ...cart.map((item, index) => {
      const row = document.createElement("article");
      row.className = "cart-row";
      row.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>${item.category}</p>
          <span>${item.price}</span>
        </div>
        <button class="secondary-form-button" type="button">Remove</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        const nextCart = getCart();
        nextCart.splice(index, 1);
        setCart(nextCart);
        renderCart();
      });
      return row;
    }),
  );
  updateHeaderStats();
}

confirmBorrow.addEventListener("click", () => {
  const cart = getCart();
  if (!cart.length) return;
  addCoins(cart.length * 50, `Confirmed ${cart.length} borrow request(s)`);
  setCart([]);
  renderCart();
  showGlobalToast(`${cart.length} borrow request(s) submitted. Coins added.`);
});

renderCart();
