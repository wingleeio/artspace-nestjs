import {
  GET_WORKS_BY_NEWEST,
  GET_WORK,
  GET_PROFILE_WORKS,
  ADD_COMMENT,
  LIKE_UNLIKE_WORK,
  DELETE_COMMENT,
  GET_WORKS_BY_FOLLOWING,
  SHOW_FOLLOWING,
  SHOW_LATEST,
} from '../actions/types';

const INITIAL_STATE = {
  work: null,
  newWorks: [],
  followingWorks: [],
  profileWorks: [],
  newWorksCount: 0,
  followingWorksCount: 0,
  showFollowing: true,
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_WORKS_BY_NEWEST:
      return {
        ...state,
        newWorks: payload.works,
        newWorksCount: payload.count,
      };
    case GET_WORKS_BY_FOLLOWING:
      return {
        ...state,
        followingWorks: payload.works,
        followingWorksCount: payload.count,
      };
    case GET_PROFILE_WORKS:
      return {
        ...state,
        profileWorks: payload,
      };
    case GET_WORK:
      return {
        ...state,
        work: payload,
      };
    case ADD_COMMENT:
      const work = state.work;
      work.commentCount = work.commentCount + 1;
      work.comments = [...work.comments, payload];
      return {
        ...state,
        work,
      };
    case SHOW_FOLLOWING:
      return {
        ...state,
        showFollowing: true,
      };
    case SHOW_LATEST:
      return {
        ...state,
        showFollowing: false,
      };
    case LIKE_UNLIKE_WORK:
      const workToLikeOrUnlike = state.work;
      const userHasFavourite = workToLikeOrUnlike.favouritedBy.find(
        user => payload.id === user.id,
      );
      if (userHasFavourite) {
        workToLikeOrUnlike.favouritedBy = [
          ...workToLikeOrUnlike.favouritedBy.filter(
            user => user.id !== payload.id,
          ),
        ];
        workToLikeOrUnlike.favouriteCount =
          workToLikeOrUnlike.favouriteCount - 1;
      } else {
        workToLikeOrUnlike.favouritedBy = [
          ...workToLikeOrUnlike.favouritedBy,
          payload,
        ];
        workToLikeOrUnlike.favouriteCount =
          workToLikeOrUnlike.favouriteCount + 1;
      }

      return {
        ...state,
        work: workToLikeOrUnlike,
      };
    case DELETE_COMMENT:
      const workToDeleteComment = state.work;
      const comments = workToDeleteComment.comments.filter(
        comment => comment.id !== payload,
      );
      workToDeleteComment.comments = comments;
      return {
        ...state,
        work: workToDeleteComment,
      };
    default:
      return state;
  }
}
