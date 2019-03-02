import React, { Component } from 'react';
import { View, Text } from 'react-native';


const uuidv1 = require('uuid');

class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile!! :)</Text>
        <Text>{uuidv1()}</Text>
        <Text>{uuidv1()}</Text>
        <Text>{uuidv1()}</Text>
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
  }
};

export { ProfileScreen };
