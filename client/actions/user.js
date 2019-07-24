import axios from 'axios';
import { GET_USER, REGISTER_USER, LOGIN_USER } from './types';

export const getUser = (username, dispatch) => {
  axios
    .get(`/api/users/${username}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const register = (body, dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  axios
    .post('/api/users/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const login = (body, dispatch) => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  axios
    .post('/api/users/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
