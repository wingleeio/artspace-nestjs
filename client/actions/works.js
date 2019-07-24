import axios from 'axios';
import { GET_WORKS_BY_NEWEST } from './types';

export const getNewWorks = (page, dispatch) => {
  axios
    .get(`/api/works/page/${page}`)
    .then(res => {
      dispatch({ type: GET_WORKS_BY_NEWEST, payload: res.data });
    })
    .catch(err => console.log(err));
};
