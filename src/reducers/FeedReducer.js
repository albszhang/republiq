import {
  LOAD_NEWS,
  LOAD_POSTS,
  LOAD_SPECIFIC_POSTS,
  LOAD_HEADLINES,
  REFRESH_POSTS
} from '../actions/types';

const INITIAL_STATE = {
  post_feed: [],
  post_specific_feed: [],
  news_feed: [],
  headlines: []
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
    case LOAD_SPECIFIC_POSTS:
      return {
        ...state,
        post_specific_feed: [...state.post_specific_feed, action.payload]
      };
    case LOAD_HEADLINES:
      console.log('Reducer', action.payload);
      return {
        ...state,
        headlines: [...state.headlines, action.payload]
      };
    case REFRESH_POSTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
