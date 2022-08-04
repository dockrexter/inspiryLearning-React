import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            token: JSON.parse(window.localStorage.getItem("token")),
            user_id: JSON.parse(window.localStorage.getItem("user_id")),
            firstname: JSON.parse(window.localStorage.getItem("firstname")),
            lastname: JSON.parse(window.localStorage.getItem("lastname")),
            email: JSON.parse(window.localStorage.getItem("email")),
            phone: JSON.parse(window.localStorage.getItem("phone")),
            role: JSON.parse(window.localStorage.getItem("role")),
            //assign_id: JSON.parse(window.localStorage.getItem("assign_id")),
        }

    },
    reducers: {
        update: (state, action) => {
            //console.log("changed", action, state)
            state.user = action.payload;
        },
        clear: (state) => {
            state.user = '';
        }

    }
});

export const { update, clear } = userSlice.actions;



export default userSlice.reducer;
