
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
        quantitySelector.value = '1';
        
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