import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import CreateDepartment from "./CreateDepartment";
import EditDepartment from './EditDepartment'
import { departmentAction } from "../../store/slices/DepartmentSlice";
import { useDispatch,useSelector } from "react-redux";
import apiClient from "../../url/index";
import classes from "./Departments.module.css";

const DepartmentList = () => {
  const departments = useSelector(state=>state.department.departments)
  const [modal, setModal] = useState({
    show: false,
    department: {},
  });
  const [showCreatModal,setShowCreatModal] = useState(false)
  const componentRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const featchDepartments = async () => {
    try {
      var response = await apiClient.get(`departments.json`);
      if (response.status === 200) {
        // transforming the retrived data to aproprate format
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
  useEffect(() => {
    featchDepartments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateDepartmentModal = () => {
    setShowCreatModal(true)
    
  };
  const openEditDepartmentModal = (dept) => {
    setModal({
      show: true,
      department: dept,
    });
  };
  const viewDetailHandler = (deptId) => {
    navigate(`/departments/${deptId}`);
  };
  const closeCreateDepartmentModalHandler = () => {
    setShowCreatModal(false)
  };
  const closeEditDepartmentModal = () =>{
    setModal({show: false,department: {},})
  }
  return (
    <Fragment>
      <h5 className="text-bold">Department List</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the cold room section you can review and manage all cold rooms with
        their detail.You can view and edit many information such as cold room
        name, region, zone,woreda,kebele and rent fee. You can also add new cold
        room
      </p>
      <div className="d-flex my-3">
        <div className="ms-auto">
          <Button
            className={`${classes.btn} py-1`}
            onClick={openCreateDepartmentModal}
          >
            Add New Department
          </Button>
        </div>
      </div>
      <div className={classes.bottomBorder}></div>
      {departments.length > 0 && (
        <div className="mt-4" ref={componentRef}>
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
              {departments?.map((department, index) => (
                <tr className={classes.row} key={department.id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{department.name}</td>
                  <td className="p-2">Unassignd</td>
                  <td className="p-2">{department.managingDeptId}</td>
                  <td className="p-2 text-center">12</td>
                  <td className="p-2 onPrintDnone">
                    <Dropdown>
                      <Dropdown.Toggle variant="none" id="dropdown-basic">
                        <i className="fas fa-ellipsis-v"></i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={classes.dropdownBg}>
                        <Button
                          variant="none"
                          className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                          onClick={() => viewDetailHandler(department.id)}
                        >
                          View Detail
                        </Button>
                        <Button
                          variant="none"
                          className={`${classes.dropdownItem} border-bottom w-100 rounded-0 text-start ps-3`}
                          onClick={() => openEditDepartmentModal(department)}
                        >
                          Edit Department
                        </Button>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {departments.length === 0 && (
        <div className="mt-5 text-center">No data found</div>
      )}
      <CreateDepartment
        show={showCreatModal}
        onClose={closeCreateDepartmentModalHandler}
      />
      <EditDepartment modal={modal} onClose={closeEditDepartmentModal} />
    </Fragment>
  );
};
export default DepartmentList;