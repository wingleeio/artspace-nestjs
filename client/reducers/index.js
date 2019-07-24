import { combineReducers } from 'redux';
import user from './user';
import works from './works';
import profile from './profile';

export default combineReducers({
  user,
  works,
  profile,
});
