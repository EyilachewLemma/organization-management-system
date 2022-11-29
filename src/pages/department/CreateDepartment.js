import React, { useState } from "react";
import SaveButton from "../../components/SaveButton";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { buttonAction } from "../../store/slices/ButtonSlice";
import { departmentAction } from "../../store/slices/DepartmentSlice";
import apiCall from "../../url";
import validate from "./validateNewDepartment";
import { useDispatch} from "react-redux";


const CreateDepartment = ({show,onClose}) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const[departmentInfo,setDepartmentInfo] = useState({name:'',description:'',managingDeptId:'Unassigned'})

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDepartmentInfo((previousStates) => {
      return { ...previousStates, [name]: value };
    });
    setErrors((previousErrors) => {
      return { ...previousErrors, [name]: "" };
    });
  };
  const createNewDepartmentHandler = async () => {   
    const errorValues = validate(departmentInfo);
    setErrors(errorValues)
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
          <Form className="px-5 mt-3">
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
