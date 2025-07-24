import {cart,addToCart} from "../data/cart.js";
import { products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let productsHTML='';

products.forEach((product)=>{
    productsHTML+=` <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                   ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars *10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select>
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
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
          </button>
        </div>`;
        
});
console.log(productsHTML);
/*
Below javascript code helps us our website to make it interractive
main idea of javscript is to follow below steps
1)save the data
2)access the html elements 
3)make it interactive by using DOM.
1. Save the Data
This is the foundation - JavaScript needs to store and manage information:

Variables, arrays, objects to hold data
User inputs from forms
Data from APIs or databases
Application state

2. Generate the HTML Elements
JavaScript needs to connect with the webpage:

document.getElementById(), querySelector(), etc.
Finding specific elements to work with
Getting references to buttons, inputs, divs, etc.
This creates the bridge between your data and the visual page

3. Make it Interactive with DOM
This is where the magic happens:

DOM Manipulation: Change content, styles, attributes
Event Handling: Respond to clicks, typing, mouse movements
Dynamic Updates: Show/hide elements, create new ones
User Experience: Real-time feedback and interactions

This sequence follows the natural workflow:

Data → What information do we need?
Access → How do we connect to the page elements?
Interact → How do we make it respond to users?

The interactive DOM app I created above demonstrates exactly this pattern - it saves user data, accesses HTML elements through various selectors, and makes everything interactive with event handlers and dynamic DOM manipulation.
This is indeed the core concept that makes JavaScript so powerful for web development - it transforms static HTML pages into dynamic, responsive applications!RetryClaude can make mistakes. Please double-check responses.
*/

function updateCartQuantity(){
    let cartQuantity=0;
    cart.forEach((cartItem)=>{
        cartQuantity+=cartItem.quantity;
        document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
    });
    
}
document.querySelector('.js-products-grid').innerHTML=productsHTML;
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
    button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();

    
    
        
    });

});
