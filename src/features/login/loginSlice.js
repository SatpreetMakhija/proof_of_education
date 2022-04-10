import { createSlice } from "@reduxjs/toolkit";


export const loginSlice = createSlice({
    name: 'login',
    initialState: 
        {
            isUserLoggedIn: false,
            address: undefined,
        }
    ,
    reducers: {
        loginUser: (state) => {
            state.isUserLoggedIn = true;
        },
        logoutUser: (state) => {
            state.isUserLoggedIn = false;
        },
        setAddressOfUser: (state, action) => {
            state.address = action.payload
        },
    },
})

export const { loginUser, logoutUser, setAddressOfUser} = loginSlice.actions
export default loginSlice.reducer;
