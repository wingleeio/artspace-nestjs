import axios from 'axios';
import { GET_WORKS_BY_NEWEST, GET_WORKS_BY_FOLLOWING } from './types';

export const getNewWorks = (page, dispatch) => {
  axios
    .get(`/api/works/page/${page}`)
    .then(res => {
      dispatch({ type: GET_WORKS_BY_NEWEST, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const getFollowingWorks = (page, config, dispatch) => {
  axios
    .get(`/api/works/following/${page}`, config)
    .then(res => {
      dispatch({ type: GET_WORKS_BY_FOLLOWING, payload: res.data });
    })
    .catch(err => console.log(err));
};
