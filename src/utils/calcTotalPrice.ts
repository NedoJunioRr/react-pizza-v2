import {CartItemValues} from "../features/CartSlice";


export const calcTotalPrice = (items: CartItemValues[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};