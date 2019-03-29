import firebase from 'firebase';
//import * as firebase from 'firebase';
import 'firebase/firestore';

import {
  IS_INITIALIZED,
  NOT_INITIALIZED,
  IS_AUTHENTICATED,
  NOT_AUTHENTICATED,

  POST_TEXT_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USERNAME_CHANGED,

  LOGIN_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  AUTH_USER_FAIL,


  POST_CREATED,
  HEADLINE_SELECTED,
  POST_CLOSED,
  ALL_COLOR_CHANGED,
  SOME_COLOR_CHANGED,

  UPVOTE_PRESSED,
  DOWNVOTE_PRESSED,

  LOAD_POSTS,
  LOAD_POST_VOTED,
  LOAD_SPECIFIC_POSTS,
  LOAD_NEWS,
  LOAD_HEADLINES,
  REFRESH_POSTS
} from './types';

//checking if things are isInitialized

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

export const signupUser = ({ email, password, username, navigation }) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    //see https://stackoverflow.com/questions/38559457/firebase-v3-updateprofile-method
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({ displayName: username });
      })
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        //console.log('test');
        firebase.firestore().collection('users').doc(currentUser.uid).set({
          uid: currentUser.uid,
          username,
          originDate: Date.now()
        });
      })
      .then(() => {
        navigation.navigate('App');
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
export const LoadNews = () => {
 return (dispatch) => {
   firebase.firestore().collection('currentHeadlines')
    .orderBy('ranking', 'asc')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          //console.log('NEWS DATA', doc.data());
          const postObj = doc.data();
          dispatch({
            type: LOAD_NEWS,
            payload: {
              title: postObj.title,
              ranking: postObj.ranking,
              heat: postObj.heat,
              nOfArticles: postObj.nOfArticles,
              nOfComments: postObj.nOfComments
            }
          });
        }
      });
   });
 };
};

export const LoadHeadlines = () => {
 return (dispatch) => {
   firebase.firestore().collection('currentHeadlines')
    .orderBy('ranking', 'asc')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          console.log('NEWS DATA', doc.data());
          const postObj = doc.data();
          dispatch({
            type: LOAD_HEADLINES,
            payload: postObj.title
          });
        }
      });
   });
 };
};

export const LoadPosts = () => {
  return (dispatch) => {
    pluralCheck = (s) => {
      if (s === 1) {
        return ' ago';
      }
      return 's ago';
    };

    timeConverter = (timestamp) => {
      const a = new Date(timestamp * 1000);
      const seconds = Math.floor((new Date() - a) / 1000);

      let interval = Math.floor(seconds / 31536000);

      if (interval >= 1) {
        return `${interval} year${this.pluralCheck(interval)}`;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return `${interval} month${this.pluralCheck(interval)}`;
      }
      // ----IF YOU WANT WEEKS----
      // interval = Math.floor(seconds / 604800);
      // if (interval >= 1) {
      //   return `${interval} week${this.pluralCheck(interval)}`;
      // }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return `${interval} day${this.pluralCheck(interval)}`;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return `${interval} hr${this.pluralCheck(interval)}`;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return `${interval} min${this.pluralCheck(interval)}`;
      }
      return `${Math.floor(seconds)} second${this.pluralCheck(interval)}`;
    };

    const that = this;

    //getting data
    firebase.firestore().collection('posts')
      .orderBy('timestamp', 'desc')
      .get()
      .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          const postObj = doc.data();

          //Getting upvoted/downvoted status
          const documentId = doc.id;
          const currentUser = firebase.auth().currentUser;
          const postDoc =
            firebase.firestore().collection('posts').doc(`${documentId}`).collection('scoreStatus')
            .doc(`${currentUser.uid}`);
          postDoc.get().then((doc2) => {
            if (doc2.exists) {
              dispatch({
                type: LOAD_POSTS,
                payload: {
                  documentId: doc.id,
                  id: postObj.id,
                  content: postObj.content,
                  timestamp: that.timeConverter(postObj.timestamp),
                  location: postObj.location,
                  author: postObj.author,
                  upvotes: postObj.upvotes,
                  downvotes: postObj.downvotes,
                  fullscore: postObj.upvotes - postObj.downvotes,
                  nOfComments: postObj.nOfComments,
                  topic: postObj.topic,
                  ranking: postObj.ranking,

                  upvoted: doc2.data().upvoted,
                  downvoted: doc2.data().downvoted
                }
              });
            }
          });
          //const postFeed = that.state.post_feed;
          // dispatch({
          //   type: LOAD_POSTS,
          //   payload: {
          //     documentId: doc.id,
          //     id: postObj.id,
          //     content: postObj.content,
          //     timestamp: that.timeConverter(postObj.timestamp),
          //     location: postObj.location,
          //     author: postObj.author,
          //     upvotes: postObj.upvotes,
          //     downvotes: postObj.downvotes,
          //     fullscore: postObj.upvotes - postObj.downvotes,
          //     nOfComments: postObj.nOfComments,
          //     topic: postObj.topic,
          //     ranking: postObj.ranking
          //   }
          // });
        }
      });
    });

    // firebase.firestore().collection('posts')
    //   .orderBy('timestamp', 'desc')
    //   .get()
    //   .then((snapshot) => {
    //   snapshot.docs.forEach(doc => {
    //     if (doc.exists) {
    //       console.log('TEST FOR UPVTED', doc.data());
    //
    //       const postObj = doc.data();
    //       //const postFeed = that.state.post_feed;
    //       dispatch({
    //         type: LOAD_POSTS,
    //         payload: {
    //           documentId: doc.id,
    //           id: postObj.id,
    //           content: postObj.content,
    //           timestamp: that.timeConverter(postObj.timestamp),
    //           location: postObj.location,
    //           author: postObj.author,
    //           upvotes: postObj.upvotes,
    //           downvotes: postObj.downvotes,
    //           fullscore: postObj.upvotes - postObj.downvotes,
    //           nOfComments: postObj.nOfComments,
    //           topic: postObj.topic,
    //           ranking: postObj.ranking
    //         }
    //       });
    //     }
    //   });
    // });
  };
};

