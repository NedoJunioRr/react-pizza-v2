import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItems(state, action) {
            console.log(state.items)
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
        minusItem(state, action) {
            const findItem = state.items.find(el => el.id === action.payload)
            findItem.count--
        },
        removeItem(state, action) {
            state.items = state.items.filter(el => el.id !== action.payload)
        },
        clearItems(state, action) {
            state.items = []
        }
    }
})

export const {addItems, removeItem, clearItems, minusItem} = cartSlice.actions

export default cartSlice.reducer