const DB_KEYS = {
  cart: "deClutCart",
  listings: "deClutListings",
  profile: "deClutProfile",
  wallet: "deClutWallet",
  transactions: "deClutTransactions",
  borrowRequests: "deClutBorrowRequests",
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("declut:store-updated"));
}

function getWallet() {
  return readJson(DB_KEYS.wallet, { coins: 0, redeemed: 0 });
}

function setWallet(wallet) {
  writeJson(DB_KEYS.wallet, wallet);
}

function addCoins(amount, reason) {
  const wallet = getWallet();
  wallet.coins = Math.max(0, Number(wallet.coins || 0) + amount);
  setWallet(wallet);

  const transactions = readJson(DB_KEYS.transactions, []);
  transactions.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    amount,
    reason,
    date: new Date().toISOString(),
  });
  writeJson(DB_KEYS.transactions, transactions);
  return wallet;
}

function estimateItemCoins({ categoryKey, condition, rate, deposit }) {
  const categoryBase = {
    electronics: 220,
    furniture: 180,
    laundry: 170,
    kitchen: 140,
    "home-essentials": 120,
    work: 130,
    carpets: 95,
    decor: 80,
    edibles: 60,
  };
  const conditionBoost = {
    Excellent: 90,
    "Like new": 90,
    "Freshly cleaned": 70,
    "Fresh stock": 70,
    Good: 55,
    Sealed: 55,
    Average: 25,
    "Near expiry": 10,
  };

  const numericRate = Number(String(rate || "").match(/\d+/)?.[0] || 0);
  const numericDeposit = Number(String(deposit || "").match(/\d+/)?.[0] || 0);
  const worthBoost = Math.min(260, Math.round(numericRate * 0.8 + numericDeposit * 0.08));
  return Math.max(
    25,
    (categoryBase[categoryKey] || 80) + (conditionBoost[condition] || 35) + worthBoost,
  );
}

function getCart() {
  return readJson(DB_KEYS.cart, []);
}

function setCart(cart) {
  writeJson(DB_KEYS.cart, cart);
}

function getListings() {
  return readJson(DB_KEYS.listings, []);
}

function setListings(listings) {
  writeJson(DB_KEYS.listings, listings);
}

function getBorrowRequests() {
  return readJson(DB_KEYS.borrowRequests, []);
}

function setBorrowRequests(requests) {
  writeJson(DB_KEYS.borrowRequests, requests);
}

function updateHeaderStats() {
  document.querySelectorAll("[data-coin-count]").forEach((node) => {
    node.textContent = String(getWallet().coins || 0);
  });
  document.querySelectorAll("[data-cart-pill]").forEach((node) => {
    node.textContent = String(getCart().length);
  });
  document.querySelectorAll("[data-redeem-button]").forEach((button) => {
    button.hidden = (getWallet().coins || 0) < 1000;
  });
}

function initHeaderStats() {
  updateHeaderStats();
  window.addEventListener("storage", updateHeaderStats);
  window.addEventListener("declut:store-updated", updateHeaderStats);
  document.querySelectorAll("[data-redeem-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const wallet = getWallet();
      if ((wallet.coins || 0) < 1000) return;
      wallet.coins -= 1000;
      wallet.redeemed = Number(wallet.redeemed || 0) + 1000;
      setWallet(wallet);
      if (typeof showGlobalToast === "function") {
        showGlobalToast("1000 coins redeemed for demo credit.");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initHeaderStats);
