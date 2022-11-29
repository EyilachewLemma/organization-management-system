import { Fragment,useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import classes from './Departments.module.css'
const Department =() =>{
    const [department,setDepartment] = useState({})
    const departments = useSelector(state=>state.department.departments)
    const [managingDepartment,setManagingDepartment] = useState('')
    const [lowerLevelDepartment,setLowerLevelDepartment] = useState([])
    const navigate = useNavigate()
    const {deptId} = useParams()

   const fetchDepartment =  ()=>{
     
           const dept = departments.find(dep=>dep.id === deptId )
           console.log('department',dept)
            setDepartment(dept)

        }
     
   
    useEffect(()=>{
        fetchDepartment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[deptId,departments])
    const fetchManagingDepartment = () =>{
      const managingDept = departments.find(dept =>department.managingDeptId === dept.id)
      if(managingDept){
        setManagingDepartment(managingDept.name)
      }
      else{ setManagingDepartment("doesn't have managing department")}
    }
    const filterDirectChildDepartments = () =>{
         const lowerDept = departments.filter(dpt =>{
          return dpt.managingDeptId === deptId
        })
         setLowerLevelDepartment(lowerDept)
            }
    return <Fragment>
    <button onClick={()=>navigate(-1)} style={{background:"none",border:"none",fontSize:"2rem"}}><i className="fas fa-arrow-left"></i></button> 
    <div className="fw-bold fs-5 text-center">Detail Description of {department?.name} Department</div>

    <div className="mt-5 d-flex">
    <span className="fw-bold me-3">Department Name:</span>
    <span>{department.name}</span>
    </div>
    <div className="mt-3">{department.description}</div>
    <div className="mt-3 d-flex">
       <span className={`${classes.pointer} text-primary`} onClick={fetchManagingDepartment}>click here to see managing department</span>  
       <span className="ms-3">{managingDepartment}</span>    
    </div>
    <div className="d-flex">
    <span className={`${classes.pointer} text-primary`} onClick={filterDirectChildDepartments}>click here to see decendent department</span>
    {lowerLevelDepartment.length > 0 && (
      lowerLevelDepartment.map(dep=>(<span key={dep.id} className='ms-3'>{dep.name+' ,'}</span>))
    )}
    </div>
      
    </Fragment>
}
export default Department