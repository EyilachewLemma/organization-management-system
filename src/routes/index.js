import { Routes, Route } from "react-router-dom";
import Departments from "../pages/department/Departments";
import Department from "../pages/department/Department";
import DepartmentList from "../pages/department/DepartmentList";
import RecievedReports from "../pages/report/RecievedReports";
import SentReports from "../pages/report/SentReports";
const RoutePage = ()=>{
    return(
        <Routes >
        <Route path="/departments" element={<Departments />}>
        <Route index element={<DepartmentList />} />
        <Route path=":deptId"  element={<Department />} />
        </Route>
        <Route path="/sent-reports" element={<SentReports />} />
        <Route path="/recieved-reports" element={<RecievedReports />}/>
        
        </Routes>
    )
}
export default RoutePage