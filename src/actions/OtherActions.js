import firebase from 'firebase';
//import * as firebase from 'firebase';
import 'firebase/firestore';

import {
  POST_TEXT_CHANGED,

  POST_CREATED,
  HEADLINE_SELECTED,
  POST_CLOSED,
  ALL_COLOR_CHANGED,
  SOME_COLOR_CHANGED,
  DEFAULT_COLOR,

  UPVOTE_PRESSED,
  DOWNVOTE_PRESSED,

  LOAD_PROFILE_AGE,
  REFRESH_PROF_POSTS,

  UPDATE_COMMENTS,

  //for the sorting modal in ordering the posts (by upvotes or by timestamp)
  SORT_METHOD_SELECTED,

  LAST_UPDATED,
} from './types';

//checking if things are isInitialized
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


//Gettting basic user info  ---------

export const LoadProfileAge = () => {
  return (dispatch) => {
    pluralProfileCheck = (s) => {
      if (s === 1) {
        return ' old';
      }
      return 's old';
    };

    timeProfileConverter = (timestamp) => {
      //const a = new Date(timestamp * 1000);
      const seconds = Math.floor((new Date() - timestamp) / 1000);

      let interval = Math.floor(seconds / 31536000);

      if (interval >= 1) {
        return `${interval} year${this.pluralProfileCheck(interval)}`;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return `${interval} month${this.pluralProfileCheck(interval)}`;
      }
      // ----IF YOU WANT WEEKS----
      // interval = Math.floor(seconds / 604800);
      // if (interval >= 1) {
      //   return `${interval} week${this.pluralCheck(interval)}`;
      // }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return `${interval} day${this.pluralProfileCheck(interval)}`;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return `${interval} hour${this.pluralProfileCheck(interval)}`;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return `${interval} minute${this.pluralProfileCheck(interval)}`;
      }
      return `${Math.floor(seconds)} second${this.pluralProfileCheck(interval)}`;
    };

    const that = this;
    const currentUser = firebase.auth().currentUser;
    const postDoc = firebase.firestore().collection('users').doc(`${currentUser.uid}`);
    postDoc.get().then((doc) => {
      if (doc.exists) {
        dispatch({
          type: LOAD_PROFILE_AGE,
          payload: that.timeProfileConverter(doc.data().originDate)
        });
      }
    });
  };
};

export const RefreshProfilePosts = () => {
  return (dispatch) => {
    dispatch({
      type: REFRESH_PROF_POSTS
    });
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
  const news = firebase.firestore().collection('currentHeadlines');
  let nOfComments = 0;
  news.doc(`${selectedHeadline}`).get()
    .then((doc) => {
      if (doc.exists) {
        nOfComments = doc.data().nOfComments;
        console.log('what is nOfComments', nOfComments);
      }
    });
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
      current: true
    })
    .then((docRef) => {
        posts.doc(`${docRef.id}`).collection('scoreStatus').doc(`${currentUser.uid}`).set({
          uid: currentUser.uid,
          upvoted: true,
          downvoted: false
      })
      .catch((console.log('something went wrong')));
    })
    .then(() => {
      if (nOfComments !== 0) {
          news.doc(`${selectedHeadline}`).update({ nOfComments: parseInt(nOfComments, 10) + 1 });
      }
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

export const DefaultColor = () => {
  return {
    type: DEFAULT_COLOR
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

//----STICK THIS SOMEWHERE LIKE ON THE WEBSITE
export const UpdateComments = ({ nOfComments, title }) => {
  const news = firebase.firestore().collection('currentHeadlines');
  return (dispatch) => {
    news.doc(`${title}`).update({ nOfComments })
    .then(dispatch({ type: UPDATE_COMMENTS }));
  };
};

export const SortMethodSelected = (sortMethod) => {
  return {
    type: SORT_METHOD_SELECTED,
    payload: sortMethod
  };
};

export const LastUpdated = () => {
  return (dispatch) => {
    firebase.firestore().collection('miscData').doc('lastUpdated')
    .get()
    .then((doc) => {
      if (doc.exists) {
        dispatch({
          type: LAST_UPDATED,
          payload: this.timeConverter(doc.data().time)
        });
      }
    });
  };
};
