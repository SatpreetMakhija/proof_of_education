import { createSlice } from "@reduxjs/toolkit";


export const loginSlice = createSlice({
    name: 'login',
    initialState: 
        {
            isUserLoggedIn: false
        }
    ,
    reducers: {
        loginUser: (state) => {
            state.isUserLoggedIn = true;
        },
        logoutUser: (state) => {
            state.isUserLoggedIn = false;
        },
    },
})

export const { loginUser, logoutUser } = loginSlice.actions
export default loginSlice.reducer;
