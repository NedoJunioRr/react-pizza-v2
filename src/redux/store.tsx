import { configureStore } from '@reduxjs/toolkit'
import featureSlice from "../features/featureSlice";
import cart from "../features/CartSlice";
import pizza from "../features/pizzaSlice"
import {useDispatch} from "react-redux";


export const store = configureStore({
    reducer:
        {
            featureSlice,
            cart,
            pizza,
        },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch