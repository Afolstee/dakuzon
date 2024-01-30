import { cart, removeFromCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
        
    <div class="product-info 
    js-cart-item-container-${matchingProduct.id}">
    <img src="${matchingProduct.image}" class="product-img" />
    <div class="order-info">
      <div class="product-title">
        ${matchingProduct.name}
      </div>
      <div class="price">$${formatCurrency(matchingProduct.priceCents)}</div>
      <div class="quantity">
        <span>Quantity: <span class="quantity-value"> ${cartItem.quantity} </span></span
        >
      </div>
      <div class="buttons">
        <button class="update">Update</button
        ><button class="delete js-delete-btn" data-product-id="${matchingProduct.id}">Delete</button>
     </div>
    </div>
    <div class="delivery-options">
      <div class="choose-delivery">Choose a delivery option:</div>
      <div class="delivery-container">
        <div class="delivery-option">
          <div class="input">
            <input
              type="radio" name="name1-${matchingProduct.id}"
              checked
              class="delivery-option-input"
              onclick="click()"
            />
          </div>
          <div id="delivery-price">
            <div id="delivery-date">Tuesday, June 21</div>
            <div class="delivery-price">Free shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <div class="input">
            <input
              type="radio" name="name1-${matchingProduct.id}"
              onclick="click()"
              class="delivery-option-input"
            />
          </div>
          <div id="delivery-price">
            <div id="delivery-date">Wednesday, June 15</div>
            <div class="delivery-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <div class="input">
            <input type="radio" name="name1-${matchingProduct.id}" class="delivery-option-input" />
          </div>
          <div id="delivery-price">
            <div id="delivery-date">Monday, June 13</div>
            <div class="delivery-price">$4.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
});

document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-btn')
.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove();

  });
});
