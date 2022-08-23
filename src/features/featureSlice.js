import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sort: {number:0,value:'rating'},
}

export const featureSlice = createSlice({
    name: 'filterId',
    initialState,
    reducers: {
        setCategoryId (state, action) {
            state.categoryId = action.payload
        },
        setSortValue(state,action){
            state.sort.value = action.payload
        },
        setSortNumber(state,action){
            state.sort.number = action.payload
        }
    }
})

export const {setCategoryId,setSortValue,setSortNumber} = featureSlice.actions

export default featureSlice.reducer