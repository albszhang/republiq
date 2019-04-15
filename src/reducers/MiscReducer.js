import {
  LAST_UPDATED
} from '../actions/types';

const INITIAL_STATE = {
  updatedTime: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LAST_UPDATED:
      return { ...state, updatedTime: action.payload };
    default:
      return state;
  }
};
