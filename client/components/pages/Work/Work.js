import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  GET_WORK,
  GET_PROFILE_WORKS,
  LIKE_UNLIKE_WORK,
  DELETE_COMMENT,
} from '../../../actions/types';
import axios from 'axios';
import Spinner from '../../Spinner';
import moment from 'moment';
import * as Unicons from '@iconscout/react-unicons';
import Comment from './Comment';
import Modal from './Modal';

function Work({ match, history }) {
  const [visibility, setVisibility] = useState(false);
  const { user, work, profileWorks, isAuthenticated, token } = useSelector(
    state => ({
      ...state.works,
      ...state.user,
    }),
  );

  const dispatch = useDispatch();

  const checkUserHasFavourited = () => {
    const checkUserHasFavourited = work.favouritedBy.find(
      favouritedUser => favouritedUser.id === user.id,
    );
    if (checkUserHasFavourited) {
      return 'txt-is-dangerous';
    }
    return;
  };

  const likeUnlike = () => {
    if (isAuthenticated) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(`/api/works/likeunlike/${work.id}`, '', config)
        .then(res =>
          dispatch({
            type: LIKE_UNLIKE_WORK,
            payload: user,
          }),
        )
        .catch(err => console.log(err));
    }
  };

  const deleteWork = () => {
    if (isAuthenticated) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const confirm = prompt(
        'Please confirm you want to delete the image by typing confirm.',
      );
      if (confirm === 'confirm') {
        axios
          .delete(`/api/works/delete/${work.id}`, config)
          .then(res => history.push('/'))
          .catch(err => console.log(err));
      }
    }
  };

  const deleteComment = commentId => {
    if (isAuthenticated) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const confirm = prompt(
        'Please confirm you want to delete the comment by typing confirm.',
      );

      if (confirm === 'confirm') {
        axios
          .delete(`/api/comments/delete/${commentId}`, config)
          .then(res => {
            dispatch({
              type: DELETE_COMMENT,
              payload: commentId,
            });
          })
          .catch(err => console.log(err));
      }
    }
  };

  const getWork = () => {
    axios
      .get(`/api/works/${match.params.id}`)
      .then(res => {
        dispatch({
          type: GET_WORK,
          payload: res.data,
        });
        axios
          .get(`/api/users/${res.data.author.username}/works`)
          .then(res => {
            dispatch({
              type: GET_PROFILE_WORKS,
              payload: res.data,
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getWork();
  }, []);

  useEffect(() => {
    getWork();
    window.scrollTo(0, 0);
  }, [match.params.id]);

  if (work === null) {
    return <Spinner />;
  }

  const newProfileWorks = profileWorks.slice(0, 4);

  return (
    <>
      <div className="work-container">
        <div className="container-padding-both work-image">
          <img
            src={work.imageUrl}
            onClick={() => setVisibility(true)}
            // style={{ maxHeight: '25px', objectFit: 'cover' }}
          ></img>
        </div>
      </div>
      <Modal
        image={work}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      <div className="work-page-container">
        <div className="container-padding-both">
          <h3>{work.title}</h3>
          <div className="author-info">
            <img
              className="avatar"
              src={work.author.avatar}
              alt={`avatar of ${work.author.username}`}
            />
            <div className="author-info-text">
              <h4>{work.author.username}</h4>
              <small>{work.author.followersCount} Followers</small>
            </div>
          </div>

          <p>{work.description}</p>
          <small>
            Shared on {moment(work.published).format('MMMM Do YYYY, h:mm:ss a')}
          </small>
          <div className="work-actions">
            <div className="work-action">
              <Unicons.UilComments
                className="work-action-icon"
                onClick={() =>
                  document.getElementById('commentForm').scrollIntoView()
                }
              />{' '}
              {work.commentCount}
            </div>
            <div className="work-action">
              <Unicons.UilHeart
                onClick={likeUnlike}
                className={`${checkUserHasFavourited()} work-action-icon`}
              />{' '}
              {work.favouriteCount}
            </div>
            {isAuthenticated && user.id === work.author.id && (
              <div className="work-action">
                <Unicons.UilTrashAlt
                  onClick={deleteWork}
                  className={`work-action-icon`}
                />
              </div>
            )}

            {/* <div className="work-action">
              <Unicons.UilShareAlt className="work-action-icon" />
            </div> */}
          </div>
        </div>
        <div className="container-padding-both">
          {isAuthenticated && <Comment id={work.id} />}
        </div>
        <div className="container-padding-both">
          {work.comments.map(comment => (
            <div
              id={`comment${comment.id}`}
              className="comment"
              key={comment.id}
            >
              <div className="author-info">
                <img
                  className="avatar"
                  src={comment.author.avatar}
                  alt={`avatar of ${comment.author.username}`}
                />
                <div>
                  <div className="author-info-text">
                    <h4>{comment.author.username}</h4>
                    <small>
                      Commented on{' '}
                      {moment(comment.published).format(
                        'MMMM Do YYYY, h:mm:ss a',
                      )}
                    </small>
                  </div>
                  <p className="comment-content">
                    <small>{comment.content}</small>
                  </p>
                  {isAuthenticated && user.id === comment.author.id && (
                    <div
                      className="work-action"
                      style={{ paddingTop: '24px', marginLeft: '24px' }}
                    >
                      <Unicons.UilTrashAlt
                        size="16"
                        onClick={() => deleteComment(comment.id)}
                        className={`work-action-icon`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container-padding" style={{ paddingTop: '24px' }}>
          <h3>
            More by{' '}
            <a href="#" className="txt-is-primary">
              {work.author.username}
            </a>
          </h3>
          <div className="more-works-container">
            {newProfileWorks.map(work => {
              return (
                <div className="more-work" key={work.id}>
                  <img src={work.imageUrl} alt={`${work.title}`} />
                  {/* begin image overlay*/}
                  <div
                    className="image-overlay"
                    onClick={() => history.push(`/browse/work/${work.id}`)}
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
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Work;
