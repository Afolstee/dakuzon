
let productsHTML = '';


products.forEach((product) => {
    productsHTML += 
    `<div class="product">
    <div class="product-image">
    <img src="${product.image}" alt="" class="product-img">
    </div>
    
    <div class="product-name">${product.name}</div>
    <div class="rating-stars"><img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="" class="rating-img"><div class="rating-number">${product.rating.count}</div></div>
    <div class="price">$${(product.priceCents / 100).toFixed(2)}</div>
    <select class="cart-quatity js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="2">3</option>
        <option value="2">4</option>
        <option value="2">5</option>
        <option value="2">6</option>
        <option value="2">7</option>
        <option value="2">8</option>
        <option value="2">9</option>
        <option value="2">10</option>
    </select>
   <div class="addtocart" ><button class="js-add-to-cart" data-product-id="${product.id}">
   Add to Cart</button></div>
</div>`;
});
document.querySelector(".product-container").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.
        productId;
    
        let matchingItem;
    
        cart.forEach((item) => {
          if (productId === item.productId) {
            matchingItem = item;
          }
        });
    
        const quantitySelector = document.querySelector(
          `.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);
        
        console.log(quantity);
        if(matchingItem) {
          matchingItem.quantity += quantity;
        } else {
          cart.push({
          productId: productId,
          quantity: quantity
        });
        }
    
        let cartQuantity = 0;
    
        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });
    
        document.querySelector('.js-cart-quantity')
         .innerHTML = cartQuantity;
    
        
        
        
        console.log(cart);
        
      });
    });