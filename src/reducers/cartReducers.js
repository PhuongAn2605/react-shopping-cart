import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const cartReducer = (state = {
    cartItems: JSON.parse(localStorage.getItem('cart-items')|| "[]")}
    , action) => {
    switch(action.type){
        case ADD_TO_CART:
        case REMOVE_FROM_CART:
            return {
                cartItems: action.payload.cartItems
            }
        default:
            return state;
    }
}