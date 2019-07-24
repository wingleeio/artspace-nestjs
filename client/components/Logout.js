import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../actions/types';

function Logout({ history }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOGOUT_USER });
    history.push('/');
  }, [history, dispatch]);
  return <></>;
}

export default Logout;
