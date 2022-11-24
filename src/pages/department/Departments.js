import { Fragment,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import CreateDepartment from "./CreateDepartment";
import apiClient from "../../url/index";
import classes from "./Departments.module.css";


const Departments = () => {
const [modal,setModal] = useState({show:false,title:'',isEdit:null,department:{}})
  const componentRef = useRef()
  const navigate = useNavigate()
  const searchBy = useRef()
  const departments = [1,2,3,4,5,6,7]
  

  const featchColdRooms = async() => {
  try{
   var response = await apiClient.get(`admin/coldRooms?search=${searchBy.current.value}`)
   if(response.status === 200){
   }
  }
  catch(err){}
  finally {}
}
  useEffect( ()=>{   
  featchColdRooms()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const openCreateDepartmentModal = () =>{
    setModal({show:true,title:'Create New Department',isEdit:false,department:{}})
  }
  const editDepartment = (dept) =>{
    setModal({show:true,title:'Edit Department Information',isEdit:true,department:dept})
  }
  const viewDetailHandler = (crId) =>{
      navigate(`/cold-rooms/${crId}/products`)
  }
  const enterKeyHandler = (event) =>{
    if(event.key === 'Enter' || !event.target.value){
      featchColdRooms()
    }
  }
  const searchHandler = () =>{
    featchColdRooms()
  }
  const openAssignManagerHandle = (id,index) =>{
  }
  const closeCreateDepartmentModalHandler = ()=>{
    setModal(preValue=>{
      return {...preValue,show:false}
    })
  }
  return (
    <Fragment>
      <h5 className="text-bold">Cold Room List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the cold room section you can review and manage all cold rooms with
        their detail.You can view and edit many information such as cold room
        name, region, zone,woreda,kebele and rent fee. You can also add new cold room 
      </p>
      <div className="d-flex justify-content-between mt-5">
        <InputGroup className="mb-3 w-50 border rounded">
          <InputGroup.Text id="basic-addon1" className={classes.searchIcon}>
            <span onClick={searchHandler}>
              <i className="fas fa-search"></i>
            </span>
          </InputGroup.Text>
          <Form.Control
            className={classes.searchInput}
            placeholder="search by cold room name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={searchBy}
            onKeyUp={enterKeyHandler}
          />
        </InputGroup>
        <div className="ms-auto me-5">
        <Button className={`${classes.btn} py-1`} onClick={openCreateDepartmentModal}>Add New Department</Button>
        </div>
      </div>
      <div className={classes.bottomBorder}></div>
     {departments.length &&( <div className="mt-4" ref={componentRef}>
        <Table responsive="md">
          <thead className={classes.header}>
            <tr>
              <th>NO</th>
              <th>Department Name</th>
              <th>Manager Name</th>
              <th>Managing Department</th>
              <th>Number of Employees</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
          {
            departments?.map((department,index) =>(
              <tr className={classes.row} key={index}>
              <td className="p-2">{index+1}</td>
              <td className="p-2">ICT</td>
              <td className="p-2">Selomon Walelgn</td>
              <td className="p-2">Human Resource</td>
              <td className="p-2 text-center">12</td>
              <td className="p-2 onPrintDnone">
              <Dropdown>
      <Dropdown.Toggle variant="none" id="dropdown-basic">
      <i className="fas fa-ellipsis-v"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className={classes.dropdownBg}>
      <Button variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={event=>viewDetailHandler()}>View Detail</Button>
      <Button  variant="none" className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`} onClick={()=>editDepartment()}>Edit Department</Button>
        <Button variant="none" className={`${classes.dropdownItem} w-100 rounded-0 text-start ps-3`} onClick={()=>openAssignManagerHandle()}>Assign Manager</Button>
        </Dropdown.Menu>
    </Dropdown>
              </td>
            </tr>
            ))
          }
            
           
          </tbody>
        </Table>
      </div>
     )}
     {
      !departments.length && (
        <div className="mt-5 text-center">
        No data found
        </div>)
     }
    <CreateDepartment modal={modal} onClose={closeCreateDepartmentModalHandler} />
    </Fragment>
  );
};
export default Departments;
