import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

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
        
    <div class="product-info">
    <img src="${matchingProduct.image}" class="product-img" />
    <div class="order-info">
      <div class="product-title">
        ${matchingProduct.name}
      </div>
      <div class="price">$${(matchingProduct.priceCents / 100).toFixed(2)}</div>
      <div class="quantity">
        <span>Quantity: <span class="quantity-value"> ${cartItem.quantity} </span></span
        >
      </div>
      <div class="buttons">
        <button class="update">Update</button
        ><button class="delete">Delete</button>
     </div>
    </div>
    <div class="delivery-options">
      <div class="choose-delivery">Choose a delivery option:</div>
      <div class="delivery-container">
        <div class="delivery-option">
          <div class="input">
            <input
              type="radio"
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
              type="radio"
              onclick="click()"
              class="delivery-option-input"
            />
          </div>
          <div id="delivery-price">
            <div id="delivery-date">Tuesday, June 21</div>
            <div class="delivery-price">Free shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <div class="input">
            <input type="radio" class="delivery-option-input" />
          </div>
          <div id="delivery-price">
            <div id="delivery-date">Tuesday, June 21</div>
            <div class="delivery-price">Free shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
});

document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML