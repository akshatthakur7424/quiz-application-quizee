import { createSlice } from "@reduxjs/toolkit"

export const addQuizDetailsSlice = createSlice({
    initialState : null,
    name : addQuizDetails,
    reducers : {
        addDetails: (state) => state 
    }
})

export const { adddetails } = addQuizDetailsSlice.actions
export default addQuizDetailsSlice.reducer;