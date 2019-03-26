import React, { Component } from 'react';
import { View, TextInput, ScrollView, Keyboard, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import { PostChanged } from '../actions';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: '',
      normalHeight: '',
      shortHeight: '',
    };
  }

  // componentDidMount() {
  //   this.keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     this.keyboardDidShow,
  //   );
  //   this.keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     this.keyboardDidHide,
  //   );
  // }

  onPostTextChanged(text) {
    this.props.PostChanged(text);
  }

  keyboardDidShow(e) {
      this.setState({
          keyboardHeight: e.endCoordinates.height,
          normalHeight: Dimensions.get('window').height,
          shortHeight: Dimensions.get('window').height - e.endCoordinates.height,
      });
  }

  render() {
    const inputAccessoryViewID = 'inputAccessoryView1';
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
            />

      </View>
    );
  }
}
//<KeyboardAvoidingView></KeyboardAvoidingView>
//  <KeyboardAccessoryView alwaysVisible={true}>   </KeyboardAccessoryView>
//<ScrollView>
const styles = {
  inputContainerStyle: {
    //height: 150,
    flex: 1,
    //flexDirection: 'column',
    backgroundColor: 'white',
    //alignItems: 'space-between',
    //justifyContent: 'space-between',
    paddingTop: 13,
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
    backgroundColor: 'white',
    ...ifIphoneX({
        height: 340
    }, {
        height: 390
    })
    //paddingBottom: 400
  },

};

const mapStateToProps = state => {
  return {
    post: state.post.PostText
  };
};

export default connect(mapStateToProps, { PostChanged })(CreatePost);
