import {Fragment} from 'react'
import TheHeader from './components/TheHeader';
import SideBar from './pages/SideBar';
import './App.css';

function App() {
  return (
<Fragment >
<TheHeader />
<div className='d-flex'>
<div className='side-bar border-end border-2 px-3 text-white'>
<div className='fs-5 fw-bold my-3'>Menues</div>
<SideBar />
</div>
<div className='flex-fill'></div>
</div>
</Fragment>

  );
}

export default App;
