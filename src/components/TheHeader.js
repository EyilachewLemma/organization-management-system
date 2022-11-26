import React, {Fragment} from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { userAction } from '../store/slices/UserSlice';
import { useDispatch } from 'react-redux';
import classes from './TheHeader.module.css'

const TheHeader = () =>{ 
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logoutHandler = () =>{    
    dispatch(userAction.setToken(null));
    dispatch(userAction.setIsAuthenticated(false));
    navigate('/login')
  }
  const changePasswordHandler = () =>{
  } 
  const openNotification = () =>{
    
  } 
  return <Fragment>
  <div className={classes.headerNav+' d-flex px-3 px-lg-5 py-2 align-items-center'}>
       <div>
       <NavLink className="fw-bold fs-4 text-white text-decoration-none">XYZ COMPANY</NavLink>
       </div>
       <div className='ms-auto me-3'>
       <Button className={classes.notificationBtn} onClick={openNotification}>
       <div className='text-white position-relative'><i className="fa-regular fa-bell fs-2"></i>
       <span className={classes.bage+' rounded-circle px-1 small'}>12</span>
       </div>      
    </Button>       
       </div>
      <div className='border rounded pe-2'>
      <Dropdown>
        <Dropdown.Toggle className={classes.dropDown+' d-flex align-items-center'} id="profile-dropdown">
        <div className='d-flex overflow-hidden ms-2 align-items-center'>
        <div className='fs-2'><i className="far fa-user"></i></div>
    { 
      }
         <div className='text-white me-2'>
           <div className='fw-bold ms-2 mt-2'>Alemayehu Belay</div>
           <div className='small text-start ms-3'>admin</div>
         </div>
         </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Button className={classes.profileBtn+' text-dark'} onClick={changePasswordHandler}>Change Password</Button>            
            </Dropdown.Item>
          <Dropdown.Item>
          <Button className={classes.profileBtn+' text-dark'} onClick={logoutHandler}>Logout</Button>            
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>        
       </div>
       
       </Fragment>
}
export default React.memo(TheHeader)