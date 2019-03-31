import {
  IS_INITIALIZED,
  NOT_INITIALIZED,
  IS_AUTHENTICATED,
  NOT_AUTHENTICATED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  AUTH_USER_FAIL,
  EMAIL_EXISTS_ERROR,
  USERNAME_EXISTS_ERROR,
  SIGNUP_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  initialized: false,
  authenticated: false,
  email: '',
  password: '',
  user: [],
  username: '',
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_INITIALIZED:
      return { ...state, initialized: true };
    case NOT_INITIALIZED:
      return { ...state, initialized: false };
    case IS_AUTHENTICATED:
      //console.log('ISAUNTHETICATED USER', action.payload);
      return { ...state, user: action.payload, authenticated: true };
    case NOT_AUTHENTICATED:
      return { ...state, authenticated: action.payload };
    case SIGNUP_USER_SUCCESS:
      return { ...state, user: action.payload, email: '', password: '', username: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, email: '', password: '', username: '' };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case AUTH_USER_FAIL:
      return { ...state, error: 'Sign In Error', password: '' };
    case EMAIL_EXISTS_ERROR:
      return {
        ...state,
        error: 'Sorry, this email already exists!',
        password: ''
      };
    case USERNAME_EXISTS_ERROR:
      return {
        ...state,
        error: 'Sorry, this username already exists!',
        password: ''
      };
    default:
      return state;
  }
};
