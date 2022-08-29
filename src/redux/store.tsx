import { configureStore } from '@reduxjs/toolkit'
import featureSlice from "../features/featureSlice";
import cart from "../features/cartSlice";
import pizza from "../features/pizzaSlice"


export const store = configureStore({
    reducer:
        {
            featureSlice,
            cart,
            pizza,
        },
})

export type RootState = ReturnType<typeof store.getState>