import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLogin:(state)=>{
            state.isLoggedIn = true
        },
        userLogOut:(state)=>{
            state.isLoggedIn = false
        }
    }
})

export default authSlice.reducer
export const {userLogin, userLogOut} = authSlice.actions
export const authSliceSelector = (store) => store.auth.isLoggedIn