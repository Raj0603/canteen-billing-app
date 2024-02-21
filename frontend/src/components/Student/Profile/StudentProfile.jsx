import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loadStudent,
  updateStudentProfile,
} from "../../../actions/studentAction";
import "./StudentProfile.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { logoutStudent } from "../../../actions/studentAction";
import Loading from "../../Loading/Loading";
import { UPDATE_PROFILE_RESET } from "../../../constants/studentConstant";
import profileImage from "../../../assets/profile.svg";
import {
  LogOut,
  MessageSquare,
  MessageCircleIcon,
  PencilLine,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Footer from "../Sidebar/Footer";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, student } = useSelector((state) => state.student);
  const { error, isUpdated } = useSelector((state) => state.profile);
  const [ editMode, setEditMode ] = useState(false);

  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    collegeCanteen: "",
    gender: "",
  });

  const { name, email, collegeCanteen, gender } = formData;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("collegeCanteen", collegeCanteen);
    myForm.set("gender", gender);

    dispatch(updateStudentProfile(myForm));
  };

  function logoutStudentFunction() {
    dispatch(logoutStudent());
    alert.success("Logout Successful");
    navigate("/")
  }

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        collegeCanteen: student.collegeCanteen,
        gender: student.gender,
      });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadStudent());
      navigate("/saccount");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [error, alert, dispatch, navigate, student, isUpdated]);

  return (
    <>
    <Footer/>
      {loading ? (
        <Loading />
      ) : (
        <div className="sp-mc">
          <div className="sp-dc">
            <div className="sp-dcl">
              <img src={profileImage} alt="Profile" className="sp-dci" />
            </div>
            <div className="sp-dcr">
              <h3>{student.name}</h3>
              <p>{student.email}</p>
              <p>{student.collegeCanteen}</p>
              <p>{student.gender}</p>
            </div>
          </div>
          <div className="sp-uc">
            <FormField
              label="Your Name"
              type="text"
              name="name"
              // value={name}
              onChange={handleInputChange}
            />
            <FormField
              label="Your Email"
              type="text"
              name="email"
              // value={email}
              onChange={handleInputChange}
            />
            <FormField
              label="Your Gender"
              type="select"
              name="gender"
              // value={gender}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </FormField>
            <FormField
              label="Your College Name"
              type="text"
              name="collegeCanteen"
              // value={collegeCanteen}
              onChange={handleInputChange}
            />
            <button className="sp-cb" onClick={updateProfileSubmit}>
              Confirm
            </button>
          </div>
          <div className="sp-pv">
            <button className="sp-btn" onClick={() => setEditMode(!editMode)}>
              <PencilLine /> <span className="sp-bts">Edit Profile </span> {editMode ? <ChevronDown/> : <ChevronUp/>}
            </button>
            {editMode ? (
              <div className="sp-puc">
                <FormField
                  label="Your Name"
                  type="text"
                  name="name"
                  // value={name}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Your Email"
                  type="text"
                  name="email"
                  // value={email}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Your Gender"
                  type="select"
                  name="gender"
                  // value={gender}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </FormField>
                <FormField
                  label="Your College Name"
                  type="text"
                  name="collegeCanteen"
                  // value={collegeCanteen}
                  onChange={handleInputChange}
                />
                <button className="sp-cb" onClick={updateProfileSubmit}>
                  Confirm
                </button>
              </div>
            ) : (
              <></>
            )}
            <button className="sp-btn">
              <MessageSquare /> <span className="sp-bts">Support </span>
            </button>
            <button className="sp-btn">
              <MessageCircleIcon /> <span className="sp-bts">About Us </span>
            </button>
            <button className="sp-btn" onClick={logoutStudentFunction}>
              <LogOut /> <span className="sp-bts">Logout </span>
            </button>
            <button className="sp-btn"></button>
          </div>
        </div>
      )}
    </>
  );
};

const FormField = ({ label, type, name, value, onChange, children }) => (
  <>
    <span className="sp-st">{label}</span>
    {type === "select" ? (
      <select
        className="sp-sb"
        name={name}
        onChange={onChange}
        value={value}
        required
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        placeholder={`Enter ${label}`}
        className="sp-tb"
        name={name}
        required
        value={value}
        onChange={onChange}
      />
    )}
  </>
);

export default StudentProfile;
