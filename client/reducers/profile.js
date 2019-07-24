import { GET_PROFILE } from '../actions/types';

const INITIAL_STATE = {
  profile: {},
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    default:
      return state;
  }
}
