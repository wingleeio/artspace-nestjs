import { GET_PROFILE, GET_PROFILE_WORKS } from '../actions/types';

const INITIAL_STATE = {
  profile: {},
  profileWorks: [],
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case GET_PROFILE_WORKS:
      return {
        ...state,
        profileWorks: payload,
      };
    default:
      return state;
  }
}
