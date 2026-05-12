function openDialog(dialog) {
  if (dialog && typeof dialog.showModal === "function") {
    dialog.showModal();
  }
}

function closeDialog(dialog) {
  if (dialog && dialog.open) {
    dialog.close();
  }
}

function showGlobalToast(message) {
  let toast = document.querySelector("[data-global-toast]");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.dataset.globalToast = "";
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showGlobalToast.timeout);
  showGlobalToast.timeout = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

function createDeclutDialog() {
  if (document.querySelector("[data-declut-dialog]")) {
    return;
  }

  const dialog = document.createElement("dialog");
  dialog.className = "modal";
  dialog.dataset.declutDialog = "";
  dialog.innerHTML = `
    <form class="modal-panel" method="dialog">
      <div class="modal-head">
        <div>
          <p class="eyebrow">Unified DE-Clut access</p>
          <h2>Start De-Clutting</h2>
        </div>
        <button class="icon-close" type="button" data-close-dialog aria-label="Close">x</button>
      </div>

      <div class="form-grid">
        <label>
          First Name
          <input name="firstName" autocomplete="given-name" required />
        </label>
        <label>
          Last Name
          <input name="lastName" autocomplete="family-name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autocomplete="email" required />
        </label>
        <label>
          Login Password
          <input name="password" type="password" autocomplete="new-password" required />
        </label>
        <label>
          Country
          <input name="country" autocomplete="country-name" required />
        </label>
        <label>
          City
          <input name="city" autocomplete="address-level2" required />
        </label>
        <label>
          PIN
          <input name="pin" inputmode="numeric" autocomplete="postal-code" required />
        </label>
        <label>
          Location
          <input name="location" placeholder="Area, landmark, apartment, or street" required />
        </label>
        <label>
          Aadhaar Number
          <input name="aadhaar" inputmode="numeric" maxlength="12" placeholder="12-digit ID" required />
        </label>
        <label>
          Phone Number
          <input name="phone" type="tel" autocomplete="tel" required />
        </label>
        <label class="wide-field">
          Full Address
          <textarea name="address" rows="3" placeholder="House number, building, street, nearby landmark" required></textarea>
        </label>
        <label class="wide-field">
          Photo
          <input name="photo" type="file" accept="image/*" />
        </label>
      </div>

      <div class="modal-actions">
        <button class="secondary-form-button" type="button" data-close-dialog>Cancel</button>
        <button class="primary-form-button" type="submit">Create DE-Clut profile</button>
      </div>
    </form>
  `;

  document.body.append(dialog);

  dialog.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => closeDialog(dialog));
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog(dialog);
    }
  });

  dialog.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) {
      return;
    }
    closeDialog(dialog);
    showGlobalToast("Profile saved for demo. You can now Borrow or Lend on DE-Clut.");
  });
}

createDeclutDialog();

document.querySelectorAll("[data-start-declut]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openDialog(document.querySelector("[data-declut-dialog]"));
  });
});
