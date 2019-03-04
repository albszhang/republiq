import React, { Component } from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import { connect } from 'react-redux';

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

export const Router =
  createAppContainer(createSwitchNavigator(
    {
      App: AppStackNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: 'App'
      //initialRouteName: auth ? 'App' : 'Auth'
    }
  ));
