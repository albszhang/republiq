var functions = require('firebase-functions');

var fetch = require('node-fetch');

// var serviceAccount = require('./serviceAccountKey.json');

var admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://republiq-3a89c.firebaseio.com"
// });

admin.initializeApp(functions.config().firebase);

// var messages = [];
// let body;

// //RETRIEVES THE HEADLINE TO BE DISPLAYED ON NOTIF
// admin.firestore().collection('currentHeadlines')
//   .where('ranking', '==', '1')
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       if (doc.exists) {
//         body = doc.data().title
//         console.log(body);
//       }
//     });
//     return;
//   }).catch();
//
//   admin.firestore().collection('users').get().then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         var expoPushToken = doc.data().expoPushToken;
//         if (expoPushToken) {
//           console.log(doc.data().username, expoPushToken)
//           // var wanted = items.filter( function(item){return (item.age==18);} );
//           messages = messages.filter(message => {
//             console.log('testing.to', message.to, expoPushToken)
//             return message.to !== expoPushToken
//           });
//           messages.push({
//             "to": expoPushToken,
//             "title": "Today's Hottest Headline 🔥🔥 ",
//             "body": `${body}`
//           });
//         }
//       });
//
//     return Promise.all(messages);
//
//   }).then((messages) => {
//     console.log(messages);
//     fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(messages)
//     })
//     return;
//   })
//   .catch((error)=>{error});

exports.sendPushNotifs_PostUpvoted = functions.firestore.document('posts/{postId}/scoreStatus/{userId}')
.onWrite((change, context) => {
  console.log('FIRSTGHIN', context.params);
  //let postId = context.params.postId;
})

exports.sendPushNotifs_HeadlinesUpdated = functions.firestore.document('miscData/lastUpdated')
.onWrite((change, context) => {
  var messages = [];
  let body;

  //RETRIEVES THE HEADLINE TO BE DISPLAYED ON NOTIF
  admin.firestore().collection('currentHeadlines')
    .where('ranking', '==', '1')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          body = doc.data().title
          console.log(body);
        }
      });
      return;
    }).catch();

  admin.firestore().collection('users').get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        var expoPushToken = doc.data().expoPushToken;
        if (expoPushToken) {
          console.log(doc.data().username, expoPushToken)
          // var wanted = items.filter( function(item){return (item.age==18);} );
          messages = messages.filter(message => {
            console.log('testing.to', message.to, expoPushToken)
            return message.to !== expoPushToken
          });
          messages.push({
            "to": expoPushToken,
            "title": "Today's Hottest Headline 🔥🔥 ",
            "body": `${body}`
          });
        }
      });

      return Promise.all(messages);

    }).then((messages) => {
      console.log(messages);
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messages)
      })
      return;
    })
    .catch((error)=>{error});
});
