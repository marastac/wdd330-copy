import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.getElementById("zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

const form = document.getElementById("checkout-form");
const message = document.getElementById("message");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fname = document.getElementById("fname")?.value.trim();
  const lname = document.getElementById("lname")?.value.trim();
  const email = document.getElementById("email")?.value.trim() || "test@example.com";
  const address = document.getElementById("street")?.value.trim();
  const city = document.getElementById("city")?.value.trim();
  const zip = document.getElementById("zip")?.value.trim();
  const cardnumber = document.getElementById("cardNumber")?.value.trim();

  if (!fname || !lname || !email || !address || !city || !zip || !cardnumber) {
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

  message.textContent = "Submitting...";
  message.style.color = "black";

  try {
    const result = await checkout.checkout(form);
    console.log("SERVER RESPONSE:", result);

    // Mostrar el resultado completo del servidor por depuración
    message.textContent = JSON.stringify(result);
    message.style.color = "blue";

    if (result.success) {
      message.textContent = "Order placed successfully!";
      message.style.color = "green";
      form.reset();
    } else {
      message.textContent = "There was a problem submitting your order.";
      message.style.color = "red";
    }
  } catch (err) {
    console.error("Checkout error:", err);
    message.textContent = "Error connecting to server.";
    message.style.color = "red";
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
