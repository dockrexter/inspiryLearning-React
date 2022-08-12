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
        //console.log("changed", action, state)
        state.assignment = action.payload;
        console.log("changed", action, state);
    },
    clear: (state) => {
        state.assignment = '';
    }

}
});

export const { update, clear } = assignmentSlice.actions;
export default assignmentSlice.reducer


// export default assignmentSlice.reducer;