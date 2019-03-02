import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  AUTH_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  username: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  //console.log(action);

  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case AUTH_USER_FAIL:
      return { ...state, error: 'Authentication Failed', password: '' };
    default:
      return state;
  }
};