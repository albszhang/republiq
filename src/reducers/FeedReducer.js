import {
  LOAD_NEWS,
  LOAD_POSTS,
  REFRESH_POSTS
} from '../actions/types';

const INITIAL_STATE = {
  post_feed: [],
  news_feed: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_NEWS:
      return {
        ...state,
        news_feed: [...state.news_feed, action.payload]
      };
    case LOAD_POSTS:
      return {
        ...state,
        post_feed: [...state.post_feed, action.payload]
      };
      case REFRESH_POSTS:
        return INITIAL_STATE;
    default:
      return state;
  }
};
