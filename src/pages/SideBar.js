import {Fragment} from 'react'
import SideBarItem from "../components/SideBarItem";
const SideBar = () =>{
return (
    <Fragment>
    <SideBarItem label="Dashboard" to="/" icon="fas fa-th-large" />
    <SideBarItem label="Departments" to="/departments" icon="fas fa-th-large" />
    <SideBarItem label="Reports" to="/reports" icon="fas fa-th-large" />
    <SideBarItem label="About As" to="/about-as" icon="fas fa-th-large" />
</Fragment>
)
}
export default SideBar