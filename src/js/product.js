import { loadHeaderFooter, getParam, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData();

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function renderProductDetails() {
  const product = await dataSource.findProductById(productId);

  // Mostrar nombre
  document.querySelector(".product-detail h3").textContent = product.Name;

  // Mostrar imagen
  const imgElement = document.querySelector(".product-detail img");
  imgElement.setAttribute("src", product.Images.PrimaryLarge);
  imgElement.setAttribute("alt", product.Name);

  // Mostrar descripción y precio
  document.querySelector(".product-detail .description").textContent =
    product.DescriptionHtmlSimple;
  document.querySelector(".product-detail .price").textContent = `$${product.FinalPrice}`;

  // Botón agregar al carrito
  document
    .getElementById("addToCart")
    .addEventListener("click", () => addProductToCart(product));
}

renderProductDetails();
