import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NotifScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NOTIFSSCREEEN</Text>
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

export { NotifScreen };
