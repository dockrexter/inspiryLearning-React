import { createSlice } from '@reduxjs/toolkit'


const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignment: {
      id: 0,
      deadline: ""

    }
  },
  reducers: {
    update: (state, action) => {
        state.assignment = action.payload;
    },
    clear: (state) => {
        state.assignment = '';
    }

}
});

export const { update, clear } = assignmentSlice.actions;
export default assignmentSlice.reducer