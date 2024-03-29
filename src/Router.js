import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import firebase from 'firebase';
import { connect } from 'react-redux';

import {
  NotifScreen,
} from './screens';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import LogInScreen from './screens/LogInScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { isAuthenticated, notAuthenticated } from './actions';

const AuthStack = createStackNavigator(
  {
    //property shorthand, originally SignInScreen: SignInScreen, or AuthScreen: SignInScreen
    OnboardingScreen,
    SignInScreen,
    LogInScreen

  },
  {
    headerMode: 'none',
  }
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    News: NewsScreen,
    //Settings: SettingsScreen
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

    // Notif: {
    //   screen: NotifScreen
    // },
    // Manager: {
    //   screen: ManagerScreen
    // },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          if (tintColor === 'tomato') {
            return (
              <Image
                style={{ width: 24.64, height: 26.4 }}
                source={require('./img/bottomTab/homeActive.png')}
              />
            );
          } else if (tintColor === 'gray') {
            return (
              <Image
                style={{ width: 24.64, height: 26.4 }}
                source={require('./img/bottomTab/homeInactive.png')}
              />
            );
          }
        } else if (routeName === 'Profile') {
          if (tintColor === 'tomato') {
            return (
              <Image
                style={{ width: 28.6, height: 28.6 }}
                source={require('./img/bottomTab/profileActive.png')}
              />
            );
          } else if (tintColor === 'gray') {
            return (
              <Image
                style={{ width: 28.6, height: 28.6 }}
                source={require('./img/bottomTab/profileInactive.png')}
              />
            );
          }
        } else if (routeName === 'Notif') {
          if (tintColor === 'tomato') {
            return (
              <Image
                style={{ width: 25.14, height: 26.4
                 }}
                source={require('./img/bottomTab/notifsActive.png')}
              />
            );
          } else if (tintColor === 'gray') {
            return (
              <Image
                style={{ width: 25.14, height: 26.4 }}
                source={require('./img/bottomTab/notifsInactive.png')}
              />
            );
          }
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false
    }
  }
);

let firebaseAppDefined = false;
class AuthLoading extends Component {

   checkAuthentication() {
     firebase.auth().onAuthStateChanged((user) => {
           if (user) {
             this.props.isAuthenticated(user);
             console.log('checkAuthentication: TRUE AUTH');
           } else {
             this.props.notAuthenticated();
             console.log('checkAuthentication: FALSE AUTH');
           }
     });
   }

   interval() {
     setInterval(() => {
       if (!firebaseAppDefined) {
         if (firebase.app()) {
           firebase.auth().onAuthStateChanged((user) => {
             this.checkAuthentication();
             console.log('TESTING FOR PROPS', this.props.authenticated);
             console.log('AFTER LOGIN');
              //this.props.navigation.navigate(this.state.authed ? 'App' : 'Auth');
                 if (user) {
                   console.log('(IF) USER EXISTS -> APP?');
                  // this.checkAuthentication();
                   //this.setState({ authed: true })
                   console.log('(Exists)The props is', this.props.auth);
                   this.props.navigation.navigate(user ? 'App' : 'Auth');
                   console.log(user);
                 } else {
                   console.log('(IF) NO USER -> AUTH?');
                //   this.checkAuthentication();
                  // this.setState({ authed: false });
                   //this.props.navigation.navigate(this.props.authed ? 'App' : 'Auth');
                   console.log('(Null)The props is', this.props.auth);
                   this.props.navigation.navigate(user ? 'App' : 'Auth');
                 }
           });
           firebaseAppDefined = true;
         }
       }
     }, 100);
   }

  render() {
    this.interval();
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text> Loading! </Text>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('router:', state.auth.authenticated);
  return {
    auth: state.auth.authenticated
  };
};

const AuthLoadingScreen = connect(mapStateToProps, {
  isAuthenticated, notAuthenticated
})(AuthLoading);

export const Router =
  createAppContainer(createSwitchNavigator(
    {
      Loading: AuthLoadingScreen,
      App: AppStackNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
      //initialRouteName: auth ? 'App' : 'Auth'
    }
  ));
