import { NavLink } from "react-router-dom"
import styles from './SideBarItem.module.css'
const SideBarItem = ({label,to}) =>{
    return <li className='py-2'>
     
    <NavLink to={to}  className={({ isActive }) =>isActive?styles.active:styles.inactive}>            
    <span className="text-white">{label}</span>
        </NavLink>
    </li>
}
export default SideBarItem