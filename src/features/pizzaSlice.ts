import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from '../redux/store'

export const fetchPizzas = createAsyncThunk('pizza/fetchByPizzas', async ({
                                                                              category,
                                                                              checkSearchValue,
                                                                              checkOrder,
                                                                              checkSort,
                                                                              currentPage
                                                                          }) => {
        const {data} = await axios.get(`https://62fe4adca85c52ee483464b0.mockapi.io/pizzas?${category}&sortBy=${checkSort}&order=${checkOrder}&${checkSearchValue}&page=${currentPage}&limit=4`)
        return data
    }
)

type Pizza = {
    id: string,
    title: string,
    type: string,
    price: number,
    count: number,
    imageUrl: string,
    size: number
}

interface PizzaSliceState {
    pizzas: Pizza[],
    status:'loading' | 'success' | 'error'
}


const initialState:PizzaSliceState = {
    pizzas: [],
    status:'loading'
}

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.pizzas = action.payload
        },
    },

    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.pizzas = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items=[]
        },
    },
})

export const pizzaState = (state:RootState) => state.pizza;

export const {setPizzas} = pizzasSlice.actions

export default pizzasSlice.reducer