import {
  POST_TEXT_CHANGED,
  POST_CREATED,
  HEADLINE_SELECTED,
  POST_CLOSED
} from '../actions/types';

const INITAL_STATE = {
  PostText: '',
  selectedHeadline: 'Select a Headline'
 };

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case POST_TEXT_CHANGED:
      return { ...state, PostText: action.payload };
    case POST_CREATED:
      return { ...state, PostText: '' };
    case HEADLINE_SELECTED:
      return { ...state, selectedHeadline: action.payload };
    case POST_CLOSED:
      return { ...state, PostText: '' };
    default:
      return state;
  }
};
