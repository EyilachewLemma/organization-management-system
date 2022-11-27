import { Fragment, useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import apiCall from "../../url/index";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ReadReport = () => {
    const userInfo = useSelector(state=>state.user.userInfo)
  const [report,setReport] = useState({})
  const {id} = useParams()
  const navigate = useNavigate()

  const featchSentReports = async () => {
    try {
      var response = await apiCall.get(`reports.json`);
      if (response.status === 200) {
        // transforming the retrived data to aproprate format
        for (let key in response.data) {
            if(key === id){
                setReport({
                    id: key,
                    title: response.data[key].title,
                    sentDate: response.data[key].sentDate,
                    sentTo: response.data[key].sentTo,
                    data:response.data[key].data
                  })
          return 
        }
        
        }
        
      }
    } catch (err) {
    } finally {
    }
  };
  useEffect(() => {
    featchSentReports();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return (
    <Fragment>  
    <button onClick={()=>navigate(-1)} style={{background:"none",border:"none",fontSize:"2rem"}}><i className="fas fa-arrow-left"></i></button> 
    <div className="mt-4">
    <div>Title Of the Report:<span className="fw-bold">{report.title}</span></div>
    <div className="mt-3">Description of the report</div>
    <p dangerouslySetInnerHTML={{ __html: report.data }}>
    </p>
    </div>    
    </Fragment>

  );
};
export default ReadReport;
