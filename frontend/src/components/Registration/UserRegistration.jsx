import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./UserRegistration.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { studentRegister, clearErrors } from "../../actions/studentAction";
import { useAlert } from "react-alert";

const UserRegistration = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.student
  );

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    collegeCanteen: "",
    gender: "",
  });

  const { name, email, password, collegeCanteen, gender } = student;

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address.");
    return isValid;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const isValid = passwordRegex.test(password);
    setPasswordError(
      isValid
        ? ""
        : "Password should be at least 8 characters long and include at least one uppercase, one lowercase, and one digit."
    );
    return isValid;
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!name || !email || !password || !collegeCanteen || !gender) {
      alert.error("Please fill in all the details.");
      return;
    }

    if (isEmailValid && isPasswordValid) {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("collegeCanteen", collegeCanteen);
      myForm.set("gender", gender);
      dispatch(studentRegister(myForm));
    }
  };

  const studentRegisterDataChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (error && error !== "Please login to access this resource") {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
      window.location.reload();
    }
  }, [error, alert, dispatch, navigate, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="ur-mc">
          <img src={logo} alt="logo" className="ur-li" />
          <h2>Register to Canteen</h2>
          <p style={{fontSize:"large"}}>
            Do you have an existing account? <Link to="/slogin"><span style={{color:"blue", textDecoration:"underline", cursor:"pointer"}}>Login</span></Link>{" "}
          </p>
          <input
            type="text"
            placeholder="Your Full Name"
            className="ur-itx"
            required
            name="name"
            value={name}
            onChange={studentRegisterDataChange}
          />

          <input
            type="text"
            placeholder="Email Address"
            className="ur-itx"
            required
            name="email"
            value={email}
            onChange={studentRegisterDataChange}
          />
          <div className="ur-eem">{emailError}</div>

          <input
            type="password"
            placeholder="Password"
            className="ur-itx"
            required
            name="password"
            value={password}
            onChange={studentRegisterDataChange}
          />
          <div className="ur-pem">{passwordError}</div>
          <input
            type="text"
            placeholder="Your College Name"
            className="ur-itx"
            required
            name="collegeCanteen"
            value={collegeCanteen}
            onChange={studentRegisterDataChange}
          />
          <select
            className="ur-itx ur-sgb"
            required
            name="gender"
            value={gender}
            
            onChange={studentRegisterDataChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button className="ur-rb" onClick={handleRegistration}>
            Register
          </button>
        </div>
      )}
    </>
  );
};

export default UserRegistration;
