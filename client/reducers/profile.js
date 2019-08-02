import {
  GET_PROFILE,
  GET_PROFILE_WORKS,
  GET_PROFILE_FAVOURITES,
  RELOAD_PROFILE,
} from '../actions/types';

const INITIAL_STATE = {
  profile: {},
  profileWorks: [],
  profileFavourites: [],
  profileLoaded: false,
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
        profileLoaded: true,
      };
    case GET_PROFILE_FAVOURITES:
      return {
        ...state,
        profileFavourites: payload,
      };
    case RELOAD_PROFILE:
      return {
        ...state,
        profileLoaded: false,
      };
    default:
      return state;
  }
}
