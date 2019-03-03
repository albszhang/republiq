import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';


const uuidv1 = require('uuid');

class NewsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NEWS NEWS NEWS NEWS :)</Text>
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

export default withNavigation(NewsScreen);
