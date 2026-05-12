const params = new URLSearchParams(window.location.search);
const categoryKey = params.get("category") || "home-essentials";
const category = window.deClutCategories[categoryKey] || window.deClutCategories["home-essentials"];

const title = document.querySelector("[data-category-title]");
const intro = document.querySelector("[data-category-intro]");
const hero = document.querySelector("[data-category-hero]");
const grid = document.querySelector("[data-item-grid]");
const cartCount = document.querySelector("[data-cart-count]");
const toast = document.querySelector("[data-toast]");
const lendDialog = document.querySelector("[data-lend-dialog]");
const lendForm = document.querySelector("[data-lend-form]");
const lendItem = document.querySelector("[data-lend-item]");
const lendTitle = document.querySelector("[data-lend-title]");
const conditionSelect = document.querySelector("[data-condition-select]");
const workingField = document.querySelector("[data-working-field]");
const expiryField = document.querySelector("[data-expiry-field]");

const conditionOptions = {
  electronics: ["Excellent", "Good", "Average", "Needs repair"],
  edibles: ["Sealed", "Fresh stock", "Near expiry", "Bulk pack"],
  furniture: ["Like new", "Excellent", "Good", "Average", "Visible wear"],
  carpets: ["Freshly cleaned", "Excellent", "Good", "Average", "Event-used"],
  laundry: ["Excellent", "Good", "Average", "Recently serviced"],
  kitchen: ["Excellent", "Good", "Average", "Deep-cleaned"],
  decor: ["Like new", "Excellent", "Good", "Average"],
  work: ["Excellent", "Good", "Average", "Needs minor service"],
  "home-essentials": ["Excellent", "Good", "Average", "Recently cleaned"],
};

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

function setConditionOptions() {
  const options = conditionOptions[categoryKey] || conditionOptions["home-essentials"];
  conditionSelect.replaceChildren(
    new Option("Select condition", ""),
    ...options.map((option) => new Option(option, option)),
  );

  const needsExpiry = categoryKey === "edibles";
  const needsWorking = ["electronics", "laundry", "kitchen", "home-essentials", "work"].includes(categoryKey);
  expiryField.hidden = !needsExpiry;
  expiryField.querySelector("input").required = needsExpiry;
  workingField.hidden = !needsWorking;
  workingField.querySelector("select").required = needsWorking;
}

function openLendForm(name) {
  lendItem.value = `${name} - ${category.name}`;
  lendTitle.textContent = `Lend ${name}`;
  setConditionOptions();
  if (typeof lendDialog.showModal === "function") {
    lendDialog.showModal();
  }
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
      <button type="button" data-action="borrow">Borrow</button>
      <button type="button" data-action="lend">Lend</button>
    </div>
  `;

  card.querySelector("[data-action='borrow']").addEventListener("click", () => {
    const cart = readCart();
    cart.push({ category: category.name, name, price });
    writeCart(cart);
    showToast(`${name} added to your borrow cart.`);
  });

  card.querySelector("[data-action='lend']").addEventListener("click", () => {
    openLendForm(name);
  });

  return card;
}

document.title = `DE-Clut | ${category.name}`;
title.textContent = category.name;
intro.textContent = category.intro;
hero.style.backgroundImage = `linear-gradient(90deg, rgba(23, 32, 38, 0.88), rgba(23, 32, 38, 0.48)), url("${category.image}")`;
grid.replaceChildren(...category.items.map(createItemCard));
writeCart(readCart());

document.querySelectorAll("[data-close-lend]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(lendDialog));
});

lendDialog.addEventListener("click", (event) => {
  if (event.target === lendDialog) {
    closeDialog(lendDialog);
  }
});

lendForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!lendForm.reportValidity()) {
    return;
  }
  const listings = JSON.parse(localStorage.getItem("deClutListings") || "[]");
  const data = new FormData(lendForm);
  listings.push({
    category: category.name,
    item: data.get("itemTitle"),
    condition: data.get("condition"),
    rate: data.get("rate"),
    deposit: data.get("deposit"),
  });
  localStorage.setItem("deClutListings", JSON.stringify(listings));
  closeDialog(lendDialog);
  showToast("Lend listing saved for demo review.");
  lendForm.reset();
});
