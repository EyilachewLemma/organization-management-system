import React, { useState,useEffect } from "react";
import SaveButton from "../../components/SaveButton";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { buttonAction } from "../../store/slices/ButtonSlice";
import { departmentAction } from "../../store/slices/DepartmentSlice";
import apiCall from "../../url";
import validate from "./validateNewDepartment";
import { useDispatch,useSelector } from "react-redux";


const CreateDepartment = ({show,onClose}) => {
  const departments = useSelector(state=>state.department.departments)
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const[departmentInfo,setDepartmentInfo] = useState({name:'',description:'',managingDeptId:''})
  const [isTopManagement,setIsTopManagement] = useState(false)
  useEffect(()=>{
    setDepartmentInfo(prevValue=>{
      return {...prevValue,managingDeptId:departments[0]?.id || 'ceo'}
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDepartmentInfo((previousStates) => {
      return { ...previousStates, [name]: value };
    });
    setErrors((previousErrors) => {
      return { ...previousErrors, [name]: "" };
    });
  };

  const checkChangeHandler = () =>{
    setIsTopManagement(prevValue=>!prevValue)
  }
  const createNewDepartmentHandler = async () => {   
    const errorValues = validate(departmentInfo);
    setErrors(errorValues)
    if(departments.length === 0 && !isTopManagement){
      setErrors(prevValue=>{
        return {...prevValue,check:'Please check the checkbox, because the first department is the top management'}
      })
    }
    if (Object.values(errorValues).length === 0) {      
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        let response = await apiCall.post("departments.json", JSON.stringify(departmentInfo));
        if (response.status === 200) {
        const newDepartment = {
          id:response.data.name,
          ...departmentInfo 
        }         
          dispatch(departmentAction.createDepartment(newDepartment));
          handleClose();
        }
      } catch (err) {
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };
  const handleClose = () => {
    onClose()
    setErrors({});
    setDepartmentInfo({});
  };
  console.log('departments=',departments)
  return (
      <Modal
        size={"lg"}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-5">
            <Form.Group className="mb-3" controlId="coldroomName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={departmentInfo.name || ''}
                onChange={changeHandler}
                className={errors.name ?"errorBorder" : ""}
              />
              <span className="errorText">{errors.name}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="coldroomRegion">
              <Form.Label>Description</Form.Label>
              <Form.Control   as="textarea"
              style={{ height: "100px" }}
                name="description"
                value={departmentInfo.description || ''}
                onChange={changeHandler}
                className={errors.description ? "errorBorder" : ""}
              />
              <span className="errorText">{errors.description}</span>
            </Form.Group>
            {departments.length > 0 && (
              <Form.Group className="mb-3" controlId="coldroomZone">
              <Form.Label>Select Managing Department</Form.Label>
              <Form.Select
              onChange={changeHandler}
              name='managingDeptId'
              value={departmentInfo.managingDeptId || ''}
              className={errors.managingDeptId ?"errorBorder" : ""}
              >
              {
                departments.map(department=>(<option key={department.id} value={department.id}>{department.name}</option>))
              }
            
           </Form.Select>          
              <span className="errorText">{errors.managingDeptId}</span>
            </Form.Group>
            )}
            {
              departments.length === 0 && (
                <div>
                <Form.Check
                type="checkbox"
                label="Use as top management"
                id="topManagement"
                onChange={checkChangeHandler}
              />
              <span className="errorText">{errors.check}</span>
              </div>
              )
            }
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />         
            <SaveButton title={"Save "} onSave={createNewDepartmentHandler} />
         
        </Modal.Footer>
      </Modal>
    
  );
};

export default CreateDepartment;
