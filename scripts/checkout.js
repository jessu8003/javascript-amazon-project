import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import '../data/backend-practise.js';
import { loadProducts } from "../data/products.js";
loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

})

