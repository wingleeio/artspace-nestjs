import React from 'react';
import { useSelector } from 'react-redux';
import useForm from '../../../hooks/useForm';
import axios from 'axios';

function Submit({ history }) {
  const { token } = useSelector(state => ({ ...state.user }));
  const [values, handleChange, changeValue] = useForm({
    title: '',
    description: '',
    imageUrl: '',
  });

  const uploadImage = e => {
    e.persist();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const formData = new FormData();
    formData.append('upload', e.target.files[0]);

    axios
      .post('/api/image/upload', formData, config)
      .then(res => changeValue('imageUrl', res.data))
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    if (
      values.title.length > 0 &&
      values.description.length > 0 &&
      values.imageUrl.length > 0
    ) {
      axios
        .post('/api/works/create', values, config)
        .then(res => history.push('/'))
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container" style={{ padding: '0px 24px' }}>
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{ paddingTop: '24px' }}
      >
        <div className="control">
          <input
            type="text"
            name="title"
            placeholder="Name your work"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <textarea
            type="text"
            name="description"
            placeholder="Describe your work"
            values={values.description}
            onChange={handleChange}
            style={{ minHeight: '200px' }}
          />
        </div>
        <div className="control">
          <input type="file" name="imageupload" onChange={uploadImage} />
        </div>
        <div
          className="control"
          style={{ opacity: '0', position: 'fixed', zIndex: '-10' }}
        >
          <input
            type="text"
            name="imageUrl"
            values={values.imageUrl}
            onChange={handleChange}
          />
        </div>
        {values.imageUrl.length > 0 && (
          <img
            src={values.imageUrl}
            style={{ margin: '0 auto', objectFit: 'cover' }}
          />
        )}
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

export default Submit;
