import { Fragment, useEffect, useRef,useState } from "react";
import Table from "react-bootstrap/Table";
import classes from "./Reports.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import apiCall from "../../url/index";

const SentReportList = () => {
    const userInfo = useSelector(state=>state.user.userInfo)
  const [reports,setReports] = useState([])
  const componentRef = useRef();
  const navigate = useNavigate()

  const featchRecivedReports = async () => {
    try {
      var response = await apiCall.get(`reports/${userInfo.managingDeptId}.json`);
      if (response.status === 200) {
        // transforming the retrived data to aproprate format
        const responseData = [];
        for (let key in response.data) {
            if(response.data[key].sentTo === userInfo.departmentId){
          responseData.push({
            id: key,
            title: response.data[key].title,
            sentDate: response.data[key].sentDate,
            sentTo: response.data[key].sentTo,
            data:response.data[key].data
          });
        }
        }
        setReports(responseData)
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    featchRecivedReports();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const readReportHandler = (id) =>{
    navigate(`/recieved-reports/${id}`)
  }
  return (
    <Fragment>
    <button onClick={()=>navigate(-1)} style={{background:"none",border:"none",fontSize:"2rem"}}><i className="fas fa-arrow-left"></i></button> 
      <h5 className="text-bold mt-3">Recieved Reports</h5>
      <p className={`${classes.titleP} fw-bold small`}>
        In the Recieved reports section you can  view list of reports sent to you from the lower departments (from departments managed by you) 
      </p>
      <div className={classes.bottomBorder}></div>
      {reports.length > 0 && (
        <div className="mt-4" ref={componentRef}>
          <Table responsive="md" hover>
            <thead className={classes.header}>
              <tr>
                <th>NO</th>
                <th>Report Title</th>
                <th>Sent To</th>
                <th>Sent Date</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report, index) => (
                <tr className={classes.row} key={report.id} onClick={()=>readReportHandler(report.id)}>
                <td className="p-4">{index+1}</td>
                <td className="p-4">{report.title}</td>
                <td className="p-4">{report.sentTo}</td>
                  <td className="p-4">{report.sentDate.slice(0,10)}</td>
                  
                 
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {reports.length === 0 && (
        <div className="mt-5 text-center">No data found</div>
      )}
      
    </Fragment>
  );
};
export default SentReportList;
