import { Fragment,useEffect } from 'react';
import TheHeader from './components/TheHeader';
import SideBar from './pages/SideBar';
import { Outlet } from "react-router-dom"

const AppContainer = () =>{
  useEffect(()=>{
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return <Fragment>
        <TheHeader />
        <div className='d-flex'>
         <div className='sideBar px-3'>
         <SideBar />
         </div>
        <div className='flex-fill px-3 px-lg-5 py-4 mb-4'>     
        <Outlet />
        </div>
         </div>
       </Fragment>
}
export default AppContainer