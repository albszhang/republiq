import React, { Component } from 'react';
import { View, Text, TextInput, InputAccessoryView, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

import { PostChanged } from '../actions';
import { HeadlineSelectBar } from './HeadlineSelectBar';

class CreatePost extends Component {
  onPostTextChanged(text) {
    this.props.PostChanged(text);
  }

  render() {
    const inputAccessoryViewID = 'uniqueId';
    return (
        <View style={styles.inputContainerStyle}>

              <TextInput
                style={styles.inputStyle}
                onChangeText={this.onPostTextChanged.bind(this)}
                value={this.props.post}
                selectionColor={'#FF5353'}
                multiline
                placeholder={"What's your take?"}
                keyboardType={'default'}
                autoFocus
                inputAccessoryViewID={inputAccessoryViewID}
              />

          {/*
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={styles.HeadlineSelectBar}>
              <Text>Text</Text>
            </View>
          </InputAccessoryView>

        */}
      </View>
    );
  }
}

const styles = {
  inputContainerStyle: {
    height: 150,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },

  inputStyle: {
    //flex: 0.5,
    color: '#4D4D4D',
    paddingTop: 5,
    paddingLeft: 18,
    paddingRight: 10,
    lineHeight: 30,
    fontSize: 24,
    fontFamily: 'Avenir-Book',
    backgroundColor: 'white'
  },

  HeadlineSelectBar: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

const mapStateToProps = state => {
  return {
    post: state.post.PostText
  };
};

export default connect(mapStateToProps, { PostChanged })(CreatePost);
