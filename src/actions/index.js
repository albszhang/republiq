import firebase from 'firebase';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  AUTH_USER_FAIL,
  POST_TEXT_CHANGED,
  POST_CREATED,
  POST_CLOSED,
  UPVOTE_PRESSED
} from './types';

//Authentication ---------

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: firebase.auth().currentUser });
      })
      .catch(() => authUserFail(dispatch));
  };
};

export const signupUser = ({ email, password, username }) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    //see https://stackoverflow.com/questions/38559457/firebase-v3-updateprofile-method
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName: username });
      })
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        console.log('test');
        firebase.firestore().collection('users').doc(currentUser.uid).set({
          uid: currentUser.uid,
          username
        });
      })
      .then(() => {
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: firebase.auth().currentUser });
      })
      .catch(() => authUserFail(dispatch));
  };
};

export const authUserFail = (dispatch) => {
  dispatch({ type: AUTH_USER_FAIL });
};


//Gettting basic user info  ---------


//Posting related-----

export const PostChanged = (text) => {
  return {
    type: POST_TEXT_CHANGED,
    payload: text
  };
};

export const PostCreate = ({ post, username }) => {
  return (dispatch) => {
    firebase.firestore().collection('posts').add({
      content: post,
      timestamp: (Math.floor(Date.now() / 1000)),
      location: 'Boston',
      author: username,
      upvotes: 1,
      downvotes: 0,
      fullscore: 1,
      nOfComments: 0,
      topic: 'Test Topic',
    }).then(dispatch({ type: POST_CREATED }));
  };
};

export const PostClose = () => {
  return {
    type: POST_CLOSED
  };
};

//Upvoting related---------

export const upvotePressed = () => {
  console.log(firebase.firestore().collection('posts').doc().id);

  return {
    type: UPVOTE_PRESSED
  };
};
