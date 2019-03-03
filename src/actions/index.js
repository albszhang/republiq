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
  UPVOTE_PRESSED,
  DOWNVOTE_PRESSED,
  LOAD_POSTS
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
          username,
          originDate: Date.now()
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

//Loading the homepage feed -----------
export const LoadPosts = () => {
  return {
    type: LOAD_POSTS

  };
};

//Posting related-----

export const PostChanged = (text) => {
  return {
    type: POST_TEXT_CHANGED,
    payload: text
  };
};

export const PostCreate = ({ post, username }) => {
  const uuid = require('uuid');
  const posts = firebase.firestore().collection('posts');
  const currentUser = firebase.auth().currentUser;
  return (dispatch) => {
    posts.add({
      id: uuid(),
      content: post,
      timestamp: (Math.floor(Date.now() / 1000)),
      location: 'Boston',
      author: username,
      uid: currentUser.uid,
      upvotes: 1,
      downvotes: 0,
      nOfComments: 0,
      topic: 'Test Topic',
    })
    .then((docRef) => {
        posts.doc(`${docRef.id}`).collection('scoreStatus').doc(`${currentUser.uid}`).set({
          uid: currentUser.uid,
          upvoted: true,
          downvoted: false
      })
      .catch((console.log('something went wrong')));
    })
    .then(dispatch({ type: POST_CREATED }));
  };
};

export const PostClose = () => {
  return {
    type: POST_CLOSED
  };
};

//Voting related---------

export const upvotePressedTF = ({ documentId, upvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes
    })
    .then(() => {
      postDoc.collection('scoreStatus').doc(`${currentUser.uid}`).set({
        uid: currentUser.uid,
        upvoted: false,
        downvoted: false
      });
    })
    .then(dispatch({ type: UPVOTE_PRESSED }));
  };
};

export const upvotePressedFF = ({ documentId, upvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes: upvotes + 1
    })
    .then(() => {
      postDoc.collection('scoreStatus').doc(`${currentUser.uid}`).set({
        uid: currentUser.uid,
        upvoted: true,
        downvoted: false
      });
    })
    .then(dispatch({ type: UPVOTE_PRESSED }));
  };
};

export const upvotePressedFT = ({ documentId, upvotes, downvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes: upvotes + 1,
      downvotes
    })
    .then(() => {
      postDoc.collection('scoreStatus').doc(`${currentUser.uid}`).set({
        uid: currentUser.uid,
        upvoted: true,
        downvoted: false
      });
    })
    .then(dispatch({ type: UPVOTE_PRESSED }));
  };
};

export const downvotePressedTF = ({ documentId, upvotes, downvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes,
      downvotes: downvotes + 1
    })
    .then(() => {
      postDoc.collection('scoreStatus').doc(`${currentUser.uid}`).set({
        uid: currentUser.uid,
        upvoted: false,
        downvoted: true
      });
    })
    .then(dispatch({ type: DOWNVOTE_PRESSED }));
  };
};

export const downvotePressedFF = ({ documentId, downvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      downvotes: downvotes + 1
    })
    .then(() => {
      postDoc.collection('scoreStatus').doc(`${currentUser.uid}`).set({
        uid: currentUser.uid,
        upvoted: false,
        downvoted: true
      });
    })
    .then(dispatch({ type: DOWNVOTE_PRESSED }));
  };
};

export const downvotePressedFT = ({ documentId, downvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      downvotes
    })
    .then(() => {
      postDoc.collection('scoreStatus').doc(`${currentUser.uid}`).set({
        uid: currentUser.uid,
        upvoted: false,
        downvoted: false
      });
    })
    .then(dispatch({ type: DOWNVOTE_PRESSED }));
  };
};
