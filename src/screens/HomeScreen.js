import React, { Component } from 'react';
import {
  View, TouchableOpacity, Alert, Image, Text, SectionList
} from 'react-native';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import WhiteStatusBar from '../components/WhiteStatusBar';
import PostModal from '../components/PostModal';
import PostItem from '../components/PostItem';
import HeadlineItem from '../components/HeadlineItem';
import SectionHeader from '../components/SectionHeader';
import ButtonToPost from '../components/ButtonToPost';
import {
  PostChanged,
  PostCreate,
  PostClose,
  LoadNewestPosts,
  LoadTopPosts,
  RefreshPosts,
  LoadNews,
  LoadHeadlines,
  DefaultColor
} from '../actions';

const Header = () => {
  const date = new Date();
  const today = date.getDate();
  const m = date.getMonth() + 1;
  let month;
  if (m === 1) {
    month = 'JAN';
  } else if (m === 2) {
    month = 'FEB';
  } else if (m === 3) {
    month = 'MAR';
  } else if (m === 4) {
    month = 'APR';
  } else if (m === 5) {
    month = 'MAY';
  } else if (m === 6) {
    month = 'JUN';
  } else if (m === 7) {
    month = 'JUL';
  } else if (m === 8) {
    month = 'AUG';
  } else if (m === 9) {
    month = 'SEPT';
  } else if (m === 10) {
    month = 'OCT';
  } else if (m === 11) {
    month = 'NOV';
  } else if (m === 12) {
    month = 'DEC';
  } else if (m === 13) {
    month = 'JAN';
  }

  //console.log('TESTING DATE', new Date().toISOString());
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
        <Text style={styles.dateStyle}>{month} {today}</Text>
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
      loading: false,
    };
  }

  componentDidMount() {
    //Load Feed'
    this.loadFeed('TOP');
  }

  onClosePostModal() {
    this.props.PostClose();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  loadFeed = (sortMethod) => {
    this.setState({
      refresh: true,
      loading: true
      //news_feed: [] <- put this in after you can load from firebase
    });

    this.props.RefreshPosts(); //empties the post_feed action state
    this.props.LoadNews();
    if (sortMethod === 'NEWEST') {
      this.props.LoadNewestPosts();
    } else if (sortMethod === 'TOP') {
      this.props.LoadTopPosts();
    }
    this.props.LoadHeadlines();

    this.setState({
      refresh: false,
      loading: false
    });
  }

  loadNew = (sortMethod) => {
    //Load Feed
    this.loadFeed(sortMethod);
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
        {/* SectionList rendering the header, newsfeed, and postfeed */}
        {this.state.loading === true ? (
          <View
            style={{
              height: 300,
              backgroundColor: 'white'
            }}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <SectionList
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.loadNew(this.props.sortMethod);
              }}
              sections={[
                { title: 'HEADLINES',
                  //data: this.state.static_newsFeed,
                  data: this.props.news_feed,
                  renderItem: ({ item, index }) => (
                    <HeadlineItem
                      index={index}
                      item={item}
                      navigation={this.props.navigation}
                      loading={this.state.loading}
                    />
                  )
                },
                { title: 'DISCUSSION', data: this.props.post_feed }
              ]}
              renderItem={({ item, index }) => (
                <PostItem
                  index={index}
                  item={item}
                  navigation={this.props.navigation}
                  profile={false}
                  //news={this.props.news_feed}
                />
              )}
              renderSectionHeader={({ section }) => (
                <SectionHeader
                  section={section}
                  refresh={(sortMethod) => { this.loadFeed(sortMethod); }}
                />
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
            //console.log('postaction', this.props.selectedHeadline);
            const { post, username, selectedHeadline } = this.props;
            this.props.PostCreate({ post, username, selectedHeadline });
            this.props.DefaultColor();
            this.loadFeed(this.props.sortMethod);
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
    //height: 105,
    //paddingTop: 40,
    paddingBottom: 10,
    position: 'relative',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...ifIphoneX({
        paddingTop: 60,
    }, {
        paddingTop: 40
    })
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
  sectionSeparatorStyle: {
    flex: 1,
    height: 15,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
};

const mapStateToProps = (state) => {
  //console.log('from HomeScreen', state.post.selectedHeadline);
  return {
    post: state.post.PostText,
    selectedHeadline: state.post.selectedHeadline,
    post_feed: state.feed.post_feed,
    post_vote_info: state.feed.post_vote_info,
    news_feed: state.feed.news_feed,
    username: state.auth.user.displayName,
    sortMethod: state.sort.sortMethod
  };
};

export default connect(mapStateToProps, {
  PostChanged,
  PostCreate,
  PostClose,
  RefreshPosts,
  LoadNewestPosts,
  LoadTopPosts,
  LoadHeadlines,
  LoadNews,
  DefaultColor
})(HomeScreen);
//export default HomeScreen;
