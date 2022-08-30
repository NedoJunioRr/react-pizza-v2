import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type Sort = {
    number: number
    value: string
}

interface FeatureSliceState {
    searchValue?: string,
    pizzaCategoryIndex: number,
    sort: Sort,
    currentPage: number,
}


const initialState: FeatureSliceState = {
    searchValue: '',
    pizzaCategoryIndex: 0,
    sort: {number: 0, value: 'rating'},
    currentPage: 1,
}

export const featureSlice = createSlice({
    name: 'filterId',
    initialState,
    reducers: {
        setSearchValue(state, action:PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action:PayloadAction<number>) {
            state.pizzaCategoryIndex = action.payload
        },
        setSortValue(state, action:PayloadAction<string>) {
            state.sort.value = action.payload
        },
        setSortNumber(state, action:PayloadAction<number>) {
            state.sort.number = action.payload
        },
        setCurrentPage(state, action:PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilter(state, action:PayloadAction<FeatureSliceState >) {
            state.pizzaCategoryIndex = Number(action.payload.pizzaCategoryIndex)
            state.currentPage = Number(action.payload.currentPage)
            state.sort = action.payload.sort
        }
    }
})

export const {
    setCategoryId,
    setSortValue,
    setSortNumber,
    setCurrentPage,
    setFilter,
    setSearchValue
} = featureSlice.actions

export default featureSlice.reducer