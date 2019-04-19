import firebase from 'firebase';
import 'firebase/firestore';

import {
  LOAD_POSTS,
  LOAD_ARTICLES,
  //LOAD_POST_VOTED,
  LOAD_PROFILE_POSTS,
  LOAD_SPECIFIC_POSTS,
  LOAD_NEWS,
  LOAD_HEADLINES,
  REFRESH_POSTS,
  REFRESH_NEWS_POSTS,
} from './types.js';

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

export const LoadNewestPosts = () => {
  return (dispatch) => {
    //getting data
    firebase.firestore().collection('posts')
      .where('current', '==', true)
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
            } else {
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

                  upvoted: false,
                  downvoted: false
                }
              });
            }
          });
        }
      });
    });
  };
};

export const LoadTopPosts = () => {
  return (dispatch) => {
    //getting data
    firebase.firestore().collection('posts')
      .where('current', '==', true)
      .orderBy('upvotes', 'desc')
      .get()
      .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          // console.log(doc.data());
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
            } else {
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

                  upvoted: false,
                  downvoted: false
                }
              });
            }
          });
        }
      });
    });
  };
};

export const LoadArticles = (headline) => {
  return (dispatch) => {
    firebase.firestore().collection('currentHeadlines')
    .doc(`${headline}`).collection('articles')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          const postObj = doc.data();
          dispatch({
            type: LOAD_ARTICLES,
            payload: {
              headline: postObj.headline,
              imgurl: postObj.imgurl,
              time: this.timeConverter(postObj.time),
              url: postObj.url
            }
          });
        }
      });
    });
  };
};

//Quick note: this is the exact same function as LoadPosts, except that it
//uses the firebase queries that sorts for a specific users.
export const LoadProfilePosts = (uid) => {
  return (dispatch) => {

    const currentUser = firebase.auth().currentUser;
    //getting data
    firebase.firestore().collection('posts')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .get()
      .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          const postObj = doc.data();

          //Getting upvoted/downvoted status
          const documentId = doc.id;
          const postDoc =
            firebase.firestore().collection('posts').doc(`${documentId}`).collection('scoreStatus')
            .doc(`${currentUser.uid}`);
          postDoc.get().then((doc2) => {
            if (doc2.exists) {
              dispatch({
                type: LOAD_PROFILE_POSTS,
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
            } else {
              dispatch({
                type: LOAD_PROFILE_POSTS,
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

                  upvoted: false,
                  downvoted: false
                }
              });
            }
          });
        }
      });
    });
  };
};

//Quick note: this is the exact same function as LoadPosts, except that it
//uses the firebase queries that sorts for a specific headline.
export const LoadNewestSpecificPosts = (headline) => {
  return (dispatch) => {
    //getting data
    firebase.firestore().collection('posts')
      .where('topic', '==', headline)
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
                  ranking: postObj.ranking,

                  upvoted: doc2.data().upvoted,
                  downvoted: doc2.data().downvoted
                }
              });
            } else {
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
                  ranking: postObj.ranking,

                  upvoted: false,
                  downvoted: false
                }
              });
            }
          });
        }
      });
    });
  };
};
//Quick note: this is the exact same function as LoadPosts, except that it
//uses the firebase queries that sorts for a specific headline.
export const LoadTopSpecificPosts = (headline) => {
  return (dispatch) => {
    //getting data
    firebase.firestore().collection('posts')
      .where('topic', '==', headline)
      .orderBy('upvotes', 'desc')
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
                  ranking: postObj.ranking,

                  upvoted: doc2.data().upvoted,
                  downvoted: doc2.data().downvoted
                }
              });
            } else {
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
                  ranking: postObj.ranking,

                  upvoted: false,
                  downvoted: false
                }
              });
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
          //console.log('NEWS DATA', doc.data());
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

export const RefreshPosts = () => {
  return {
    type: REFRESH_POSTS,
  };
};

export const RefreshNewsPosts = () => {
  return {
    type: REFRESH_NEWS_POSTS
  };
};
