import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from '../redux/store'
import {CartItemValues} from "./CartSlice";

export type fetchPizzasProps = Record<string, string>

//createAsyncThunk<Pizza[],Record<string, string>>

export const fetchPizzas = createAsyncThunk<Pizza[],fetchPizzasProps>('pizza/fetchByPizzas', async (params: fetchPizzasProps) => {
        const {
            category,
            checkSearchValue,
            checkOrder,
            checkSort,
            currentPage
        } = params
        const {data} = await axios.get<Pizza[]>(`https://62fe4adca85c52ee483464b0.mockapi.io/pizzas?${category}&sortBy=${checkSort}&order=${checkOrder}&${checkSearchValue}&page=${currentPage}&limit=4`)
        return data as Pizza[]
    }
)

enum Status {
    loading = 'loading',
    success = 'success',
    error = 'error'
}

type Pizza = {
    id: string,
    title: string,
    types: number[],
    imageUrl: string,
    sizes: number[],
    price: number
}

interface PizzaSliceState {
    pizzas: Pizza[],
    status: 'loading' | 'success' | 'error'
}


const initialState: PizzaSliceState = {
    pizzas: [],
    status: 'loading'
}

export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setPizzas(state, action: PayloadAction<Pizza[]>) {
            state.pizzas = action.payload
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.loading
            state.pizzas = []
        })
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.success
            state.pizzas = action.payload

        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.error
            state.pizzas = []
        })
    }
})

export const pizzaState = (state: RootState) => state.pizza;

export const {setPizzas} = pizzasSlice.actions

export default pizzasSlice.reducer