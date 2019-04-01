import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import {
  emailChanged, passwordChanged, usernameChanged, loginUser, signupUser,
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
      this.props.navigation.navigate('AuthScreen');
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

  onLoginButtonPress() {
    console.log('LoginButton Pressed');
    const { email, password, navigation } = this.props;

    this.props.loginUser({ email, password, navigation });
    //this.props.navigation.navigate('App');
  }

  onSignupButtonPress() {
    const { email, password, username, navigation } = this.props;
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

        <View style={inputContainerStyle}>
          <TextInput
            value={this.props.email}
            style={inputStyle}
            placeholder={'Email'}
            onChangeText={this.onEmailChange.bind(this)}
            autoCapitalize={'none'}
          />
        </View>

        <View style={inputContainerStyle}>
          <TextInput
            secureTextEntry
            autoCapitalize={'none'}
            style={inputStyle}
            placeholder={'Password'}
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </View>

        <View style={{ padding: 20 }}>
          <View style={inputContainerStyle}>
            <TextInput
              autoCapitalize={'none'}
              style={inputStyle}
              placeholder={'Username (only for signups)'}
              value={this.props.username}
              onChangeText={this.onUsernameChange.bind(this)}
            />
          </View>
        </View>

        {this.renderError()}

        <View style={{ paddingTop: 15 }}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={this.onLoginButtonPress.bind(this)}
          >
            <Text style={buttonTextStyle}>Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 15 }}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={this.onSignupButtonPress.bind(this)}
          >
            <Text style={buttonTextStyle}>Sign Up</Text>
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
  //  justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },

  inputContainerStyle: {
    height: 50,
    width: 200,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  inputStyle: {
    flex: 2,
    height: 50,
    color: '#4D4D4D',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    backgroundColor: '#ECECEC'
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
  emailChanged, passwordChanged, usernameChanged, loginUser, signupUser
})(SignInScreen);
