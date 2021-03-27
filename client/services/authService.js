import axios from 'axios';
import { push } from 'connected-react-router';

import { loginSuccess, loginFailure, logoutSuccess } from '../actions/authAction';
import { API_URL, JWT_TOKEN, USER_ID } from '../config/config';
import { setLocalStorage, clearLocalStorage } from '../utils/storageUtil';
import jwt_decode from "jwt-decode";

export const login = ({ username, password }) => {
  return (dispatch) => {
    axios
      .post(API_URL + 'auth/login', { username, password })
      .then((response) => {
        dispatch(loginSuccess(response.data.payload.token));
        setLocalStorage(JWT_TOKEN, response.data.payload.token);
        const decoded = jwt_decode(response.data.payload.token);
        setLocalStorage(USER_ID, decoded.userId);
        dispatch(push('/leagues'));
      })
      .catch((error) => {
        dispatch(loginFailure(error.response.data));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    clearLocalStorage(JWT_TOKEN);
    dispatch(logoutSuccess());
    dispatch(push('/'));
    return false;
  };
};
