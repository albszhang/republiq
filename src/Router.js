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
  ProfileScreen,
  NotifScreen,
} from './screens';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import NewsScreen from './screens/NewsScreen';
import { isAuthenticated, notAuthenticated } from './actions';

const AuthStack = createStackNavigator({
  AuthScreen: SignInScreen
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
                style={{ width: 23.05, height: 24.2 }}
                source={require('./img/bottomTab/notifsActive.png')}
              />
            );
          } else if (tintColor === 'gray') {
            return (
              <Image
                style={{ width: 23.05, height: 24.2 }}
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
  // constructor() {
  //   super();
  //   this.state = {
  //     authed: false
  //   };
  // }
  // componentDidMount() {
  //    this.mounted = true;
  // }
  // componentWillUnmount() {
  //    this.mounted = false;
  //  }

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
             //this.checkAuthentication();
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
        <Text> Fucking loading </Text>
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
