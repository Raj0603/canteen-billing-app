import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_STUDENT_REQUEST,
    REGISTER_STUDENT_SUCCESS,
    REGISTER_STUDENT_FAIL,
    LOAD_STUDENT_REQUEST,
    LOAD_STUDENT_SUCCESS,
    LOAD_STUDENT_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_STUDENTS_REQUEST,
    ALL_STUDENTS_SUCCESS,
    ALL_STUDENTS_FAIL,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAIL,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAIL,
    STUDENT_DETAILS_REQUEST,
    STUDENT_DETAILS_SUCCESS,
    STUDENT_DETAILS_FAIL,
  } from "../constants/studentConstant";
  
  import axios from "axios";
  
  //Login Student
  
  export const studentLogin = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
      const data = await axios.post(`/api/v1/login`, { email, password }, config);
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.student });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  
  //Register Student
  
  export const studentRegister = (studentData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_STUDENT_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(`/api/v1/register`, studentData, config);
  
      dispatch({ type: REGISTER_STUDENT_SUCCESS, payload: data.student });
    } catch (error) {
      dispatch({
        type: REGISTER_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //Load student
  
  export const loadStudent = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_STUDENT_REQUEST });
  
      const { data } = await axios.get(`/api/v1/me`);
  
      dispatch({ type: LOAD_STUDENT_SUCCESS, payload: data.student });
    } catch (error) {
      dispatch({ type: LOAD_STUDENT_FAIL, payload: error.response.data.message });
    }
  };
  
  //Logout student
  
  export const logoutStudent = () => async (dispatch) => {
    try {
      await axios.get(`/api/v1/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };
  
  //Update student Profile
  
  export const updateStudentProfile = (studentData) => async (dispatch) => {
    try {
      dispatch({ type:UPDATE_PROFILE_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`/api/v1/me/update`, studentData, config);
  
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //Forgot Password
  
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
      const {data} = await axios.post(`/api/v1/password/forgot`, email, config);
  
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
      console.log(data.message)
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
    }
  };
  
  // Reset Password
  export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
        config
      );
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // get All Students
  export const getAllStudents = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_STUDENTS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/students`);
  
      dispatch({ type: ALL_STUDENTS_SUCCESS, payload: data.students });
    } catch (error) {
      dispatch({ type: ALL_STUDENTS_FAIL, payload: error.response.data.message });
    }
  };
  
  // get  student Details
  export const getStudentDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_DETAILS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/student/${id}`);
  
      dispatch({ type: STUDENT_DETAILS_SUCCESS, payload: data.student });
    } catch (error) {
      dispatch({ type: STUDENT_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update student
  export const updateStudent = (id, studentData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_STUDENT_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/admin/student/${id}`,
        studentData,
        config
      );
  
      dispatch({ type: UPDATE_STUDENT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Student
  export const deleteStudent = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_STUDENT_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/student/${id}`);
  
      dispatch({ type: DELETE_STUDENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_STUDENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  //Clear Errors
  
  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  