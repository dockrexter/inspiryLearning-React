import { configureStore } from '@reduxjs/toolkit';

import slice from './user';

export default configureStore({
    reducer: {
        user: slice
    }
});
