import firebase from 'firebase';
import 'firebase/firestore';

import {
  IS_INITIALIZED,
  NOT_INITIALIZED,
  IS_AUTHENTICATED,
  NOT_AUTHENTICATED,

  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,

  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  AUTH_USER_FAIL,
  EMPTY_INPUT,
  EMAIL_EXISTS_ERROR,
  USERNAME_EXISTS_ERROR,
  GET_USERNAMES
} from './types';

const rug = require('random-username-generator');
rug.setNames(['Guest']);
//rug.setAdjectives(['Guest']);
rug.setSeperator('');

export const isInitialized = () => {
  return {
    type: IS_INITIALIZED
  };
};

export const notInitialized = () => {
  return {
    type: NOT_INITIALIZED
  };
};

//Authentication ---------

export const isAuthenticated = (user) => {
  return {
    type: IS_AUTHENTICATED,
    payload: user
  };
};

export const notAuthenticated = () => {
  return {
    type: NOT_AUTHENTICATED,
    payload: false
  };
};

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

export const emptyInput = () => {
  return {
    type: EMPTY_INPUT
  };
};

export const loginUser = ({ email, password, navigation }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        //navigation.navigate('App');
        //console.log(firebase.auth().currentUser);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: firebase.auth().currentUser });
      })
      .catch(() => authUserFail(dispatch));
  };
};

//currently, "email" is actually the username reducer state, with the @email.com
//either concatenated on or not. It's not the actual value from typing in the email field.
//I did this to save time.
export const signupUser = ({ email, password, username, navigation }) => {
  return (dispatch) => {
    firebase.firestore().collection('users')
      .where('email', '==', email)
      .get()
      .then((snapshot) => {
        //-----------IS THERE A EMAIL ALREADY?-------
        if (snapshot.empty) {
          firebase.firestore().collection('users')
            .where('username', '==', username)
            .get()
            .then((snapshot2) => {
              //-----------IS THERE A USERNAME?-------
              if (snapshot2.empty) {
                //-----------SIGN IN USER-------
                firebase.auth().createUserWithEmailAndPassword(email, password)
                //see https://stackoverflow.com/questions/38559457/firebase-v3-updateprofile-method
                .then(() => {
                  const user = firebase.auth().currentUser;
                  user.updateProfile({ displayName: username });
                })
                .then(() => {
                  const currentUser = firebase.auth().currentUser;
                  firebase.firestore().collection('users').doc(currentUser.uid).set({
                    uid: currentUser.uid,
                    username,
                    email,
                    originDate: Date.now(),
                    guest: false
                  });
                })
                .then(() => {
                  navigation.navigate('App');
                  dispatch({ type: SIGNUP_USER_SUCCESS, payload: firebase.auth().currentUser });
                })
                .catch(() => authUserFail(dispatch));
              } else if (!snapshot2.empty) {
                dispatch({
                  type: USERNAME_EXISTS_ERROR
                });
              }
            });
        } else if (!snapshot.empty) {
          dispatch({
            type: EMAIL_EXISTS_ERROR
          });
        }
      })
    .catch(error => console.log('check emailusername error', error));
  };
};

export const authUserFail = (dispatch) => {
  dispatch({ type: AUTH_USER_FAIL });
};

//getting an array of all usernames, to check if it exists or not
export const getUsernames = () => {
  return (dispatch) => {
    let usernameData = [];
    firebase.firestore().collection('users')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          if (doc.exists) {
            usernameData.push(doc.data().email);
          }
        });
      });
    console.log('working?');
    dispatch({ type: GET_USERNAMES, payload: usernameData });
  };
};

export const guestCreation = ({ usernameData, navigation }) => {
  console.log('data received?', usernameData);
  return (dispatch) => {
    let username = 'xXninjaXx';
    let email = `${username}@email.com`;
    const password = 'password';
    while (usernameData.includes(email) && username.length < 13) {
      username = rug.generate();
      email = `${username}@email.com`;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName: username });
      })
      .then(() => {
        const user = firebase.auth().currentUser;
        firebase.firestore().collection('users').doc(user.uid).set({
          uid: user.uid,
          username,
          email,
          originDate: Date.now(),
          guest: true
        });
      })
      .then(() => {
        navigation.navigate('App');
        dispatch({ type: SIGNUP_USER_SUCCESS, payload: firebase.auth().currentUser });
      });
  };
};
