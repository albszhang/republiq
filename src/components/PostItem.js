import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Haptic } from 'expo';

import {
  upvotePressedTF,
  upvotePressedFF,
  upvotePressedFT,
  downvotePressedTF,
  downvotePressedFF,
  downvotePressedFT,

  LoadHeadlines,
} from '../actions';

//const username = 'testUsername';
//let ranking = 0;
class PostItem extends Component {
  constructor(props) {
    super(props);

    const found = this.props.news_feed.find((e) => {
      return e.title === this.props.item.topic;
    });

    //console.log('testing postitem newfeed data', found.title);

    this.state = {
      score: this.props.item.fullscore,
      upvotes: this.props.item.upvotes,
      downvotes: this.props.item.downvotes,
      upvoted: this.props.item.upvoted,
      downvoted: this.props.item.downvoted,

      //news data
      title: found.title,
      ranking: found.ranking,
      heat: found.heat,
      nOfComments: found.nOfComments,
      nOfArticles: found.nOfArticles
    };
  }

  componentDidMount() {
    const { authed } = this.props;
    //console.log('is this authed?', authed);
    if (authed) {
      this.checkVoted();
      //this.retrieveRanking();
    }
    console.log('THE STATE OF UPVOTES?AFTER', this.state.upvotes);

    this.checkUpvoteTF();
    this.checkDownvoteFT();
    console.log('THE STATE OF UPVOTES?BEFORE', this.state.upvotes);
  }

  onUpvotePress() {
    const { documentId, upvotes, downvotes } = this.props.item;
    const { score, upvoted, downvoted } = this.state;
    const stateUpvotes = this.state.upvotes;
    const stateDownvotes = this.state.downvotes;
    //note that when there is no "===", it is just syntactic sugar for "=== true"
    //ex. in (upvoted && downvoted === false) -> upvoted === true
    if (upvoted && downvoted === false) {
      this.setState({
        score: score - 1,
        upvoted: false,
      });
      //this.props.upvotePressedTF({ documentId, upvotes });
      console.log('stateUpvoes', stateUpvotes);
      this.props.upvotePressedTF({ documentId, stateUpvotes });
      Haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    } else if (upvoted === false && downvoted === false) {
      this.setState({
        score: score + 1,
        upvoted: true,
        //upvotes: upvotes + 1
      });
      //this.props.upvotePressedFF({ documentId, upvotes });
      this.props.upvotePressedFF({ documentId, stateUpvotes });
      Haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    } else if (upvoted === false && downvoted) {
      this.setState({
        score: score + 2,
        upvoted: true,
        downvoted: false,
      });
      this.props.upvotePressedFT({ documentId, stateUpvotes, stateDownvotes });
      Haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    }
  }

  onDownvotePress() {
    const { documentId, upvotes, downvotes } = this.props.item;
    const { score, upvoted, downvoted } = this.state;
    const stateUpvotes = this.state.upvotes;
    const stateDownvotes = this.state.downvotes;

    if (upvoted && downvoted === false) {
      this.setState({
        score: score - 2,
        upvoted: false,
        downvoted: true
      });
      this.props.downvotePressedTF({ documentId, stateUpvotes, stateDownvotes });
      Haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    } else if (upvoted === false && downvoted === false) {
      this.setState({
        score: score - 1,
        downvoted: true
      });
      this.props.downvotePressedFF({ documentId, stateDownvotes });
      Haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    } else if (upvoted === false && downvoted) {
      this.setState({
        score: score + 1,
        downvoted: false
      });
      this.props.downvotePressedFT({ documentId, stateDownvotes });
      Haptic.impact(Haptic.ImpactFeedbackStyle.Light);
    }
  }

  sortNews() {
    const found = this.props.news_feed.find((e) => {
      return e.title === this.props.item.topic;
    });
  }

