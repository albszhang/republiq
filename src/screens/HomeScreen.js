import React, { Component } from 'react';
import { View, TouchableOpacity, Alert, Image, Text, SectionList } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/firestore';

import WhiteStatusBar from '../components/WhiteStatusBar';
import PostModal from '../components/PostModal';
import PostItem from '../components/PostItem';
import HeadlineItem from '../components/HeadlineItem';
import { PostChanged, PostCreate, PostClose } from '../actions';

const Header = () => {
  return (
    <View style={styles.HeaderContainerStyle}>
      <View style={styles.titleOrg}>
        <Text style={styles.RepubliqTitle}>Republiq</Text>
        <Text style={styles.Subtitle}>Today's News</Text>
      </View>

      <View style={{ paddingRight: 25, flexDirection: 'column', alignItems: 'center' }}>
        <Image
          style={{ width: 32, height: 32 }}
          source={require('../img/sun.png')}
        />
        <Text style={styles.dateStyle}>DATE</Text>
      </View>
    </View>
  );
};

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      refresh: false,

      post_feed: [],
      news_feed: [
        {
          order: '1.',
          headline: 'U.S. Government Shutdown'
        },
        {
          order: '2.',
          headline: 'Elizabeth Warren'
        },
        {
          order: '3.',
          headline: 'Mitt Romney Op-Ed'
        },
        {
          order: '4.',
          headline: 'Jazmine Barnes Shooting'
        },
        {
          order: '5.',
          headline: 'Trump Cabinet Meeting'
        },
      ],
    };
  }

  componentDidMount() {
    //Load Feed
    this.loadFeed();
    console.log(this.timeConverter(1550944679));
  }

  onClosePostModal() {
    this.props.PostClose();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  pluralCheck = (s) => {
    if (s === 1) {
      return ' ago';
    }
    return 's ago';
  }

  timeConverter = (timestamp) => {
    const a = new Date(timestamp * 1000);
    const seconds = Math.floor((new Date() - a) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' year' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' month' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' day' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hr' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' min' + this.pluralCheck(interval);
    }
    return Math.floor(seconds) + ' second' + this.pluralCheck(interval);
  }


  loadFeed = () => {
    this.setState({
      refresh: true,
      post_feed: [],
      //news_feed: [] <- put this in after you can load from firebase
    });

    const that = this;

    //getting data
    firebase.firestore().collection('posts').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          //console.log(doc.data());
          const postObj = doc.data();
          const postFeed = that.state.post_feed;
          postFeed.push({
            documentId: doc.id,
            id: postObj.id,
            content: postObj.content,
            timestamp: that.timeConverter(postObj.timestamp),
            location: postObj.location,
            author: postObj.author,
            upvotes: postObj.upvotes,
            downvotes: postObj.downvotes,
            fullscore: postObj.upvotes - postObj.downvotes,
            nOfComments: postObj.nOfComments,
            topic: postObj.topic,
          });

          that.setState({
            refresh: false,
            loading: false
          });

          console.log(that.state.post_feed);
        }
      });
    });
  }

  loadNew = () => {
    //Load Feed
    this.loadFeed();
  }

  renderItem({ item, index, section }) {
    console.log(item);
    return <PostItem key={item.documentId} index={index} item={item} />;
  }

  renderHead() {
    return <Header />;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ zIndex: 1 }}>
          <WhiteStatusBar />
        </View>
        {/* FlatList rendering the header, newsfeed, and postfeed */}
        {this.state.loading === true ? (
          <View>
            <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Loading</Text>
          </View>
        ) : (
          <View styles={{ flex: 1 }}>
            <SectionList
              refreshing={this.state.refresh}
              onRefresh={this.loadNew}
              sections={[
                { title: 'HEADLINES',
                  data: this.state.news_feed,
                  renderItem: ({ item, index }) => (
                    <HeadlineItem index={index} item={item} navigation={this.props.navigation} />
                  )
                },
                { title: 'DISCUSSION', data: this.state.post_feed }
              ]}
              renderItem={({ item, index, section }) => (
                <PostItem index={index} item={item} navigation={this.props.navigation} />
              )}
              renderSectionHeader={({ section }) => (
                <View style={styles.sectionHeaderPadding}>
                  <View style={styles.sectionHeaderContainerStyle}>
                    <Text style={styles.sectionHeaderText}>{section.title}</Text>
                  </View>
                </View>
              )}
              ListHeaderComponent={this.renderHead}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          )}

        {/* Popup To Post */}

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
            const { post, username } = this.props;
            this.props.PostCreate({ post, username });
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

  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',

  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    shadowColor: 'black',
    shadowOffset: { height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
  },


  //Header----------------------

  HeaderContainerStyle: {
    backgroundColor: '#FFF',
    height: 105,
    paddingTop: 40,
    position: 'relative',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  RepubliqTitle: {
    fontFamily: 'Avenir-Black',
    fontSize: 21,
    color: '#FF5353',
    letterSpacing: -0.5,
  },

  Subtitle: {
    fontFamily: 'Avenir-Black',
    fontSize: 21,
    color: '#333333',
    letterSpacing: -0.5,
    top: -5
  },

  titleOrg: {
    paddingLeft: 18,
    flexDirection: 'column'
  },

  dateStyle: {
    fontFamily: 'Avenir-Black',
    fontSize: 14,
    color: '#A9A9A9',
    letterSpacing: -0.5
  },

  //Section header style
  sectionHeaderPadding: {
    paddingTop: 15
  },

  sectionHeaderContainerStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingTop: 11,
    paddingBottom: 11,
    borderBottomWidth: 0.5,
    borderColor: '#DFDFDF',
  },

  sectionHeaderText: {
    fontFamily: 'Avenir-Black',
    fontSize: 12,
    color: '#595959'
  },

  sectionSeparatorStyle: {
    flex: 1,
    height: 15,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
};

const mapStateToProps = (state) => {
  console.log(state.auth.user.displayName);
  return {
    post: state.post.PostText,
    feed: state.feed,
    username: state.auth.user.displayName
  };
};

export default connect(mapStateToProps, { PostChanged, PostCreate, PostClose })(HomeScreen);
