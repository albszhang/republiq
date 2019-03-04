import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
//import * as firebase from 'firebase';
//import 'firebase/firestore';
import ReduxThunk from 'redux-thunk';

import { isAuthenticated, notAuthenticated, isInitialized } from './src/actions';
import reducers from './src/reducers';
import { Router } from './src/Router';
import LoadingScreen from './src/screens/LoadingScreen';

let firebaseAppDefined = false;

class CheckApp extends Component {
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
    //this.checkAuthentication();
    console.log('INITIALIZED');
  }

  // componentDidUpdate() {
  //   this.checkAuthentication();
  // }

  interval() {
    setInterval(() => {
      if (!firebaseAppDefined) {
        if (firebase.app()) {
          firebaseAppDefined = true;
        }
      }
    }, 100);
  }
  //
  // checkAuthentication() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //         if (user) {
  //           this.props.isAuthenticated(user);
  //           //console.log(user);
  //         } else {
  //           this.props.notAuthenticated();
  //           //console.log('not signed in');
  //         }
  //   });
  // }

  render() {
    this.interval();
    // return firebaseAppDefined ? <Router auth={this.props.authenticated} /> :
    //   <LoadingScreen />;
    return <Router authenticated={this.props.authenticated} />;
  }
}

const mapStateToProps = (state) => {
  console.log('app.js state of auth ->', state.auth.authenticated);
  return {
    initialized: state.auth.initialized,
    authenticated: state.auth.authenticated
  };
};

const ConnectedApp =
  connect(mapStateToProps, {
    isInitialized, isAuthenticated, notAuthenticated
  })(CheckApp);

const App = () => {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
};

export default App;
