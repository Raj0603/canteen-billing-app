import React from "react";
import "./StudentNavbar.css";
import { Utensils } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutStudent } from "../../../actions/studentAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
const StudentNavbar = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  function logoutStudentFunction() {
    dispatch(logoutStudent());
    alert.success("Logout Successful");
    navigate("/")
  }

  const { isAuthenticated, student } = useSelector((state) => state.student);
  return (
    <div className="nb-main">
      <nav className="nb-con">
        <Utensils />
        <Link to="/">
          <li className="nb-li">Home</li>
        </Link>
        <li className="nb-li">Support</li>
        <li className="nb-li">About</li>
        <li className="nb-li">Pricing</li>
        <span>|</span>
        {isAuthenticated ? (
          <button className="nb-lb" onClick={logoutStudentFunction}>
            Logout
          </button>
        ) : (
          <Link to="/sregister">
            <button className="nb-lb">Login</button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default StudentNavbar;
