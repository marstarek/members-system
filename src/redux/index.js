import { configureStore } from "@reduxjs/toolkit";
import member from "./memberSlice";
export default configureStore({
    reducer: {
        member

    },
});