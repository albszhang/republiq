import {
  LOAD_POSTS,
  REFRESH_POSTS
} from '../actions/types';

const INITIAL_STATE = {
  post_feed: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH_POSTS:
      return INITIAL_STATE;
    case LOAD_POSTS:
      return {
        ...state,
        post_feed: [...state.post_feed, action.payload]
      };
    default:
      return state;
  }
};
