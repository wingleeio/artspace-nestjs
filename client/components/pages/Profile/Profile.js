import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILE_WORKS,
  GET_PROFILE_FAVOURITES,
  RELOAD_PROFILE,
} from '../../../actions/types';
import { Link } from 'react-router-dom';

import * as Unicons from '@iconscout/react-unicons';
import Spinner from '../../Spinner';

function Profile({ match, history }) {
  const {
    profile,
    profileWorks,
    profileFavourites,
    profileLoaded,
    isAuthenticated,
    user,
    token,
  } = useSelector(state => ({
    ...state.profile,
    ...state.user,
  }));
  const [showWorks, setShowWorks] = useState(true);
  const [isFollowing, setIsFollowing] = useState(null);
  const dispatch = useDispatch();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const followUnfollow = () => {
    const getProfile = () => {
      axios
        .get(`/api/users/${match.params.username}`)
        .then(res => {
          dispatch({
            type: GET_PROFILE,
            payload: res.data,
          });
        })
        .catch(err => console.log(err));
    };
    if (isFollowing) {
      axios
        .post(`/api/users/unfollow/${match.params.username}`, '', config)
        .then(res => {
          setIsFollowing(false);
          getProfile();
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post(`/api/users/follow/${match.params.username}`, '', config)
        .then(res => {
          setIsFollowing(true);
          getProfile();
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    dispatch({ type: RELOAD_PROFILE });
    window.scrollTo(0, 0);
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
    axios
      .get(`/api/users/${match.params.username}/favourites`)
      .then(res => {
        dispatch({
          type: GET_PROFILE_FAVOURITES,
          payload: res.data,
        });
      })
      .catch(err => console.log(err));
    if (isAuthenticated) {
      axios
        .get(`/api/users/${match.params.username}/isfollowing`, config)
        .then(res => setIsFollowing(res.data))
        .catch(err => console.log(err));
    }
  }, [match, isAuthenticated]);

  const shownWorks = showWorks === true ? profileWorks : profileFavourites;

  return (
    <>
      <div className="profile-header-container">
        <div className="profile-gradient"></div>
        <div
          className="profile-header"
          style={{
            background: ` linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(255, 255, 255, 0) 65%
          ), url(${profile.cover}) center/cover`,
          }}
        >
          <div className="profile-info">
            <div className="basic-info">
              <img src={profile.avatar} />
              <div className="user-desc">
                <h2>{profile.username}</h2>
                <p>{profile.bio}</p>
              </div>
            </div>
            <div className="social-info">
              <div className="column">
                {isAuthenticated && user.id === profile.id ? (
                  <div className="edit-profile">
                    <Link to="/editprofile">
                      <Unicons.UilPen size="24" />
                    </Link>
                  </div>
                ) : (
                  isAuthenticated &&
                  user.id !== profile.id && (
                    <div className="toggle-follow-button">
                      {isFollowing ? (
                        <a
                          className="unfollow-button btn-dangerous"
                          onClick={followUnfollow}
                        >
                          Unfollow
                        </a>
                      ) : (
                        <a
                          className="follow-button btn-success"
                          onClick={followUnfollow}
                        >
                          Follow
                        </a>
                      )}
                    </div>
                  )
                )}
              </div>
              <div className="flex social">
                <div className="column">
                  <p>Followers</p>
                  <p>{profile.followersCount}</p>
                </div>
                <div className="column">
                  <p>Following</p>
                  <p>{profile.followingCount}</p>
                </div>
                <div className="column">
                  <p>Works</p>
                  <p>{profile.worksCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-toggle">
          <a
            className={showWorks === true ? 'btn-success' : ''}
            onClick={() => setShowWorks(true)}
          >
            Works
          </a>
          <a
            className={showWorks === false ? 'btn-success' : ''}
            onClick={() => setShowWorks(false)}
          >
            Favourites
          </a>
        </div>
      </div>
      {/* begin user works */}
      {profileLoaded ? (
        <div className="profile-works">
          <section className="art-group-container">
            {/* <h1 className="art-group-title">{groupTitle}</h1> */}
            <div className="art-container">
              <div className="images-container flex flex-wrap">
                {shownWorks !== undefined &&
                  shownWorks.map(work => (
                    <Fragment key={work.id}>
                      <div className="image">
                        <img src={work.imageUrl} alt={`${work.title} image`} />
                        {/* begin image overlay */}
                        <div
                          className="image-overlay"
                          onClick={() =>
                            history.push(`/browse/work/${work.id}`)
                          }
                        >
                          <div className="browse-author-container">
                            <img
                              className="browse-avatar"
                              src={work.author.avatar}
                              alt="profile image"
                            />
                            <div className="browse-title-author">
                              <p className="browse-title">{work.title}</p>
                              <div className="flex flex-between w-100">
                                <p className="browse-author">
                                  {work.author.username}
                                </p>
                                <div className="flex">
                                  <div className="work-action">
                                    <Unicons.UilHeart size="12" />{' '}
                                    {work.favouriteCount}
                                  </div>
                                  <div className="work-action">
                                    <Unicons.UilComments size="12" />{' '}
                                    {work.commentCount}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end image overlay */}
                      </div>
                    </Fragment>
                  ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <Spinner height="50%" />
      )}
      {/* end user works */}
    </>
  );
}

export default Profile;
