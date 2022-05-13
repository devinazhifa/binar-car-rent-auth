import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

let initialState = null // let karena bisa diubah

try {
    const token = localStorage.getItem('binarAccessToken')
    const userData = jwtDecode(token)
    initialState = userData
} catch{}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null
    },
    reducers: {
        addUser: (state, action) => {
            state.data = {...action.payload.userData}
        },
        removeUser: (state) => {
            state.data = null
        }
    },
})

export default userSlice