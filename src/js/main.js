import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

document.addEventListener("DOMContentLoaded", () => {
  new Alert();

  const dataSource = new ProductData("tents");
  const element = document.querySelector(".product-list");
  const listing = new ProductList("Tents", dataSource, element);

  listing.init();
});
