import { loadHeaderFooter, getParam, setLocalStorage } from "./utils.mjs";

loadHeaderFooter();

export default class ExternalServices {
  constructor() {
    this.productUrl = "https://wdd330-backend.onrender.com/products";
  }

  async findProductById(productId) {
    const response = await fetch(`${this.productUrl}/${productId}`);
    const data = await response.json();
    return data;
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    const response = await fetch("https://wdd330-backend.onrender.com/checkout", options);
    const data = await response.json();
    return data;
  }
}
