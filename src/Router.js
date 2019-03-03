import React, { Component } from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';

import {
  ProfileScreen,
  NotifScreen,
} from './screens';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import NewsScreen from './screens/NewsScreen';

const AuthStack = createStackNavigator({
  Auth: SignInScreen
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    News: NewsScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const AppStackNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },

    Profile: {
      screen: ProfileScreen
    },

    Notif: {
      screen: NotifScreen
    },
  }
);

// firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({ loading: false, authenticated: true });
//       } else {
//         this.setState({ loading: false, authenticated: false });
//       }
//     });

const Router = createAppContainer(createSwitchNavigator(
  {
    App: AppStackNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth',
  }
));


export default createAppContainer(Router);
