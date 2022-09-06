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
    clearAssignment: (state) => {
        state.assignment = '';
    }

}
});

export const { update, clearAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer