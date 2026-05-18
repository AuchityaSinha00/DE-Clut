# DE-Clut Demo Database

The current GitHub Pages version uses browser `localStorage` as a demo database. It keeps data on the visitor's device and is not shared across users.

## Tables / Collections

- `deClutProfile`: profile, address, Aadhaar last 4 digits, phone, and photo filename.
- `deClutListings`: items uploaded through the Lend form, including category, condition, rate, deposit, expiry, working condition, handover location, notes, photo filename, and awarded coins.
- `deClutCart`: selected borrow listing records.
- `deClutBorrowRequests`: submitted borrow requests, request status, fulfillment choice, and payment preference.
- `deClutWallet`: coin balance and redeemed coin total.
- `deClutTransactions`: coin history for lend uploads, borrow requests, and redemption.

## Production Upgrade

For a real marketplace, replace `store.js` with a backend database such as Firebase, Supabase, PostgreSQL, or MongoDB. Aadhaar OTP, photo storage, payments, and user identity must run through secure backend services.
