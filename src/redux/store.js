import { configureStore } from '@reduxjs/toolkit'
import featureSlice from "../features/featureSlice";

export const store = configureStore({
    reducer: {featureSlice},
})