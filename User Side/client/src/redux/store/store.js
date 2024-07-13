import { configureStore } from '@reduxjs/toolkit'
import { addQuizDetailsSlice } from "../slices/store-quiz-details"

export const store = configureStore({
    reducer: {
        addDetails: addQuizDetailsSlice, 
    }
})