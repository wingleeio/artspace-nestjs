import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { GET_USER, USER_NOT_AUTHENTICATED } from '../actions/types';
import Spinner from './Spinner';

function Loader(props) {
  const { token, isLoaded } = useSelector(state => ({
    ...state.user,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get('/api/users/auth/token', config)
      .then(res => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({ type: USER_NOT_AUTHENTICATED });
      });
  }, [token, useDispatch]);

  if (!isLoaded) {
    return <Spinner />;
  }

  return props.children;
}

export default Loader;
