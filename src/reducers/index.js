import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import FeedReducer from './FeedReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import SortReducer from './SortReducer';

export default combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  feed: FeedReducer,
  profile: ProfileReducer,
  sort: SortReducer
});
