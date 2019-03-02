import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <View style={styles.inputContainerStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          selectionColor={'#FF5353'}
          multiline
        />
      </View>
    );
  }
}

const styles = {

  inputContainerStyle: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },

  inputStyle: {
    flex: 2,
    color: '#4D4D4D',
    paddingTop: 45,
    paddingLeft: 18,
    paddingRight: 5,
    lineHeight: 23,
    fontSize: 24,
    fontFamily: 'Avenir-Book'
  }
};

export { PostScreen };
