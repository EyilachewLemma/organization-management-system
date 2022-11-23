import { NavLink } from "react-router-dom"
import styles from './SideBarItem.module.css'
const SideBarItem = ({label,to,icon}) =>{
    return <div className='mb-3'>     
    <NavLink to={to}  className={({ isActive }) =>isActive?styles.active:styles.inactive}>
    <span className="fs-5 me-3"><i className={icon}></i></span>            
    <span>{label}</span>
        </NavLink>
    </div>
}
export default SideBarItem