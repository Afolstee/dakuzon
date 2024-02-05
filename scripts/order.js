import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency, totalCost } from './utils/money.js';


let cartTotalCosts = [];
let cartSummaryHTML = '';

// Function to update the total cost and cart summary
function updateCart() {
    cartTotalCosts = [];
    cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct = products.find(product => product.id === productId);

        if (matchingProduct) {
            let price = matchingProduct.priceCents;
            let itemQuantity = cartItem.quantity;
            const itemTotalCost = totalCost(price, itemQuantity);
            cartTotalCosts.push(itemTotalCost);

            // Append HTML for each item to cartSummaryHTML
            cartSummaryHTML += `
                <div class="product-info js-cart-item-container-${matchingProduct.id}">
                    <img src="${matchingProduct.image}" class="product-img" />
                    <div class="order-info">
                        <div class="product-title">
                            ${matchingProduct.name}
                        </div>
                        <div class="price">$${formatCurrency(matchingProduct.priceCents)}</div>
                        <div class="quantity">
                            <span>Quantity: <span class="quantity-value"> ${cartItem.quantity} </span></span>
                        </div>
                        <div class="buttons">
                            <button class="update">Update</button>
                            <button class="delete js-delete-btn" data-product-id="${matchingProduct.id}">Delete</button>
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
                </div>`;
        }
    });

    // Recalculate the total cost
    let shopping = 499;
    const tax = 0.1;
    const cartGrandTotal = cartTotalCosts.reduce((total, cost) => total + cost, 0);

    const updatedGrandTotal = Number(cartGrandTotal + shopping);
    const estimatedTax = Number((cartGrandTotal + shopping) * tax);
    const orderTotal = Number(updatedGrandTotal + estimatedTax);
    
    console.log(formatCurrency(orderTotal));
    

    // Update total cost in local storage
    updateLocalStorage(cartTotalCosts);
    
    document.querySelector('.js-added-sum').innerHTML = `$${formatCurrency(cartGrandTotal)}`;
    document.querySelector('.js-total-before-tax').innerHTML = `$${formatCurrency(updatedGrandTotal)}`
    document.querySelector('.js-tax').innerHTML = `$${formatCurrency(estimatedTax)}`;
    document.querySelector('.js-order-total').innerHTML = `$${formatCurrency(orderTotal)}`
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-btn').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            // Update the cart after deleting an item
            updateCart();
        });
    });

    updateCartQuantity();
}

// Initial cart update
updateCart();

function updateLocalStorage(updatedCartTotalCosts) {
    // Update the total cost in local storage
    const totalCostInLocalStorage = updatedCartTotalCosts.reduce((total, cost) => total + cost, 0);
    localStorage.setItem('cartTotalCost', totalCostInLocalStorage);
}

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
        // if(cartQuantity <= 10){
        //     shopping = 399;
        // }
    });
    document.querySelector(".items-incart").innerHTML = `${cartQuantity} items`;
    document.querySelector(".totalitem").innerHTML = `Items(${cartQuantity})`;
}
// const itemsamount = document.querySelector(".items-incart").innerHTML;
// function shoppingAndHandling() {
//     if (itemsamount <= 10) {
//         console.log('299')
//     }
    
    
// }
// console.log(itemsamount);


