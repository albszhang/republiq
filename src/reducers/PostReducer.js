import {
  POST_TEXT_CHANGED,
  POST_CREATED,
  HEADLINE_SELECTED,
  POST_CLOSED,
  ALL_COLOR_CHANGED,
  SOME_COLOR_CHANGED
} from '../actions/types';

const INITAL_STATE = {
  PostText: '',
  selectedHeadline: 'Select a Headline',
  headlineSelected: false,

  //this is for the color of the headline selection text, and the post Button
  // as the style should change when the headlines are selected, and effectively
  // reset
  postColor: '#C9C9C9',

  fontSize: 16,
  fontFamily: 'Avenir-Book',
  color: '#C9C9C9',
 };

export default (state = INITAL_STATE, action) => {
  //console.log('seeing if headlineselected is false', state);
  switch (action.type) {
    case POST_TEXT_CHANGED:
      return { ...state, PostText: action.payload };
    case POST_CREATED:
      return { ...state, PostText: '' };
    case HEADLINE_SELECTED:
      return { ...state, selectedHeadline: action.payload, headlineSelected: true };
    case ALL_COLOR_CHANGED:
      return {
        ...state,
        postColor: '#FF5353',
        fontSize: 15,
        fontFamily: 'Avenir-Heavy',
        color: '#404040',
      };
    case SOME_COLOR_CHANGED:
      return {
        ...state,
        fontSize: 15,
        fontFamily: 'Avenir-Heavy',
        color: '#404040',
      };
    case POST_CLOSED:
      return INITAL_STATE;
    default:
      return state;
  }
};
