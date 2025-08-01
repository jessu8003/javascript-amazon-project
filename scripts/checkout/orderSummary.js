import {cart,removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import { formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js'
 export function renderOrderSummary(){
        let cartSummaryHTML=''
        cart.forEach((cartItem)=>{
            const productId=cartItem.productId;
            const matchingProduct=getProduct(productId);
            
            const deliveryOptionId=cartItem.deliveryOptionId;
            const deliveryOption=getDeliveryOption(deliveryOptionId);
            const today=dayjs();
            const deliverydate=today.add(deliveryOption.deliveryDays,'days');
            const dateString=deliverydate.format('dddd MMMM D');

            cartSummaryHTML+=
            `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}"/>
                    <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingProduct.id}>Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id=${matchingProduct.id}>
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
            </div>
            </div>
            `
        });
        function deliveryOptionsHTML(matchingProduct,cartItem){
            let html=''
            deliveryOptions.forEach((deliveryOption)=>{
                const today=dayjs();
                const deliverydate=today.add(deliveryOption.deliveryDays,'days');
                const dateString=deliverydate.format('dddd MMMM D');
                const priceString=deliveryOption.priceCents===0?'FREE':`$${formatCurrency(deliveryOption.priceCents)}-`;
                const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
                html+=
                `
        <div class="delivery-option js-delivery-option"
            data-delivery-option-id="${deliveryOption.id}"
            data-product-id="${matchingProduct.id}">            <input type="radio"
                    ${isChecked ? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>
                </div>`


            });
            return html;

        }
        document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;
        document.querySelectorAll('.js-delete-link')
        .forEach((link)=>{
            link.addEventListener('click',()=>{
                const productId=link.dataset.productId;
                removeFromCart(productId);
            const container= document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            renderPaymentSummary();
            });
        
        });
        document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
            element.addEventListener('click',()=>{
                const {productId,deliveryOptionId}=element.dataset;
                updateDeliveryOption(productId,deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();

            })

        })
        document.querySelectorAll('.js-update-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    
    // Show the input field by adding the class
    container.classList.add('is-editing-quantity');
    
    // Optionally pre-fill input value
    const quantityInput = container.querySelector(`.js-quantity-input-${productId}`);
    const currentQuantity = cart.find(item => item.productId === productId)?.quantity || 1;
    quantityInput.value = currentQuantity;
  });
});
document.querySelectorAll('.js-save-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);

    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    }
  });
});

        function updateCartQuantity(){
        // let cartQuantity=0;
        // cart.forEach((cartItem)=>{
        //     cartQuantity+=cartItem.quantity;

        
        const cartQuantity=calculateCartQuantity();
        document.querySelector('.js-return-to-home-link')
        .innerHTML=`${cartQuantity} items`;
        }
        }


