import {calcTotalPrice} from "./calcTotalPrice";
import {CartItemValues} from "../features/CartSlice";

export const getCartFromLs = () =>{
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items)

    return {
        items:items as CartItemValues[],
        totalPrice
    }
}