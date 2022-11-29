import { useState,useRef,useEffect } from "react";
import SideBarItem from "../components/SideBarItem";
import {useSelector} from 'react-redux'
import classes from './SideBar.module.css'
const SideBar = () =>{
    const departments = useSelector(state=>state.department.departments)
    const user = useSelector(state=>state.user.userInfo)
    const [isDepActive,setIsDepActive] = useState(false)
    const [isReport,setIsReport] = useState(false)
    const [myDepartments,setMyDepartments] = useState([])
    const contentEl1 = useRef()
    const contentEl2 = useRef()
    useEffect(()=>{
     const myLowerDepartments= departments.filter(dept=>dept.managingDeptId === user.departmentId)
     setMyDepartments(myLowerDepartments)
     console.log('myLowerDepartments',myLowerDepartments)
    },[departments,user])
    const toggleDepartment =()=>{
        setIsDepActive(prevValue=>!prevValue)
    }
    const TogleReport =() =>{
        setIsReport(prevValue=>!prevValue)
    }
    return (
    <div className={`${classes.wraper} mt-4`}>
    <div className="fw-bold text-white ms-3">Menues</div>
   <div className="bg-light">
   <div className="mt-3">
     <button className={`${classes.btn} fs-5 fw-bold text-white d-flex ps-3`} onClick={toggleDepartment}>
     <span><i className="fas fa-th-large"></i></span>
     <span className="ms-2">Departments</span>
     <span className="ms-auto">{isDepActive?<i className="fas fa-chevron-up"></i>:<i className="fas fa-chevron-down"></i>}</span>
     </button>   
    <ul ref={contentEl1} className={`${classes.accordion} m-0`} style={isDepActive?{height: contentEl1.current.scrollHeight}:{height:"0px"}}>
    {myDepartments.length > 0 && (
        myDepartments.map(dep=><SideBarItem key={dep.id} label={dep.name} to={`/${dep.id}`} />)
    )}
  </ul>
     </div>
     <div className="">
     <button className={`${classes.btn} fs-5 fw-bold text-white d-flex ps-3 pt-3`} onClick={TogleReport}>
     <span><i className="fas fa-file-alt"></i></span>
     <span className="ms-2">Reports</span>
     <span className="ms-auto">{isReport?<i className="fas fa-chevron-up"></i>:<i className="fas fa-chevron-down"></i>}</span>
     
     </button>
     <ul ref={contentEl2} className={`${classes.accordion} m-0`} style={isReport?{height: contentEl2.current.scrollHeight}:{height:"0px"}}>
     <SideBarItem label="Sent Report" to="/sent-reports" />
     <SideBarItem label="Received Report" to="/recieved-reports" />
  </ul>
     </div>
   
   </div>









    </div>
)
}
export default SideBar