import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_USERID
} from './types';

// Login User
export const login = (token, userId) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {token: token,userId: userId}
    }
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Set userId
export const setUserId = (userId) => {
  return {
    type: SET_USERID,
    payload: {userId: userId}
  };
};