import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Image, Text } from 'react-native';

import CreatePost from './post';

class PostModal extends Component {
  render() {
    const { animationType, visible, onRequestClose, closeModal, postAction } = this.props;

    return (
      <Modal
        animationType={animationType}
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >

        <View style={styles.headerContainer}>


          {/* Close Post */}

          <View style={styles.exitButtonContainer}>
            <TouchableOpacity
              onPress={closeModal}
              style={styles.exitButton}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../img/ExitPost.png')}
              />
            </TouchableOpacity>
          </View>


          {/* Click to Post */}

          <View style={styles.postButtonContainer}>
            <TouchableOpacity
              onPress={postAction}
              style={styles.postButton}
            >
              <Text style={styles.postButtonText}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Typing Area */}

        <View style={styles.container}>
          <CreatePost />
        </View>

      </Modal>
    );
  }
}

const styles = {

  container: {
    flex: 1
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  exitButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
    left: 5,
  //  backgroundColor: 'red'
  },

  postButtonContainer: {
  //  backgroundColor: 'blue',
    paddingTop: 30,
    paddingRight: 15
  },

  postButton: {
    width: 65,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5353',
    borderRadius: 50,
  },

  postButtonText: {
    paddingTop: 3,
    color: 'white',
    fontSize: 13,
    fontFamily: 'Avenir-Black',
  },
};


export default PostModal;
