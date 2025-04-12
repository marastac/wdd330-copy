import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

loadHeaderFooter();

const category = getParam('category');
const search = getParam('search');
const listElement = document.querySelector('.product-list');
const titleElement = document.querySelector('h2');

if (search) {
  
  titleElement.textContent = `Search Results for "${search}"`;
  searchProducts(search);
} else if (category) {
  
  titleElement.textContent = `Top Products: ${category.charAt(0).toUpperCase()}${category.slice(1)}`;
  const dataSource = new ProductData();
  const myList = new ProductList(category, dataSource, listElement);
  myList.init();
}

async function searchProducts(query) {
  const service = new ExternalServices();
  try {
    const response = await fetch(`${service.productUrl}?search=${encodeURIComponent(query)}`);
    const products = await response.json();
    if (products.length === 0) {
      listElement.innerHTML = "<li>No products found.</li>";
      return;
    }
    listElement.innerHTML = products.map(productTemplate).join('');
  } catch (error) {
    console.error('Search error:', error);
    listElement.innerHTML = "<li>Error loading search results.</li>";
  }
}

function productTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/${product.Id}.html">
        <img src="${product.Images.PrimarySmall}" alt="${product.Name}" />
        <h3 class="card__brand">${product.Brand?.Name || ''}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}
