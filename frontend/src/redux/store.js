import {configureStore} from "@reduxjs/toolkit";
// import videoReducer from './slices/videoSlice.js'

export const store = configureStore({
    reducer: {
        // videos: videoReducer,
    }
})