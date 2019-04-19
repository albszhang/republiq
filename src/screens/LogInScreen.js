import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import {
  emailChanged, passwordChanged, usernameChanged, loginUser, signupUser, emptyInput
} from '../actions';
import LoginForm from '../components/LoginForm';

class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Sign In'
  };

  componentDidUpdate() {
    //console.log('component updated');
    if (this.props.user) {
      console.log('there exists a user');
    //  this.props.navigation.navigate('SignInScreen');
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

//part of the firebase auth scrappy solution - it checks whether there is Already
//an email, and if so, it puts in the email into the action. if the username
//isn't an email, it will concatenate the @email.com at the end so firebase
//recognizes it.
//-- this solution ensure there is minimal change to the signin/login actions in
//OtherActions.js
  onLoginButtonPress() {
    const { password, navigation } = this.props;
    if (this.props.username.includes('@')) {
      const email = this.props.username;
      this.props.loginUser({ email, password, navigation });
    } else {
      const email = `${this.props.username}@email.com`;
      console.log(email);
      this.props.loginUser({ email, password, navigation });
    }

    //this.props.navigation.navigate('App');
  }

  onSignupButtonPress() {
    const { username, password, navigation } = this.props;
    const email = `${username}@email.com`;
    //this is not the actual email field, this is a fake email made from username
    //currently, Firebase auth only takes emails as the username, so this is
    // a really scrappy solution, that adds a default @email.com
    this.props.signupUser({ email, password, username, navigation });
  }

  renderError() {
    if (this.props.error) {
      return <Text style={{ color: 'red', padding: 5 }}>{this.props.error}</Text>;
    }
  }

  render() {
    const { container, inputStyle, buttonStyle, buttonTextStyle, inputContainerStyle } = styles;

    return (
      <View style={container}>
        <View style={{ paddingTop: 93 }}>
          <Image
            style={{ width: 45, height: 45 }}
            source={require('../img/sun.png')}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Avenir-Black',
            fontSize: 30,
            color: '#FF5339',
            letterSpacing: -1,
            //paddingLeft: 36,
            paddingTop: 5,
          }}
        >Log In</Text>

        <View style={{ paddingTop: 12 }}>
          <View style={inputContainerStyle}>
            <TextInput
              autoCapitalize={'none'}
              selectionColor={'#FF5353'}
              style={inputStyle}
              placeholder={'Username'}
              value={this.props.username}
              onChangeText={this.onUsernameChange.bind(this)}
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={{ paddingTop: 12 }}>
          <View style={inputContainerStyle}>
            <TextInput
              secureTextEntry
              autoCapitalize={'none'}
              selectionColor={'#FF5353'}
              style={inputStyle}
              placeholder={'Password'}
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
              autoCorrect={false}
            />
          </View>
        </View>

        {this.renderError()}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SignInScreen');
            this.props.emptyInput();
          }}
        >
          <Text
            style={{
              fontFamily: 'Avenir-Roman',
              fontSize: 14,
              color: '#B8B8B8',
              paddingTop: 10
            }}
          >Don't have an account yet? Sign up here.</Text>
        </TouchableOpacity>

        <View style={{ paddingTop: 15 }}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={this.onLoginButtonPress.bind(this)}
          >
            <Text style={buttonTextStyle}>Log In</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 36,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  inputContainerStyle: {
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0'
  },

  inputStyle: {
    flex: 2,
    height: 40,
    color: '#353535',
    paddingTop: 5,
    paddingRight: 10,
    fontSize: 24,
    fontFamily: 'Avenir-Book',
  },

  buttonStyle: {
    height: 35,
    width: 110,
    borderRadius: 100,
    backgroundColor: '#FF5D53',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonTextStyle: {
    fontFamily: 'Avenir-Black',
    fontSize: 14,
    color: 'white'
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    email: state.auth.email,
    password: state.auth.password,
    username: state.auth.username,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, usernameChanged, loginUser, signupUser, emptyInput
})(SignInScreen);
