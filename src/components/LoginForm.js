import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const LoginForm = ({
  emailValue,
  passwordValue,
  onChangeEmailText,
  onChangePasswordText,
  onLoginPress,
  buttonText
}) => {
  const { container, inputStyle, buttonStyle, buttonTextStyle, inputContainerStyle } = styles;

  return (
    <View style={container}>

      <View style={inputContainerStyle}>
        <TextInput
          value={emailValue}
          style={inputStyle}
          placeholder={'Email'}
          onChangeText={onChangeEmailText}
          autoCapitalize={'none'}
        />
      </View>

      <View style={inputContainerStyle}>
        <TextInput
          secureTextEntry
          autoCapitalize={'none'}
          style={inputStyle}
          placeholder={'Password'}
          value={passwordValue}
          onChangeText={onChangePasswordText}
        />
      </View>

      <View style={{ paddingTop: 15 }}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={onLoginPress}
        >
            <Text style={buttonTextStyle}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
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

export default LoginForm;