  checkVoted() {
    const { documentId } = this.props.item;
    const currentUser = firebase.auth().currentUser;
    const postDoc =
      firebase.firestore().collection('posts').doc(`${documentId}`).collection('scoreStatus')
      .doc(`${currentUser.uid}`);

    postDoc.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          upvoted: doc.data().upvoted,
          downvoted: doc.data().downvoted
        });
      } else {
          this.setState({
            upvoted: false,
            downvoted: false
          });
      }
    });
  }

  checkUpvoteTF() {
    const { upvoted, downvoted } = this.state;
    if (upvoted && downvoted === false) {
      this.setState({
        upvotes: this.state.upvotes - 1
      });
    }
  }

  checkDownvoteFT() {
    const { upvoted, downvoted } = this.state;
    if (upvoted === false && downvoted) {
      this.setState({
        downvotes: this.state.downvotes - 1
      });
    }
  }

  renderUpvoteSection() {
    const { upvoted, downvoted } = this.state;

    if (upvoted) {
      return (
        <View style={styles.upvoteContainerStyle}>
          <TouchableOpacity
            style={{ width: 27, height: 14.4, justifyContent: 'center', alignItems: 'center' }}
            onPress={this.onUpvotePress.bind(this)}
          >
            <Image
              style={{ width: 15, height: 8 }}
              source={require('../img/postButtons/upvoteActive.png')}
            />
          </TouchableOpacity>

          <Text style={styles.upvoteActiveText}>{this.state.score}</Text>

          <TouchableOpacity
            style={{ width: 27, height: 14.4, justifyContent: 'center', alignItems: 'center' }}
            onPress={this.onDownvotePress.bind(this)}
          >
            <Image
              style={{ width: 15, height: 8 }}
              source={require('../img/postButtons/downvote.png')}
            />
          </TouchableOpacity>

        </View>
      );
    } else if (downvoted) {
      return (
        <View style={styles.upvoteContainerStyle}>
          <TouchableOpacity
            style={styles.upvoteFormat}
            onPress={this.onUpvotePress.bind(this)}
          >
            <Image
              style={{ width: 15, height: 8 }}
              source={require('../img/postButtons/upvote.png')}
            />
          </TouchableOpacity>

          <Text style={styles.downvoteActiveText}>{this.state.score}</Text>

          <TouchableOpacity
            style={styles.upvoteFormat}
            onPress={this.onDownvotePress.bind(this)}
          >
            <Image
              style={{ width: 15, height: 8 }}
              source={require('../img/postButtons/downvoteActive.png')}
            />
          </TouchableOpacity>
        </View>
      );
    }
      return (
        <View style={styles.upvoteContainerStyle}>
          <TouchableOpacity
            style={styles.upvoteFormat}
            onPress={this.onUpvotePress.bind(this)}
          >
            <Image
              style={{ width: 15, height: 8 }}
              source={require('../img/postButtons/upvote.png')}
            />
          </TouchableOpacity>

          <Text style={styles.upvoteText}>{this.state.score}</Text>

          <TouchableOpacity
            style={styles.upvoteFormat}
            onPress={this.onDownvotePress.bind(this)}
          >
            <Image
              style={{ width: 15, height: 8 }}
              source={require('../img/postButtons/downvote.png')}
            />
          </TouchableOpacity>
        </View>
      );
  }

  renderYourUsername() {
    const { item, username } = this.props;
    // originally this.props.username, but I'm testing for whether the displayname is funky
    if (username === item.author) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.yourUsernameText}>You</Text>
          <Image
            style={styles.smallDot}
            source={require('../img/dotSmall.png')}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/*  <Text style={styles.infoText}>{item.location}</Text>
            <Image
              style={styles.smallDot}
              source={require('../img/dotSmall.png')}
            /> */}
            <Text style={styles.infoText}>{item.timestamp}</Text>
          </View>
        </View>
      );
    }
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.infoText}>{item.author}</Text>
          <Image
            style={styles.smallDot}
            source={require('../img/dotSmall.png')}
          />
          {/* <Text style={styles.infoText}>{item.location}</Text>
          <Image
            style={styles.smallDot}
            source={require('../img/dotSmall.png')}
          />
          */}
          <Text style={styles.infoText}>{item.timestamp}</Text>
        </View>
      );
  }

  render() {
    const { item, navigation } = this.props;
    //this.retrieveRanking();
    //console.log('in render', ranking, item.topic);
    return (
      <View style={{ paddingBottom: 15 }} key={this.props.key}>
        <View style={styles.postContainer}>

          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              navigation.navigate('News', {
                title: this.state.title,
                ranking: this.state.ranking,
                heat: this.state.heat,
                nOfArticles: this.state.nOfArticles,
                nOfComments: this.state.nOfComments
              });
              this.props.LoadHeadlines();
            }}
          >
            {/*
            <View style={{ paddingTop: 1, paddingRight: 7 }}>
              <Image
                style={{ width: 11, height: 14.3 }}
                source={require('../img/staticFire.png')}
              />
            </View>
            {item.ranking}

            if you want to show ranking with the title
            <Text style={styles.topicText}>{this.state.ranking}. {item.topic}</Text>
            */}
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
            {this.renderUpvoteSection()}

            {/* Comments */}
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('News'); }}
            >
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
    fontSize: 14,
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

  smallDot: {
    width: 4,
    height: 4,
    marginTop: 2,
    marginRight: 7,
    marginLeft: 7
  },

  yourUsernameText: {
    fontSize: 13,
    fontFamily: 'Avenir-Heavy',
    color: '#FF5353',
    paddingTop: 2,
    paddingRight: 1
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
  },

  upvoteActiveText: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    color: '#FF7C52',
    paddingLeft: 14,
    paddingRight: 14
  },

  downvoteActiveText: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    color: '#6C8FE8',
    paddingLeft: 14,
    paddingRight: 14
  },

  upvoteFormat: {
    width: 27,
    height: 14.4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  upvoteContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    left: -4
  }
};

const mapStateToProps = (state) => {
  //console.log('post item news feed testing', state.feed.news_feed);
  return {
    username: state.auth.user.displayName,
    authed: state.auth.authenticated,
    news_feed: state.feed.news_feed
  };
};

export default connect(mapStateToProps, {
  upvotePressedTF,
  upvotePressedFF,
  upvotePressedFT,
  downvotePressedTF,
  downvotePressedFF,
  downvotePressedFT,

  LoadHeadlines
})(PostItem);
