// actions/userActions.js
import axios from "axios";

export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_ROLES_SUCCESS = "FETCH_ROLES_SUCCESS";

export const addUser = (user) => {
    return async (dispatch) => {
        dispatch({ type: ADD_USER_REQUEST });
        try {
            const response = await axios.post("http://localhost:3000/api/v1/users", user);
            dispatch({ type: ADD_USER_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: ADD_USER_FAILURE, error: error.message });
        }
    };
};

export const login = (credentials) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/login", credentials);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return response.data; // Return the response data
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, error: error.response.data.message });
        throw error; // Rethrow the error to handle it in the component
    }
};

export const fetchUserDetails = (userId) => async (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
        dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: FETCH_USER_FAILURE, error: error.message });
    }
};

export const fetchRoles = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/roles");
        dispatch({ type: FETCH_ROLES_SUCCESS, payload: response.data.roles });
    } catch (error) {
        console.error("Error fetching roles:", error);
    }
};