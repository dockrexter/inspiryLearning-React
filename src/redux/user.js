import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            token: JSON.parse(window.localStorage.getItem("token")),
            id: JSON.parse(window.localStorage.getItem("id")),
            firstName: JSON.parse(window.localStorage.getItem("firstName")),
            lastName: JSON.parse(window.localStorage.getItem("lastName")),
            email: JSON.parse(window.localStorage.getItem("email")),
            phone: JSON.parse(window.localStorage.getItem("phone")),
            role: JSON.parse(window.localStorage.getItem("role"))
        }

    },
    reducers: {
        update: (state, action) => {
            state.user = action.payload;
        },
        clear: (state) => {
            state.user = '';
        }
    }
});

export const { update, clear } = userSlice.actions;
export default userSlice.reducer;
