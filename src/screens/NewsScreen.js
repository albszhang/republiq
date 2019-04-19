import React, { Component } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import WhiteStatusBar from '../components/WhiteStatusBar';
import PostItem from '../components/PostItem';
import SectionHeader from '../components/SectionHeader';
import NewsHeader from '../components/NewsHeader';
import PostModal from '../components/PostModal';
import {
  PostClose,
  PostCreate,
  RefreshPosts,
  RefreshNewsPosts,
  LoadNews,
  LoadHeadlines,
  LoadNewestPosts,
  LoadTopPosts,
  LoadProfilePosts,
  //LoadSpecificPosts,
  LoadNewestSpecificPosts,
  LoadTopSpecificPosts,
  UpdateComments,
  LoadArticles,
  DefaultColor
} from '../actions';

class NewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      refresh: false,
      loading: false,
    };
  }

  componentDidMount() {
    //Load Feed
    this.loadFeed(this.props.sortMethod);
  }

  onClosePostModal() {
    this.props.PostClose();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  loadFeed = (sortMethod) => {
    const uid = firebase.auth().currentUser.uid;
    this.setState({
      refresh: true,
    });
    this.props.RefreshNewsPosts(); //empties the post_feed action state
    // this.props.LoadNews();
    this.props.LoadArticles(this.props.navigation.getParam('title'));
    //homepage feed loading
    // if (sortMethod === 'NEWEST') {
    //   this.props.LoadNewestPosts();
    // } else if (sortMethod === 'TOP') {
    //   this.props.LoadTopPosts();
    // }
    // this.props.LoadProfilePosts(uid);
    // this.props.LoadHeadlines();

    //newspage feed loading
    if (sortMethod === 'NEWEST') {
      this.props.LoadNewestSpecificPosts(this.props.navigation.getParam('title'));
    } else if (sortMethod === 'TOP') {
      this.props.LoadTopSpecificPosts(this.props.navigation.getParam('title'));
    }
    //this.props.LoadSpecificPosts(this.props.navigation.getParam('title'));

    this.setState({
      refresh: false,
      loading: false
    });
  }

  loadNew = (sortMethod) => {
    //Load Feed
    this.loadFeed(sortMethod);

    // THIS UPDATES THE COMMENTS - STICK IT0 SOMEWHERE ELSE THO
    // console.log(firebase.auth().currentUser.uid);
    if (firebase.auth().currentUser.uid === 'vuD6bmG45tV2sbb7xA4wLf3qO8p1') {
      const nOfComments = this.props.post_specific_feed.length;
      const title = this.props.navigation.getParam('title');
      this.props.UpdateComments({ nOfComments, title });
    }
  }

  navProps(prop) {
    this.props.navigaton.getParam(prop);
  }

  renderHead() {
    return <NewsHeader nav={this.props.navigation} />;
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
          <View style={{ flex: 1 }}>
            <SectionList
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.loadNew(this.props.sortMethod);
              }}
              sections={[
                //{ title: 'DISCUSSION', data: this.props.post_feed }
                { title: 'DISCUSSION', data: this.props.post_specific_feed }
              ]}
              renderItem={({ item, index, section }) => (
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
              ListHeaderComponent={this.renderHead()}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      }

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
          console.log('postaction', this.props.selectedHeadline);
          const { post, username, selectedHeadline } = this.props;
          this.props.PostCreate({ post, username, selectedHeadline });
          this.props.DefaultColor();
          this.loadFeed(this.props.sortMethod);
        }}
        autoHeadline={this.props.navigation.getParam('title')}
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
};

const mapStateToProps = (state) => {
  return {
    post_feed: state.feed.post_feed,
    post_specific_feed: state.feed.post_specific_feed,
    news_feed: state.feed.news_feed,
    post: state.post.PostText,
    username: state.auth.user.displayName,
    selectedHeadline: state.post.selectedHeadline,
    sortMethod: state.sort.sortMethod,
  };
};

export default connect(mapStateToProps, {
  PostClose,
  PostCreate,
  RefreshPosts,
  RefreshNewsPosts,
  LoadNews,
  LoadHeadlines,
  LoadNewestPosts,
  LoadTopPosts,
  LoadNewestSpecificPosts,
  LoadTopSpecificPosts,
  LoadProfilePosts,
  //LoadSpecificPosts,
  UpdateComments,
  LoadArticles,
  DefaultColor
})(NewsScreen);
