import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { GET_PROFILE, GET_PROFILE_WORKS } from '../../../actions/types';

function Profile({ match }) {
  const { profile, profileWorks } = useSelector(state => ({
    ...state.profile,
  }));
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
    axios
      .get(`/api/users/${match.params.username}/works`)
      .then(res => {
        dispatch({
          type: GET_PROFILE_WORKS,
          payload: res.data,
        });
      })
      .catch(err => console.log(err));
  }, [match]);

  return (
    <>
      <div className="profile-header-container">
        <div
          className="profile-header"
          style={{ background: `url(${profile.cover}) center/cover` }}
        >
          <div className="profile-info">
            <div className="basic-info">
              <img src={profile.avatar} />
              <div className="user-desc">
                <p>{profile.username}</p>
                <p>{profile.bio}</p>
              </div>
            </div>
            <div className="social-info">
              <p>{profile.followersCount}</p>
              <p>{profile.followingCount}</p>
            </div>
          </div>
        </div>
        <div className="profile-nav">
          <div> nav stuff</div>
        </div>
      </div>
      {/* <div className="featured-work">
        <h1>Featured Work</h1>
        <div className="profile-featured-work">
          <img src="#" alt="#" />
        </div>
      </div> */}
      <div className="profile-works">
        <div className="container-padding-both">
          <div>aaaaaaaaaa images</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
