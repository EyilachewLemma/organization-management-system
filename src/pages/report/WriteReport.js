import { useState } from "react"
import Ckeditor from "../../components/Ckeditor"
import SaveButton from "../../components/SaveButton"
import Form from 'react-bootstrap/Form'
import { useSelector,useDispatch } from "react-redux"
import NotificationModal from "../../components/Modal";
import { useNavigate } from "react-router-dom"
import { buttonAction } from "../../store/slices/ButtonSlice";
import apiCall from "../../url"
const WriteReport = () =>{
 const [report,setReport] = useState({title:'',data:''})
 const[modalData,setModalData] = useState({show:false,status:null,title:'',message:''})
 const userInfo = useSelector(state=>state.user.userInfo)
 const dispatch = useDispatch()
 const navigate = useNavigate()
    const getEditorData = (data)=>{
         setReport(preValues=>{
            return {...preValues,data:data}
         })
    }
 
    const titleChangeHandler = (e)=>{
        setReport(preValues=>{
            return {...preValues,title:e.target.value}
         })
    }
    const saveReportHandler = async() =>{
        dispatch(buttonAction.setBtnSpiner(true));
        const sentDate = new Date()
        const reportData = {
            sentTo:userInfo.managingDeptId,
            sentFrom:userInfo.departmentId,
            sentDate:sentDate,
            ...report
        }
        try{
            const response = await apiCall.post('reports.json',JSON.stringify(reportData))
            if(response.status === 200){
                console.log(response.data)
                setModalData({show:true,status:1,title:'Successful',message:'You sent report successfully'})
            }
        }
     catch (err) {
        setModalData({show:true,status:0,title:'Faild',message:'faild to send report'})
      }
      finally{
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
    const handleModalClose =() =>{
        setModalData({})
      }
    return <div>
    <button onClick={()=>navigate(-1)} style={{background:"none",border:"none",fontSize:"2rem"}}><i className="fas fa-arrow-left"></i></button> 
    <Form.Group className="mb-3 mt-3" controlId="coldroomRegion">
              <Form.Label>Report Title</Form.Label>
              <Form.Control
               type="text"
                name="title"
                value={report.title || ''}
                onChange={titleChangeHandler}
              />
            </Form.Group>
            <div className="mb-3">Write report data here</div>
    <Ckeditor onBuler={getEditorData}></Ckeditor>
   <div className="d-flex mt-5 justify-content-end">
   <SaveButton title='send Report' onSave={saveReportHandler}/>
   </div>
   <NotificationModal modal={modalData} onClose={handleModalClose} />
    </div>
}
export default WriteReport