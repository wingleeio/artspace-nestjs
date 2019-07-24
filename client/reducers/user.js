import {
  GET_USER,
  REGISTER_USER,
  LOGIN_USER,
  USER_NOT_AUTHENTICATED,
  LOGOUT_USER,
} from '../actions/types';

const INITIAL_STATE = {
  user: {},
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoaded: false,
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        isLoaded: true,
      };
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
      };
    case USER_NOT_AUTHENTICATED:
      return {
        ...state,
        isLoaded: true,
      };
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
