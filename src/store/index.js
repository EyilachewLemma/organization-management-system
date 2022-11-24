import { configureStore } from "@reduxjs/toolkit";
import ButtonReducer from "./slices/ButtonSlice";
import DepartmentReducer from "./slices/DepartmentSlice";
const store = configureStore({
    reducer:{
        btn:ButtonReducer,
        department:DepartmentReducer,
    }
})
export default store