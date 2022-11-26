import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { userAction } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";

const LoginPage = () => {
  const departments = useSelector((state) => state.department.departments);
  const [cridentials, setCridentials] = useState({
    email: "",
    password: "",
    departmentId: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    departmentId: "",
    errNotify: "",
  });
  const [notification, setNotification] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    setCridentials((preValues) => {
      return { ...preValues, departmentId: departments[0]?.id };
    });
  }, [departments]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCridentials((prevValues) => {
      return { ...prevValues, [name]: value };
    });
    if (e.target.value) {
      setErrors((prevErrors) => {
        return { ...prevErrors, [name]: "" };
      });
    }
  };
  const validateCredentials = (values) => {
    const errorValues = {};
    if (!values.email.trim()) {
      errorValues.email = "email is required";
    }
    if (!values.password) {
      errorValues.password = "password is required";
    } else if (values.length > 15) {
      errorValues.password = "password must not be greater than 15 characters";
    }
    return errorValues;
  };
  const loginHandler = async () => {
    const err = validateCredentials(cridentials);
    setErrors(err);
    if (!errors.email && !errors.password && !errors.departmentId) {
        const myDepartment = departments.find(dept=>dept.id === cridentials.departmentId)
        const userInfo = {
            email:cridentials.email,
            departmentId:cridentials.departmentId,
            managingDeptId:myDepartment.managingDeptId
          }
      localStorage.setItem("token", cridentials.departmentId);
      localStorage.setItem('user',JSON.stringify(userInfo))
      dispatch(userAction.setToken(cridentials.departmentId));
      dispatch(userAction.setIsAuthenticated(true));
      dispatch(userAction.setUserInfo(userInfo))
      
      navigate('/')
      // I used department id the user selects when he loged in as authorization token to identify if
      // the user is loged in or not and to fetch department specific data
    } else {
      setNotification("faild to log in please select your credentials")
        
    }
  };
  return (
    <div className={`${classes.wraper} p-5`}>
      <div className="d-flex justify-content-center fs-3 fw-bold mb-5">
        <span className={classes.yellowTxt}>XYZ</span>
        <span className={classes.greenTxt}>COMPANY</span>
      </div>
      <Form>
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label className="fw-bold">Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className={errors.email ? classes.errorBorder : ""}
            onChange={changeHandler}
          />
          <span className={classes.errorText}>{errors.email}</span>
        </Form.Group>
        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            className={errors.password ? classes.errorBorder : ""}
            onChange={changeHandler}
          />
          <span className={classes.errorText}>{errors.password}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="coldroomZone">
          <Form.Label>Select department to login</Form.Label>
          <Form.Select
            value={cridentials.departmentId || ""}
            onChange={changeHandler}
            name="departmentId"
          >
            {departments.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button
          className={`${classes.btn} w-100`}
          variant="none"
          onClick={loginHandler}
        >
          Login
        </Button>
      </Form>
      <p className={`${classes.errorText} mt-3`}>{notification}</p>
    </div>
  );
};
export default LoginPage;
