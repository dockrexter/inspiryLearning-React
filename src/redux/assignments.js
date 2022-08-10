import { createSlice } from '@reduxjs/toolkit'


const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignment: {
        token: JSON.parse(window.localStorage.getItem("assignmentID")),
    }
  },
  reducers: {
    update: (state, action) => {
        //console.log("changed", action, state)
        state.assignment = action.payload;
    },
    clear: (state) => {
        state.assignment = '';
    }

}
});

export const { update, clear } = assignmentSlice.actions;
export default assignmentSlice.reducer


// export default assignmentSlice.reducer;