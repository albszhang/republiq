import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import {
  emailChanged, passwordChanged, usernameChanged, loginUser, signupUser, emptyInput
} from '../actions';

class LogInScreen extends Component {
  // componentDidUpdate() {
  //   //console.log('component updated');
  //   if (this.props.user) {
  //     console.log('there exists a user');
  //     //this.props.navigation.navigate('AuthScreen');
  //   }
  // }

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

        <View style={{ paddingTop: 48 }}>
          <Image
            style={{ width: 51, height: 51 }}
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
        >Republiq</Text>
        <Text
          style={{
            fontFamily: 'Avenir-LightOblique',
            fontSize: 20,
            color: '#FF5339',
            letterSpacing: -1,
            //paddingLeft: 36,
            lineHeight: 25
            //paddingTop: 5
          }}
        >Rediscover the news.</Text>

        <View style={{ paddingTop: 12 }}>
          <View style={inputContainerStyle}>
            <TextInput
              value={this.props.email}
              style={inputStyle}
              placeholder={'Email'}
              onChangeText={this.onEmailChange.bind(this)}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={{ paddingTop: 12 }}>
          <View style={inputContainerStyle}>
            <TextInput
              secureTextEntry
              autoCapitalize={'none'}
              style={inputStyle}
              placeholder={'Password'}
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
              autoCorrect={false}
            />
          </View>
        </View>

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
        >Don't have an account? Sign up!</Text>
      </TouchableOpacity>

        {this.renderError()}


        <View style={{ paddingTop: 15 }}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={this.onLoginButtonPress.bind(this)}
          >
            <Text style={buttonTextStyle}>Log in</Text>
          </TouchableOpacity>
        </View>

{/*
        <View style={{ paddingTop: 15 }}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={this.onSignupButtonPress.bind(this)}
          >
            <Text style={buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        */}

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
    //height: 15,
    width: 200,
    // paddingTop: 20,
    // paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    borderRadius: 3
  },

  inputStyle: {
    flex: 2,
    height: 40,
    color: '#353535',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
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
})(LogInScreen);
