import { combineReducers } from 'redux';
import PostReducer from './PostReducer';
import ListReducer from './ListReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  post: PostReducer,
  list: ListReducer
});
