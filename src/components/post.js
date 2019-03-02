import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { PostChanged } from '../actions';

class CreatePost extends Component {

  onPostTextChanged(text) {
    this.props.PostChanged(text);
  }

  render() {
    return (
        <View style={styles.inputContainerStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={this.onPostTextChanged.bind(this)}
            value={this.props.post}
            selectionColor={'#FF5353'}
            multiline
            placeholder={"What's your take?"}
            keyboardType='default'
          />
        </View>
    );
  }
}

const styles = {
  inputContainerStyle: {
    height: 150,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black'
  },

  inputStyle: {
    flex: 2,
    color: '#4D4D4D',
    paddingTop: 5,
    paddingLeft: 18,
    paddingRight: 10,
    lineHeight: 30,
    fontSize: 24,
    fontFamily: 'Avenir-Book',
    backgroundColor: 'white'
  },
};

const mapStateToProps = state => {
  return {
    post: state.post.PostText
  };
};

export default connect(mapStateToProps, { PostChanged })(CreatePost);
