import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../redux/store";


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

const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action:PayloadAction<CartItemValues>) {
            const findItem = state.items.find(el => el.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload, count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, el) => {
                return sum + el.price * el.count
            }, 0)
        },
        minusItem(state, action:PayloadAction<string>) {
            const findItem = state.items.find(el => el.id === action.payload)
            if (findItem) {
                findItem.count--
            }
        },
        removeItem(state, action:PayloadAction<string>) {
            state.items = state.items.filter(el => el.id !== action.payload)
        },
        clearItems(state, action) {
            state.items = []
            state.totalPrice = 0;
        }
    }

})

export const cartItemById = (id:string) => (state:RootState) => state.cart.items.find(el => el.id === id)

export const {addItems, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer