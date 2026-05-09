const params = new URLSearchParams(window.location.search);
const categoryKey = params.get("category") || "home-essentials";
const category = window.deClutCategories[categoryKey] || window.deClutCategories["home-essentials"];

const title = document.querySelector("[data-category-title]");
const intro = document.querySelector("[data-category-intro]");
const hero = document.querySelector("[data-category-hero]");
const grid = document.querySelector("[data-item-grid]");
const cartCount = document.querySelector("[data-cart-count]");
const toast = document.querySelector("[data-toast]");

function readCart() {
  return JSON.parse(localStorage.getItem("deClutCart") || "[]");
}

function writeCart(cart) {
  localStorage.setItem("deClutCart", JSON.stringify(cart));
  cartCount.textContent = String(cart.length);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function createItemCard(item) {
  const [name, description, price] = item;
  const card = document.createElement("article");
  card.className = "item-card";
  card.innerHTML = `
    <div class="item-card-top">
      <span class="item-avatar">${name.slice(0, 1)}</span>
      <span class="item-price">${price}</span>
    </div>
    <h3>${name}</h3>
    <p>${description}</p>
    <div class="item-actions">
      <button type="button" data-action="cart">Add to cart</button>
      <button type="button" data-action="rentout">Rent out</button>
    </div>
  `;

  card.querySelector("[data-action='cart']").addEventListener("click", () => {
    const cart = readCart();
    cart.push({ category: category.name, name, price });
    writeCart(cart);
    showToast(`${name} added to your rent cart.`);
  });

  card.querySelector("[data-action='rentout']").addEventListener("click", () => {
    showToast(`ShelfPartner request started for ${name}.`);
  });

  return card;
}

document.title = `DE-Clut | ${category.name}`;
title.textContent = category.name;
intro.textContent = category.intro;
hero.style.backgroundImage = `linear-gradient(90deg, rgba(23, 32, 38, 0.88), rgba(23, 32, 38, 0.48)), url("${category.image}")`;
grid.replaceChildren(...category.items.map(createItemCard));
writeCart(readCart());
