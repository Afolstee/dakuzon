import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productsHTML = "";


products.forEach((product) => {
  productsHTML += `<div class="product">
    <div class="product-image">
    <img src="${product.image}" alt="" class="product-img">
    </div>
    
    <div class="product-name">${product.name}</div>
    <div class="rating-stars"><img src="images/ratings/rating-${
      product.rating.stars * 10
    }.png" alt="" class="rating-img"><div class="rating-number">${
    product.rating.count
  }</div></div>
    <div class="price">$${formatCurrency(product.priceCents)}</div>
    <select class="js-quantity-selector-${product.id} cart-quatity">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
   <div class="addtocart" >
   <button class="js-add-to-cart" data-product-id="${product.id}">
   Add to Cart</button></div>
</div>`;
});
document.querySelector(".product-container").innerHTML = productsHTML;

 function updateCartQuantity() {
   let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    
    
}

document.querySelectorAll(".js-add-to-cart")
.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});
