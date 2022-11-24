import React, { useState, useEffect } from "react";
import SaveButton from "../../components/SaveButton";
import CancelButton from "../../components/CancelButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { buttonAction } from "../../store/slices/ButtonSlice";
import { departmentAction } from "../../store/slices/DepartmentSlice";
import apiCall from "../../url";
import validate from "./validateNewDepartment";
import { useDispatch } from "react-redux";


const CreateDepartment = ({modal,onClose}) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const[departmentInfo,setDepartmentInfo] = useState({name:'',description:'',managingDeptId:null})
  useEffect(() => {
    const department = {
      name: modal.name,
      region: modal.address?.region,
      zone: modal.address?.zone,
      woreda: modal.address?.woreda,
    };
    setDepartmentInfo(department);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);
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
        let response = await apiCall.post("departments", departmentInfo);
        if (response.status === 201) {
          dispatch(departmentAction.createDepartment(response.data));
          handleClose();
        }
      } catch (err) {
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };
  const editColdRoom = async () => {
    const errorValues = setErrors(validate(departmentInfo));
    if (!errorValues) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        let response = await apiCall.put(`admin/coldRooms/${modal.id}`,departmentInfo);
        if (response.status === 200) {
          dispatch(departmentAction.addColdRoom(response.data));
          handleClose();
          setDepartmentInfo({show:true,status:1,title:'Successful',message:'You edited cold room successfully'})
        }
      } catch (err) {
        setDepartmentInfo({show:true,status:0,title:'Faild',message:'faild to edit cold room'})
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
          <Modal.Title>{modal.title}</Modal.Title>
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
              onChange={changeHandler}
              name='managingDeptId'
              value={departmentInfo.managingDeptId || ''}
              className={errors.managingDeptId ?"errorBorder" : ""}
              >
             <option value='hrm'>HRM</option>
             <option value='ict'>ICT</option>
             <option value='marketing'>Marketing</option>
             <option value='foreign affairs'>Forien Affairs</option>
           </Form.Select>          
              <span className="errorText">{errors.managingDeptId}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <CancelButton title={"Cancel"} onClose={handleClose} />
          {modal.isEdit ? (
            <SaveButton title={"Save change"} onSave={editColdRoom} />
          ) : (
            <SaveButton title={"Save "} onSave={createNewDepartmentHandler} />
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateDepartment;
