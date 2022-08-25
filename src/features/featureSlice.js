import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    pizzaCategoryIndex: 0,
    sort: {number: 0, value: 'rating'},
    currentPage: 1,
}

export const featureSlice = createSlice({
    name: 'filterId',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.pizzaCategoryIndex = action.payload
        },
        setSortValue(state, action) {
            state.sort.value = action.payload
        },
        setSortNumber(state, action) {
            state.sort.number = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    }
})

export const {setCategoryId, setSortValue, setSortNumber, setCurrentPage} = featureSlice.actions

export default featureSlice.reducer