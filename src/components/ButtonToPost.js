//NOTE -> This component is currently unused. It's separately used twice in NewsScreen
// and in Homescreen, but because its position can't stay absolute, we've got a problem.

import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';

import PostModal from './PostModal';
import { PostClose, PostCreate } from '../actions';

class ButtonToPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  onClosePostModal() {
    this.props.PostClose();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <PostModal
          animationType='slide'
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          closeModal={() => {
            this.setModalVisible(!this.state.modalVisible);
            this.onClosePostModal();
          }}
          postAction={() => {
            this.setModalVisible(!this.state.modalVisible);
            console.log('postaction', this.props.selectedHeadline);
            const { post, username, selectedHeadline } = this.props;
            this.props.PostCreate({ post, username, selectedHeadline });
          }}
        />

        {/* Button to Post */}
        <View style={{ position: 'absolute', bottom: 35, right: 35 }}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}
            style={styles.button}
          >
            <Image
              style={{ width: 65, height: 65 }}
              source={require('../img/PostButton.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    shadowColor: 'black',
    shadowOffset: { height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
  },
};

const mapStateToProps = state => {
  return {
    post: state.post.PostText,
    username: state.auth.user.displayName,
    selectedHeadline: state.post.selectedHeadline,
  };
};

export default connect(mapStateToProps, { PostClose, PostCreate })(ButtonToPost);
