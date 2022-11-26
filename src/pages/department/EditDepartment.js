import React, { useState, useEffect } from "react";
import SaveButton from "../../components/SaveButton";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { buttonAction } from "../../store/slices/ButtonSlice";
import { departmentAction } from "../../store/slices/DepartmentSlice";
import apiCall from "../../url";
import validate from "./validateNewDepartment";
import { useDispatch,useSelector } from "react-redux";


const EditDepartment = ({modal,onClose}) => {
  const departments = useSelector(state=>state.department.departments)
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const[departmentInfo,setDepartmentInfo] = useState({})
  useEffect(() => {
    const department = {
      name: modal.department.name,
      description: modal.department.description,
      managingDeptId: modal.department.managingDeptId,
    };
    setDepartmentInfo(department);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setDepartmentInfo((previousStates) => {
      return { ...previousStates, [name]: value };
    });
    setErrors((previousErrors) => {
      return { ...previousErrors, [name]: "" };
    });
  };
  const editDepartmentHandler = async () => {
    const errorValues =validate(departmentInfo)
     setErrors(errorValues);
    if (Object.values(errorValues).length === 0) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        let response = await apiCall.put(`departments/${modal.department.id}.json`,JSON.stringify(departmentInfo));
        if (response.status === 200) {
          dispatch(departmentAction.editDepartment({...response.data,id:modal.department.id}));
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
    <>
      <Modal
        size={"lg"}
        show={modal.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Department </Modal.Title>
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
            <Form.Group className="mb-3" controlId="coldroomZone">
              <Form.Label>Select Managing Department</Form.Label>
              <Form.Select
              name='managingDeptId'
              value={departmentInfo.managingDeptId || ''}
              onChange={changeHandler}
              className={errors.managingDeptId ?"errorBorder" : ""}
              >
              {
                departments.map(department=>(<option key={department.id} value={department.id}>{department.name}</option>))
              }
            
           </Form.Select>          
              <span className="errorText">{errors.managingDeptId}</span>
            </Form.Group>
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
            <SaveButton title={"Save change"} onSave={editDepartmentHandler} />
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditDepartment;
