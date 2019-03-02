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

const AuthStack = createStackNavigator({
  Auth: SignInScreen
});

const AppStackNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },

    Profile: {
      screen: ProfileScreen
    },

    Notif: {
      screen: NotifScreen
    },
  }
);

const Router = createAppContainer(createSwitchNavigator(
  {
    App: AppStackNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth',
  }
));


export default Router;
