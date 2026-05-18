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
const expiryNaField = document.querySelector("[data-expiry-na-field]");
const expiryNa = document.querySelector("[data-expiry-na]");
const borrowDialog = document.querySelector("[data-borrow-dialog]");
const borrowTitle = document.querySelector("[data-borrow-title]");
const borrowList = document.querySelector("[data-borrow-list]");

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

function writeCart(cart) {
  setCart(cart);
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
  expiryNaField.hidden = !needsExpiry;
  expiryField.querySelector("input").required = needsExpiry;
  expiryField.querySelector("input").disabled = false;
  expiryNa.checked = false;
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

function openBorrowOptions(name, price) {
  const listings = getListings().filter((listing) => listing.itemName === name && listing.categoryKey === categoryKey);
  borrowTitle.textContent = `Borrow ${name}`;

  if (!listings.length) {
    borrowList.innerHTML = `
      <div class="empty-state">
        <strong>No ${name} listings yet</strong>
        <span>This list will fill automatically when another DE-Clut user lends ${name}.</span>
      </div>
    `;
  } else {
    borrowList.replaceChildren(
      ...listings.map((listing) => {
        const card = document.createElement("article");
        card.className = "borrow-option";
        card.innerHTML = `
          <div>
            <h3>${listing.itemName}</h3>
            <p>${listing.condition} condition • ${listing.rate}</p>
            <span>${listing.handoverLocation}</span>
          </div>
          <button class="primary-form-button" type="button">Borrow</button>
        `;
        card.querySelector("button").addEventListener("click", () => {
          const cart = getCart();
          cart.push({
            category: category.name,
            name: listing.itemName,
            price: listing.rate || price,
            listingId: listing.id,
          });
          writeCart(cart);
          addCoins(25, `Borrow intent for ${listing.itemName}`);
          closeDialog(borrowDialog);
          showToast(`${listing.itemName} added to cart. 25 coins added.`);
        });
        return card;
      }),
    );
  }

  if (typeof borrowDialog.showModal === "function") {
    borrowDialog.showModal();
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
    openBorrowOptions(name, price);
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
writeCart(getCart());

document.querySelectorAll("[data-close-lend]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(lendDialog));
});

lendDialog.addEventListener("click", (event) => {
  if (event.target === lendDialog) {
    closeDialog(lendDialog);
  }
});

document.querySelectorAll("[data-close-borrow]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(borrowDialog));
});

borrowDialog.addEventListener("click", (event) => {
  if (event.target === borrowDialog) {
    closeDialog(borrowDialog);
  }
});

expiryNa.addEventListener("change", () => {
  const input = expiryField.querySelector("input");
  input.disabled = expiryNa.checked;
  input.required = !expiryNa.checked && categoryKey === "edibles";
  if (expiryNa.checked) {
    input.value = "";
  }
});

lendForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!lendForm.reportValidity()) {
    return;
  }
  const listings = getListings();
  const data = new FormData(lendForm);
  const listing = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    category: category.name,
    categoryKey,
    itemName: String(data.get("itemTitle")).replace(` - ${category.name}`, ""),
    category: category.name,
    item: data.get("itemTitle"),
    condition: data.get("condition"),
    workingCondition: data.get("workingCondition"),
    expiryDate: data.get("expiryDate"),
    expiryNotApplicable: Boolean(data.get("expiryNotApplicable")),
    rate: data.get("rate"),
    deposit: data.get("deposit"),
    availableFrom: data.get("availableFrom"),
    minimumPeriod: data.get("minimumPeriod"),
    handoverLocation: data.get("handoverLocation"),
    notes: data.get("notes"),
    photoName: data.get("itemPhoto")?.name || "",
    createdAt: new Date().toISOString(),
  };
  listing.coinValue = estimateItemCoins({
    categoryKey,
    condition: listing.condition,
    rate: listing.rate,
    deposit: listing.deposit,
  });
  listings.push(listing);
  setListings(listings);
  addCoins(listing.coinValue, `Listed ${listing.itemName}`);
  closeDialog(lendDialog);
  showToast(`Listing saved. ${listing.coinValue} coins added.`);
  lendForm.reset();
});
