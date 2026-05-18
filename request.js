const requestGrid = document.querySelector("[data-request-grid]");
const params = new URLSearchParams(window.location.search);
const batchId = params.get("batch");

function saveRequestUpdate(id, field, value) {
  const requests = getBorrowRequests();
  const nextRequests = requests.map((request) =>
    request.id === id ? { ...request, [field]: value } : request,
  );
  setBorrowRequests(nextRequests);
}

function renderRequests() {
  const requests = getBorrowRequests().filter((request) => !batchId || request.batchId === batchId);

  if (!requests.length) {
    requestGrid.innerHTML = `
      <div class="empty-state">
        <strong>No borrow request found</strong>
        <span>Confirm a borrow request from your cart to see its status here.</span>
      </div>
    `;
    return;
  }

  requestGrid.replaceChildren(
    ...requests.map((request) => {
      const card = document.createElement("article");
      card.className = "request-card";
      card.innerHTML = `
        <div class="request-status">Pending lender approval</div>
        <h3>${request.itemName}</h3>
        <p>${request.category} • ${request.price}</p>
        <label>
          Pickup / Delivery
          <select data-field="fulfillment">
            <option ${request.fulfillment === "Pickup" ? "selected" : ""}>Pickup</option>
            <option ${request.fulfillment === "Delivery" ? "selected" : ""}>Delivery</option>
          </select>
        </label>
        <label>
          Payment
          <select data-field="payment">
            <option ${request.payment === "Pay on pickup" ? "selected" : ""}>Pay on pickup</option>
            <option ${request.payment === "Pay deposit now" ? "selected" : ""}>Pay deposit now</option>
            <option ${request.payment === "Pay full rental now" ? "selected" : ""}>Pay full rental now</option>
          </select>
        </label>
        <div class="handover-code">
          <span>Handover code</span>
          <strong>Shown after lender accepts</strong>
        </div>
      `;
      card.querySelectorAll("select").forEach((select) => {
        select.addEventListener("change", () => {
          saveRequestUpdate(request.id, select.dataset.field, select.value);
          showGlobalToast("Borrow request preference updated.");
        });
      });
      return card;
    }),
  );
}

renderRequests();
