// import React, {useState, useEffect} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   loadStudent,
//   updateStudentProfile,
// } from "../../../actions/studentAction";
// import "./StudentProfile.css";
// import {useAlert} from "react-alert";
// import { useNavigate } from "react-router-dom";
// import Loading from "../../Loading/Loading";
// import { UPDATE_PROFILE_RESET } from "../../../constants/studentConstant";
// import pp from "../../../assets/profile.svg";

// const StudentProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const alert = useAlert();

//   const { loading, student } = useSelector((state) => state.student);
//   const { error, isUpdated } = useSelector((state) => state.profile);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [collegeCanteen, setCollegeCanteen] = useState("");
//   const [gender, setGender] = useState("");

//   const updateProfileSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("collegeCanteen", collegeCanteen);
//     myForm.set("gender", gender);
//     dispatch(updateStudentProfile(myForm));
//   };

//   useEffect(() => {
//     if (student) {
//       setName(student.name);
//       setEmail(student.email);
//       setGender(student.gender);
//       setCollegeCanteen(student.collegeCanteen);
//     }
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     if (isUpdated) {
//       alert.success("Profile updated successfully");
//       dispatch(loadStudent());
//       navigate("/saccount");
//       dispatch({ type: UPDATE_PROFILE_RESET });
//     }
//   }, [error, alert, dispatch, navigate, student, isUpdated]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="sp-mc">
//           <div className="sp-dc">
//             <div className="sp-dcl">
//               <img src={pp} alt="" className="sp-dci" />
//             </div>
//             <div className="sp-dcr">
//               <h3>{student.name}</h3>
//               <p>{student.email}</p>
//               <p>{student.collegeCanteen}</p>
//               <p>{student.gender}</p>
//             </div>
//           </div>
//           <div className="sp-uc">
//             <span className="sp-st">Your Name</span>
//             <input
//               type="text"
//               placeholder="Enter Your Name"
//               className="sp-tb"
//               name="name"
//               value={name}
//               required
//               onChange={(e) => setName(e.target.value)}
//             />
//             <span className="sp-st">Your Email</span>
//             <input
//               type="text"
//               placeholder="Enter Your Email"
//               className="sp-tb"
//               name="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <span className="sp-st">Your Gender</span>
//             <select
//               className="sp-sb"
//               name="gender"
//               onChange={(e) => setGender(e.target.value)}
//               required
//             >
//               <option value="" disabled>
//                 Select Gender
//               </option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <span className="sp-st">Your College Name</span>
//             <input
//               type="text"
//               placeholder="Enter Your College Name"
//               className="sp-tb"
//               name="collegeCanteen"
//               required
//               value={collegeCanteen}
//               onChange={(e) => setCollegeCanteen(e.target.value)}
//             />
//             <button className="sp-cb" onClick={updateProfileSubmit}>Confirm</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default StudentProfile;

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
import Loading from "../../Loading/Loading";
import { UPDATE_PROFILE_RESET } from "../../../constants/studentConstant";
import profileImage from "../../../assets/profile.svg";

const StudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, student } = useSelector((state) => state.student);
  const { error, isUpdated } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
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
