import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const form = document.getElementById("checkout-form");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value.trim();
  const zip = document.getElementById("zip").value.trim();
  const cardnumber = document.getElementById("cardnumber").value.trim();

  if (!fullname || !email || !address || !city || !zip || !cardnumber) {
    message.textContent = "Please fill out all required fields.";
    message.style.color = "red";
    return;
  }

  if (!validateEmail(email)) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
  }

  if (!/^\d{5}$/.test(zip)) {
    message.textContent = "ZIP code must be 5 digits.";
    message.style.color = "red";
    return;
  }

  if (!/^\d{16}$/.test(cardnumber)) {
    message.textContent = "Card number must be 16 digits.";
    message.style.color = "red";
    return;
  }

  message.textContent = "Order placed successfully!";
  message.style.color = "green";
  form.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
