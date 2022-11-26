import { configureStore } from "@reduxjs/toolkit";
import ButtonReducer from "./slices/ButtonSlice";
import DepartmentReducer from "./slices/DepartmentSlice";
import UserReducer from "./slices/UserSlice";
import LoadingSpiner from "./slices/LoadingSpiner";
const store = configureStore({
    reducer:{
        btn:ButtonReducer,
        department:DepartmentReducer,
        user:UserReducer,
        spinner:LoadingSpiner
    }
})
export default store