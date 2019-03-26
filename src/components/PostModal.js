import React, { Component } from 'react';
import { Modal, View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import ModalDropdown from 'react-native-modal-dropdown';

import CreatePost from './post';

let postColor = '#C9C9C9';
let fontSize = 16;
let fontFamily = 'Avenir-Book';
let color = '#C9C9C9';
let paddingRight = 7;
let headlineObject;

class PostModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headlineSelected: false,
    };
  }

  componentDidUpdate() {
    this.postColor();
  }

  postColor() {
    if (this.state.headlineSelected) {
      postColor = '#FF5353';
      fontSize = 14;
      fontFamily = 'Avenir-Heavy';
      color = '#404040';
      paddingRight = 7;
    }
  }

  selectHeadlineTouch() {
    this.setState({ headlineSelected: true });
  }

  render() {
    const {
      animationType, visible, onRequestClose, closeModal, postAction
    } = this.props;
    const headlines = this.props.headlineItems;
    this.postColor();
    return (
      <Modal
        animationType={animationType}
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >

        <View style={{ flexDirection: 'column' }}>
          <View style={styles.headerContainer}>
            {/* CancelPost */}
            <View style={{ paddingLeft: 18 }}>
              <TouchableOpacity
                onPress={closeModal}
              >
                <Text style={styles.cancelTextStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
            {/* PostButton */}
            <View style={{ paddingRight: 18 }}>
              <TouchableOpacity
                onPress={postAction}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Avenir-Black',
                    color: postColor
                  }}
                >POST</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.secondHeaderContainer}>
            {/* PostingTo */}
            <View style={{ paddingLeft: 18 }}>
              <Text style={styles.postingToStyle}>POSTING TO: </Text>
            </View>
            {/* SelectHeadline*/}
            <View style={{ paddingLeft: 5 }}>
              <ModalDropdown
                options={this.props.headlines}
                textStyle={{
                  fontSize,
                  fontFamily,
                  color,
                  paddingRight
                }}
                dropdownStyle={{ paddingLeft: 18 }}
                dropdownTextStyle={styles.dropdownTextStyle}
                dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                defaultValue={'SELECT A HEADLINE'}
                adjustFrame={() => ({
                  width: Dimensions.get('window').width,
                  height: 205,
                  ...ifIphoneX({
                      top: 120
                  }, {
                      top: 100
                  })
                })}
                keyboardShouldPersistTaps={'always'}
                onSelect={() => {
                  this.setState({ headlineSelected: true });
                  console.log('TESTHEADLINE', headlines.shift().title);
                }}
              />
              {/*
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => { this.setState({ headlineSelected: true }); }}
                >
                  <Text style={styles.selectHeadlineTextStyle}>SELECT A HEADLINE</Text>
                  <Image
                    style={{ width: 12, height: 10, bottom: 2 }}
                    source={require('../img/selectHeadlineTriangle.png')}
                  />
                </TouchableOpacity>
                */}

            </View>
          </View>
        </View>

        {/* Typing Area  <View style={styles.container}>
            <CreatePost />
          </View>
 */}
      <CreatePost />

      </Modal>
    );
  }
}

const styles = {

  container: {
    //flex: 1,
    paddingTop: 15,
    backgroundColor: 'white'
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    //paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 0.75,
    borderColor: '#E1E1E1',
    ...ifIphoneX({
        paddingTop: 50
    }, {
        paddingTop: 30
    })
  },

  secondHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.75,
    borderColor: '#E1E1E1'
  },

  postingToStyle: {
    fontSize: 13,
    fontFamily: 'Avenir-Black',
    color: '#B0B0B0'
  },

  cancelTextStyle: {
    fontSize: 16,
    fontFamily: 'Avenir-Roman',
    color: '#C9C9C9'
  },

  selectHeadlineTextStyle: {
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    color: '#C9C9C9',
    paddingRight: 7
  },

  dropdownTextStyle: {
    fontSize: 15,
    fontFamily: 'Avenir-Heavy',
    color: '#404040'
  },

  dropdownTextHighlightStyle: {
    fontSize: 15,
    fontFamily: 'Avenir-Heavy',
    color: '#FF5353'
  }

};

const mapStateToProps = state => {
  return {
    post: state.post.PostText,
    news_feed: state.feed.news_feed,
    headlines: state.feed.headlines
  };
};

export default connect(mapStateToProps)(PostModal);
