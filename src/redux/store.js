import { configureStore } from '@reduxjs/toolkit'
import featureSlice from "../features/featureSlice";
import cart from "../features/cartSlice";


export const store = configureStore({
    reducer:
        {
            featureSlice,
            cart,
        },
})