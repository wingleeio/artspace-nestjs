import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { GET_PROFILE } from '../../../actions/types';

function Profile({ match }) {
  const { profile } = useSelector(state => ({ ...state.profile }));
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`/api/users/${match.params.username}`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        });
      })
      .catch(err => console.log(err));
  }, [match]);
  return (
    <div>
      {profile.username}
      <img src={profile.avatar} />
    </div>
  );
}

export default Profile;
