import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/studentAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./UserRegistration.css"; // Ensure this corresponds to your CSS file
import logo from "../../assets/logo.svg";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert.error("Please enter a valid email address.");
      return;
    }

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(forgotPassword(myForm));

    setEmail("")
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      navigate("/slogin")
    }
  }, [error, alert, dispatch, message, setEmail]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="fp-mc">
            <img src={logo} alt="logo" className="ur-li" />
            <h2>Forgot Password</h2>

            <input
              className="ur-itx"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="ur-rb" onClick={forgotPasswordSubmit}>
              Send
            </button>
          </div>

        </>
      )}
    </>
  );
};

export default ForgotPassword;
