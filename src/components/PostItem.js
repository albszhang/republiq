import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { upvotePressed } from '../actions';

class PostItem extends Component {
  onUpvotePress() {
    this.props.upvotePressed();
  }

  renderYourUsername() {
    const { item } = this.props;

    if (this.props.username === item.author) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.yourUsernameText}>YOU</Text>
          <Text style={styles.infoText}>
            &#9702; {item.location} &#9702; {item.timestamp}
          </Text>
        </View>
      );
    }
      return (
        <Text style={styles.infoText}>
          {item.author} &#9702; {item.location} &#9702; {item.timestamp}
        </Text>
      );
  }

  render() {
    const { item } = this.props;
    return (
      <View style={{ paddingBottom: 15 }} key={this.props.index}>
        <View style={styles.postContainer}>

          <TouchableOpacity style={{ flexDirection: 'row' }}>

            <View style={{ paddingTop: 1, paddingRight: 7 }}>
              <Image
                style={{ width: 10, height: 13 }}
                source={require('../img/staticFire.png')}
              />
            </View>
            <Text style={styles.topicText}>{item.topic}</Text>
            <Image
              style={{ width: 6, height: 10.5, left: 3, top: 3 }}
              source={require('../img/postButtons/topicArrow.png')}
            />

          </TouchableOpacity>

          {this.renderYourUsername()}

          {/*
          <Text style={styles.infoText}>
            {item.author} &#9702; {item.location} &#9702; {item.timestamp}
          </Text>
          */}


          <Text style={styles.bodyText}>{item.content}</Text>

          {/* Bottom Bar */}

          <View style={styles.bottomBar}>

            {/* Upvote and Downvote*/}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <TouchableOpacity
                style={{ width: 18, height: 9.6 }}
                onPress={this.onUpvotePress.bind(this)}
              >
                <Image
                  style={{ width: 15, height: 8 }}
                  source={require('../img/postButtons/upvote.png')}
                />
              </TouchableOpacity>

              <Text style={styles.upvoteText}>{item.fullscore}</Text>

              <TouchableOpacity style={{ width: 18, height: 9.6 }}>
                <Image
                  style={{ width: 15, height: 8 }}
                  source={require('../img/postButtons/downvote.png')}
                />
              </TouchableOpacity>
            </View>

            {/* Comments */}
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image
                  style={{ width: 19, height: 17 }}
                  source={require('../img/postButtons/comment.png')}
                />
                <Text style={styles.bottomBarText}>{item.nOfComments}</Text>
              </View>
            </TouchableOpacity>

            {/* Share */}
            <TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image
                  style={{ width: 18, height: 15.5 }}
                  source={require('../img/postButtons/share.png')}
                />
                <Text style={styles.bottomBarText}>Share</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
  }
}

const styles = {
  postContainer: {
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 28,
    paddingBottom: 16,
    backgroundColor: 'white'
  },

  bodyText: {
    fontSize: 13,
    fontFamily: 'Avenir-Roman',
    color: '#171717',
    paddingTop: 7
  },

  infoText: {
    fontSize: 13,
    fontFamily: 'Avenir-Roman',
    color: '#A3A3A3',
    paddingTop: 2
  },

  yourUsernameText: {
    fontSize: 13,
    fontFamily: 'Avenir-Heavy',
    color: '#FF5353',
    paddingTop: 2
  },

  topicText: {
    fontSize: 13,
    fontFamily: 'Avenir-Heavy',
    color: '#545454',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16
  },

  bottomBarText: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    color: '#959595',
    paddingLeft: 11
  },

  upvoteText: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    color: '#959595',
    paddingLeft: 14,
    paddingRight: 14
  }
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.user.displayName
  };
};

export default connect(mapStateToProps, { upvotePressed })(PostItem);
