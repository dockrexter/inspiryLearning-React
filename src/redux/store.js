import { configureStore } from '@reduxjs/toolkit';

import slice from './user';
import assignmentSlice from './assignments';

export default configureStore({
    reducer: {
        user: slice,
        assignment: assignmentSlice
    },
    // reducer: {
    //     assignment: slice2
    // }
});
