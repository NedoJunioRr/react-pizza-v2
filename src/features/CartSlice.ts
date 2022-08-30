import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../redux/store";
import {calcTotalPrice} from "../utils/calcTotalPrice";
import {getCartFromLs} from "../utils/getCartFromLs";


export type CartItemValues = {
    id: string,
    title: string,
    type: string,
    price: number,
    count: number,
    imageUrl: string,
    size: number
}

interface CartSliceState {
    totalPrice: number,
    items: CartItemValues[]
}

const {items,totalPrice} = getCartFromLs()


const initialState: CartSliceState = {
    totalPrice,
    items
}



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action) {
            const findItem = state.items.find(el => el.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload, count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(el => el.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(el => el.id !== action.payload)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0;

        }
    }

})

export const cartItemById = (id: string) => (state: RootState) => state.cart.items.find(el => el.id === id)

export const {addItems, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer