import { configureStore } from '@reduxjs/toolkit';

import slice from './user';
//import slice2 from './assignments';

export default configureStore({
    reducer: {
        user: slice
    },
    // reducer: {
    //     assignment: slice2
    // }
});
