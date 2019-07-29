import React from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../../hooks/useForm';
import axios from 'axios';

function EditProfile({ history }) {
  const { user, token } = useSelector(state => ({ ...state.user }));
  const [values, handleChange, changeValue] = useForm({
    avatar: user.avatar,
    cover: user.cover,
    bio: user.bio,
  });

  const uploadImage = (e, type) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const formData = new FormData();
    formData.append('upload', e.target.files[0]);

    axios
      .post('/api/image/upload', formData, config)
      .then(res => changeValue(type, res.data))
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .put(`/api/users/update/${user.username}`, values, config)
      .then(res => history.push(`/profile/${user.username}`))
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <form
        className="form"
        style={{ paddingTop: '24px' }}
        onSubmit={handleSubmit}
      >
        <div className="control">
          <textarea
            type="text"
            name="bio"
            placeholder="Describe yourself"
            value={values.bio}
            onChange={handleChange}
            style={{ minHeight: '200px' }}
          />
        </div>
        <div className="control" style={{ paddingBottom: '24px' }}>
          <label htmlFor="avatar_upload" style={{ paddingBottom: '12px' }}>
            Avatar:
          </label>
          <input
            type="file"
            name="avatar_upload"
            onChange={e => {
              e.persist();
              uploadImage(e, 'avatar');
            }}
          />
          <img
            src={values.avatar}
            style={{ width: '64px', height: '64px', objectFit: 'cover' }}
          />
        </div>

        <div className="control" style={{ paddingBottom: '24px' }}>
          <label htmlFor="cover_upload" style={{ paddingBottom: '12px' }}>
            Cover Photo:
          </label>
          <input
            type="file"
            name="cover_upload"
            onChange={e => {
              e.persist();
              uploadImage(e, 'cover');
            }}
          />
          <img
            src={values.cover}
            style={{ width: '100%', height: '250px', objectFit: 'cover' }}
          />
        </div>
        <div
          className="control"
          style={{ opacity: '0', position: 'fixed', zIndex: '-10' }}
        >
          <input
            type="text"
            name="avatar"
            values={values.avatar}
            onChange={handleChange}
          />
        </div>
        <div
          className="control"
          style={{ opacity: '0', position: 'fixed', zIndex: '-10' }}
        >
          <input
            type="text"
            name="cover"
            values={values.cover}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary-outline register"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
