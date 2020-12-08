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
  } from '../actions/types';

const initialState = {
token: localStorage.getItem('token'),
userId: null,
isAuthenticated: null,
isLoading: false,
user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
        return {
            ...state,
            isLoading: true
        };
        case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload
        };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
        };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            userId : null
        };
        case SET_USERID:
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
        };
        default:
        return state;
    }
}

export default authReducer;