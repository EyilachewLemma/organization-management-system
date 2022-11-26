import {Fragment,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spiner from './Spinner';
import Router from './routes';
import { userAction } from './store/slices/UserSlice';
import { departmentAction } from './store/slices/DepartmentSlice';
import apiCall from './url';
import './App.css';

function App() {
  const isLoading = useSelector((state=>state.spinner.isLoading))
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const featchDepartments = async () => {
    try {
      var response = await apiCall.get(`departments.json`);
      if (response.status === 200) {
        // transforming the retrived data to aproprate format
        // I retrived department lists in the application entry point 
        // because i want each department manager selects his department to login
        // I need department id from the login credintials to identify to which department the user in loged in
        const responseData = [];
        for (let key in response.data) {
          responseData.push({
            id: key,
            name: response.data[key].name,
            description: response.data[key].description,
            managingDeptId: response.data[key].managingDeptId,
          });
        }
        dispatch(departmentAction.setDepartments(responseData));
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(()=>{
    featchDepartments()
    console.log('use effect is called')
    const token = localStorage.getItem('token')
    if(token){
      dispatch(userAction.setIsAuthenticated(true))
      dispatch(userAction.setToken(token))
      dispatch(userAction.setUserInfo(JSON.parse(localStorage.getItem('user'))))
    
    }
    else{
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return ( 
    <Fragment>
    <Router />    
    {
      isLoading && (<Spiner /> )
    }    
    
    </Fragment>
    
  );
}

export default App;
