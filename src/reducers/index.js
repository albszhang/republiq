import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import FeedReducer from './FeedReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  feed: FeedReducer
});
