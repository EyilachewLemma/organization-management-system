import { Fragment, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { departmentAction } from "../../store/slices/DepartmentSlice";
import { useDispatch,useSelector } from "react-redux";
import apiClient from "../../url/index";
import classes from "./Reports.module.css";

const SentReports = () => {
  const departments = useSelector(state=>state.department.departments)
  const componentRef = useRef();
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
  const writeNewReport = () =>{}
  return (
    <Fragment>
      <h5 className="text-bold">Sent Reports</h5>
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
          onClick={writeNewReport}
        >
          Write New Report
        </Button>
      </div>
    </div>
      <div className={classes.bottomBorder}></div>
      {departments.length > 0 && (
        <div className="mt-4" ref={componentRef}>
          <Table responsive="md" hover>
            <thead className={classes.header}>
              <tr>
                <th>NO</th>
                <th>Sent To</th>
                <th>Sent Date</th>
              </tr>
            </thead>
            <tbody>
              {departments?.map((department, index) => (
                <tr className={classes.row} key={department.id}>
                <td className="p-4">{index+1}</td>
                  <td className="p-4">09-12-2022</td>
                  <td className="p-4">ICT Office</td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {departments.length === 0 && (
        <div className="mt-5 text-center">No data found</div>
      )}
      
    </Fragment>
  );
};
export default SentReports;
