import {
  SORT_METHOD_SELECTED
} from '../actions/types.js'

const INITIAL_STATE = {
  sortMethod: 'TOP',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SORT_METHOD_SELECTED: {
      return { ...state, sortMethod: action.payload };
    }
    default:
      return state;
  }
};
