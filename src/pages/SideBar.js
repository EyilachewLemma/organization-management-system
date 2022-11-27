import {Fragment,useState} from 'react'
import SideBarItem from "../components/SideBarItem";
import classes from './SideBar.module.css'
const SideBar = () =>{
    const [open,setOpen] = useState(false)
    const toggle = () =>{
        setOpen(prevState=>!prevState)
    }
    return (
    <Fragment>
    <div className='fs-5 fw-bold ms-4 my-3 text-white'>Menues</div>
    <SideBarItem label="Departments" to="/departments" icon="fas fa-th-large" dropdown='' />
   <div className={`${open?classes.accordion:''} rounded-3 p-2`}>
   <div onClick={toggle}>
   <SideBarItem label="Reports" to="/sent-reports" icon="fas fa-file-alt" dropdown='+' />

   </div>
   {
    open && (
        <div>
        <SideBarItem label="Sent Report" to="/sent-reports" icon="" dropdown='' />
        <SideBarItem label="Received Report" to="/recieved-reports" icon='' dropdown={open?"fas fa-chevron-up":"fas fa-chevron-down"} />
        </div>  
    )}
   </div>
    <div>





    </div>
  
</Fragment>
)
}
export default SideBar