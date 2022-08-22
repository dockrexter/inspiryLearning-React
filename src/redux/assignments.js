import { createSlice } from '@reduxjs/toolkit'


const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignment: {
      deadline: JSON.parse(window.localStorage.getItem('deadline')),
      id: JSON.parse(window.localStorage.getItem('assignId')),

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