import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
//import * as firebase from 'firebase';
//import 'firebase/firestore';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import { Router } from './src/Router';

let firebaseAppDefined = false;

class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyA999J_iNxUGj5g97IYzeRPA-LV1VkBOWw',
      authDomain: 'republiq-3a89c.firebaseapp.com',
      databaseURL: 'https://republiq-3a89c.firebaseio.com',
      projectId: 'republiq-3a89c',
      storageBucket: 'republiq-3a89c.appspot.com',
      messagingSenderId: '63676145911'
    };
    firebase.initializeApp(config);
    console.log('INITIALIZED');
  }

  interval() {
    setInterval(() => {
      if (!firebaseAppDefined) {
        if (firebase.app()) {
          firebaseAppDefined = true;
        }
      }
    }, 100);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    this.interval();
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
