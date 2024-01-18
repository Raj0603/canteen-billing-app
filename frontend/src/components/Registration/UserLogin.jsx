import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./UserRegistration.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import {studentLogin, clearErrors} from "../../actions/studentAction"
import { useAlert } from "react-alert";

const UserLogin = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.student
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(studentLogin(loginEmail, loginPassword));
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
  }, [error, alert, dispatch, navigate, isAuthenticated, ]);


  return (

   <>
   {loading?<Loading/>: <div className="ul-mc">
      <img src={logo} alt="logo" className="ur-li" />
      <h1>Login to Canteen</h1>
      <p>
        Don't have an existing account <Link to="/sregister">Register</Link>{" "}
      </p>
      <input
        type="text"
        placeholder="Email Address"
        className="ur-itx"
        required
        name="email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="ur-itx"
        required
        name="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />

      <button className="ur-rb" 
      onClick={loginSubmit}
      >
        Login
      </button>
    </div>}
   </>
  );
};

export default UserLogin;
