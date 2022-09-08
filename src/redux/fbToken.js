import { createSlice } from '@reduxjs/toolkit'


const fbTokenSlice = createSlice({
  name: 'fbToken',
  initialState: {
    fbToken: {
      fbTokenClient: JSON.parse(window.localStorage.getItem('insp_LEARN_fbToken')),

    }
  },
  reducers: {
    updateToken: (state, action) => {
        state.fbToken = action.payload;
    },
    clearToken: (state) => {
        state.fbToken = '';
    }

}
});

export const { updateToken, clearToken } = fbTokenSlice.actions;
export default fbTokenSlice.reducer