//Quick note: this is the exact same function as LoadPosts, except that it
//uses the firebase queries that sorts for a specific headline.
export const LoadSpecificPosts = (headline) => {
  return (dispatch) => {
    pluralCheck = (s) => {
      if (s === 1) {
        return ' ago';
      }
      return 's ago';
    };

    timeConverter = (timestamp) => {
      const a = new Date(timestamp * 1000);
      const seconds = Math.floor((new Date() - a) / 1000);

      let interval = Math.floor(seconds / 31536000);

      if (interval >= 1) {
        return `${interval} year${this.pluralCheck(interval)}`;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return `${interval} month${this.pluralCheck(interval)}`;
      }
      // ----IF YOU WANT WEEKS----
      // interval = Math.floor(seconds / 604800);
      // if (interval >= 1) {
      //   return `${interval} week${this.pluralCheck(interval)}`;
      // }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return `${interval} day${this.pluralCheck(interval)}`;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return `${interval} hr${this.pluralCheck(interval)}`;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return `${interval} min${this.pluralCheck(interval)}`;
      }
      return `${Math.floor(seconds)} second${this.pluralCheck(interval)}`;
    };

    const that = this;

    //getting data
    firebase.firestore().collection('posts')
      .where('topic', '==', headline)
      .orderBy('timestamp', 'desc')
      .get()
      .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          const postObj = doc.data();
          dispatch({
            type: LOAD_SPECIFIC_POSTS,
            payload: {
              documentId: doc.id,
              id: postObj.id,
              content: postObj.content,
              timestamp: that.timeConverter(postObj.timestamp),
              location: postObj.location,
              author: postObj.author,
              upvotes: postObj.upvotes,
              downvotes: postObj.downvotes,
              fullscore: postObj.upvotes - postObj.downvotes,
              nOfComments: postObj.nOfComments,
              topic: postObj.topic,
              ranking: postObj.ranking
            }
          });
        }
      });
    });
  };
};

export const RefreshPosts = () => {
  return {
    type: REFRESH_POSTS,
  };
};

//Posting related-----

export const PostChanged = (text) => {
  return {
    type: POST_TEXT_CHANGED,
    payload: text
  };
};

export const PostCreate = ({ post, username, selectedHeadline }) => {
  const uuid = require('uuid');
  //console.log('testing for headlineSelect', selectedHeadline);
  const posts = firebase.firestore().collection('posts');
  const currentUser = firebase.auth().currentUser;
  return (dispatch) => {
    posts.add({
      id: uuid(),
      content: post,
      timestamp: (Math.floor(Date.now() / 1000)),
      location: 'Yandhi',
      author: username,
      uid: currentUser.uid,
      upvotes: 1,
      downvotes: 0,
      nOfComments: 0,
      topic: selectedHeadline,
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

export const PostHeadlineSelected = (headlineValue) => {
  return {
    type: HEADLINE_SELECTED,
    payload: headlineValue
  };
};

export const PostClose = () => {
  return {
    type: POST_CLOSED
  };
};

export const AllColorChange = () => {
  return {
    type: ALL_COLOR_CHANGED
  };
};

export const SomeColorChange = () => {
  return {
    type: SOME_COLOR_CHANGED
  };
};

//Voting related---------
//export const upvotePressedTF = ({ documentId, upvotes }) => {
export const upvotePressedTF = ({ documentId, stateUpvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes: stateUpvotes
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

export const upvotePressedFF = ({ documentId, stateUpvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes: stateUpvotes + 1
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

export const upvotePressedFT = ({ documentId, stateUpvotes, stateDownvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes: stateUpvotes + 1,
      downvotes: stateDownvotes
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

export const downvotePressedTF = ({ documentId, stateUpvotes, stateDownvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      upvotes: stateUpvotes,
      downvotes: stateDownvotes + 1
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

export const downvotePressedFF = ({ documentId, stateDownvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      downvotes: stateDownvotes + 1
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

export const downvotePressedFT = ({ documentId, stateDownvotes }) => {
  const currentUser = firebase.auth().currentUser;
  const postDoc = firebase.firestore().collection('posts').doc(`${documentId}`);

  return (dispatch) => {
    postDoc.update({
      downvotes: stateDownvotes
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
