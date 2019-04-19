import {
  LOAD_NEWS,
  LOAD_ARTICLES,
  LOAD_POSTS,
  LOAD_POST_VOTED,
  LOAD_SPECIFIC_POSTS,
  LOAD_HEADLINES,
  REFRESH_POSTS,
  REFRESH_NEWS_POSTS,

  UPDATE_COMMENTS
} from '../actions/types';

const INITIAL_STATE = {
  post_feed: [],
  post_vote_info: [],
  post_specific_feed: [],
  news_feed: [],
  headlines: [],
  articles: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_NEWS:
      return {
        ...state,
        news_feed: [...state.news_feed, action.payload]
      };
    case LOAD_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, action.payload]
      };
    case LOAD_POSTS:
      return {
        ...state,
        post_feed: [...state.post_feed, action.payload]
      };
    case LOAD_POST_VOTED:
      return {
        ...state,
        post_vote_info: [...state.post_vote_info, action.payload]
      };
    case LOAD_SPECIFIC_POSTS:
      return {
        ...state,
        post_specific_feed: [...state.post_specific_feed, action.payload]
      };
    case LOAD_HEADLINES:
      return {
        ...state,
        headlines: [...state.headlines, action.payload]
      };
    case UPDATE_COMMENTS:
      return state;
    case REFRESH_POSTS:
      return INITIAL_STATE;
    case REFRESH_NEWS_POSTS:
      return {
        ...state, post_specific_feed: [], articles: []
      };
    default:
      return state;
  }
};
