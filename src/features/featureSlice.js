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
        },
        setFilter(state, action) {
            state.pizzaCategoryIndex = Number(action.payload.pizzaCategoryIndex)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.findNumInCategories
        }
    }
})

export const {setCategoryId, setSortValue, setSortNumber, setCurrentPage, setFilter} = featureSlice.actions

export default featureSlice.reducer