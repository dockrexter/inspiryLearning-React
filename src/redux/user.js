import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            token: JSON.parse(window.localStorage.getItem("insp_LEARN_token")),
            id: JSON.parse(window.localStorage.getItem("insp_LEARN_id")),
            firstName: JSON.parse(window.localStorage.getItem("insp_LEARN_firstName")),
            lastName: JSON.parse(window.localStorage.getItem("insp_LEARN_lastName")),
            email: JSON.parse(window.localStorage.getItem("insp_LEARN_email")),
            phone: JSON.parse(window.localStorage.getItem("insp_LEARN_phone")),
            role: JSON.parse(window.localStorage.getItem("insp_LEARN_role")),
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
