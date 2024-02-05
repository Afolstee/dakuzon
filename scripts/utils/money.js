import {cart} from "../../data/cart.js";
import { products } from "../../data/products.js";


// function totalCost (price, quantity){
//     return price * quantity;
//   };
//   console.log(totalCost(40, 5));

export function totalCost(price, itemQuantity) {
    return price * itemQuantity;
}

export function formatCurrency(priceCents) {
   return (priceCents / 100).toFixed(2);
}

    