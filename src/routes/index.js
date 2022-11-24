import { Routes, Route } from "react-router-dom";
import Departments from "../pages/department/Departments";
const RoutePage = ()=>{
    return(
        <Routes >
        <Route path="/departments" element={<Departments />} />
        
        </Routes>
    )
}
export default RoutePage