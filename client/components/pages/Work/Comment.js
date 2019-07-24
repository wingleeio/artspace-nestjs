import React, { useEffect } from 'React';
import useForm from '../../../hooks/useForm';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ADD_COMMENT } from '../../../actions/types';

function Comment({ id }) {
  const [values, handleChange] = useForm({ content: '' });
  const { token } = useSelector(state => ({
    ...state.user,
  }));
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (values.content.length > 0) {
      axios
        .post(`/api/comments/create/${id}`, values, config)
        .then(res => {
          dispatch({ type: ADD_COMMENT, payload: res.data });
          document.getElementById(`comment${res.data.id}`).scrollIntoView();
          document.getElementById('commentForm').reset();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form" id="commentForm">
      <div className="control">
        <textarea
          type="text"
          name="content"
          placeholder="Enter a comment here"
          values={values.content}
          onChange={handleChange}
        />
      </div>
      <div className="button-group">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ width: '100%' }}
        >
          Comment
        </button>
      </div>
    </form>
  );
}

export default Comment;
