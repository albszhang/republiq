import {
  LOAD_PROFILE_AGE,
  LOAD_PROFILE_POSTS,
  REFRESH_PROF_POSTS
} from '../actions/types';

const INITIAL_STATE = {
  age: '',
  post_profile_feed: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PROFILE_AGE:
      return { ...state, age: action.payload };
    case LOAD_PROFILE_POSTS:
      return {
        ...state,
        post_profile_feed: [...state.post_profile_feed, action.payload]
      };
    case REFRESH_PROF_POSTS:
      return {
        ...state,
        post_profile_feed: []
      };
    default:
      return state;
  }
};
