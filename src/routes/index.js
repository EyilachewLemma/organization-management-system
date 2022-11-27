import { Routes, Route } from "react-router-dom";
import AppContainer from "../AppContainer";
import Departments from "../pages/department/Departments";
import Department from "../pages/department/Department";
import DepartmentList from "../pages/department/DepartmentList";
import RecievedReports from "../pages/report/RecievedReports";
import SentReports from "../pages/report/SentReports";
import ReadReport from "../pages/report/RedReport";
import WriteReport from "../pages/report/WriteReport";
import SentReportList from "../pages/report/SentReportList";
import RecievedReportList from "../pages/report/RecievedReportList";
import LoginPage from "../pages/login/LoginPage";

const RoutePage = ()=>{
    return(
        <Routes >
        <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Departments />}>
        <Route index element={<DepartmentList />} />
        <Route path=":deptId"  element={<Department />} />
        </Route>
        <Route path="/sent-reports" element={<SentReports />}>
        <Route index element={<SentReportList />} />
        <Route path="write" element={<WriteReport />} />
        <Route path=":id" element={<ReadReport />} />
         </Route>
        <Route path="/recieved-reports" element={<RecievedReports />}>
        <Route index element={<RecievedReportList />} />
        <Route path="id" element={<ReadReport />} />
        </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}
export default RoutePage