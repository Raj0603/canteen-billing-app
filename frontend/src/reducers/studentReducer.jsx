import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_STUDENT_FAIL,
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
  LOAD_STUDENT_REQUEST,
  LOAD_STUDENT_SUCCESS,
  LOAD_STUDENT_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_STUDENTS_REQUEST,
  ALL_STUDENTS_SUCCESS,
  ALL_STUDENTS_FAIL,
  ALL_OWNERS_REQUEST,
  ALL_OWNERS_SUCCESS,
  ALL_OWNERS_FAIL,
  DELETE_STUDENT_REQUEST,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL,
  DELETE_STUDENT_RESET,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAIL,
  UPDATE_STUDENT_RESET,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  DELETE_OWNER_REQUEST,
  DELETE_OWNER_SUCCESS,
  DELETE_OWNER_FAIL,
  DELETE_OWNER_RESET,
} from "../constants/studentConstant";

export const studentReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_STUDENT_REQUEST:
    case LOAD_STUDENT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_STUDENT_SUCCESS:
    case LOAD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        student: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        student: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTER_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        student: null,
        error: action.payload,
      };

    case LOAD_STUDENT_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        student: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const studentProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_STUDENT_REQUEST:
    case DELETE_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_STUDENT_FAIL:
    case DELETE_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_STUDENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_STUDENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allStudentsReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case ALL_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload,
      };
    case ALL_STUDENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_STUDENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const allOwnersReducer = (state = { owners: [] }, action) => {
  switch (action.type) {
    case ALL_OWNERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_OWNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        owners: action.payload,
      };
    case ALL_OWNERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_OWNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_OWNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_OWNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_OWNER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const studentDetailsReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STUDENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        student: action.payload,
      };

    case STUDENT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
