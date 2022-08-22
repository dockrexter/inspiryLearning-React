import { configureStore } from '@reduxjs/toolkit';

import slice from './user';
import assignmentSlice from './assignments';
import fbTokenSlice from './fbToken';
export default configureStore({
    reducer: {
        user: slice,
        assignment: assignmentSlice,
        fbToken: fbTokenSlice
    },
    // reducer: {
    //     assignment: slice2
    // }
});
