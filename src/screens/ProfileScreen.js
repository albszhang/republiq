import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: firebase.auth().currentUser.displayName
    };
  }

  onSignoutButtonPress() {
    console.log('Signout button pressed');
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Auth');
    })
    .catch((error) => {
      Alert.alert(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.username}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onSignoutButtonPress.bind(this)}
        >
          <Text style={styles.buttonTextStyle}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
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

export { ProfileScreen };
