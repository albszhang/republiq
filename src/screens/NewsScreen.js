import React, { Component } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';

import WhiteStatusBar from '../components/WhiteStatusBar';
import PostItem from '../components/PostItem';
import SectionHeader from '../components/SectionHeader';
import NewsHeader from '../components/NewsHeader';
import PostModal from '../components/PostModal';
import {
  PostClose, PostCreate, RefreshPosts, LoadNews, LoadPosts, LoadSpecificPosts,
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
    this.loadFeed();
  }

  onClosePostModal() {
    this.props.PostClose();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  loadFeed = () => {
    this.setState({
      refresh: true,
    });

    this.props.RefreshPosts(); //empties the post_feed action state
    this.props.LoadNews();
    this.props.LoadPosts();
    this.props.LoadSpecificPosts(this.props.navigation.getParam('title'));

    this.setState({
      refresh: false,
      loading: false
    });
  }

  loadNew = () => {
    //Load Feed
    this.loadFeed();
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
              onRefresh={this.loadNew}
              sections={[
                //{ title: 'DISCUSSION', data: this.props.post_feed }
                { title: 'DISCUSSION', data: this.props.post_specific_feed }
              ]}
              renderItem={({ item, index, section }) => (
                <PostItem index={index} item={item} navigation={this.props.navigation} />
              )}
              renderSectionHeader={({ section }) => (
                <SectionHeader section={section} />
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
};

const mapStateToProps = (state) => {
  return {
    post_feed: state.feed.post_feed,
    post_specific_feed: state.feed.post_specific_feed,
    news_feed: state.feed.news_feed,
    post: state.post.PostText,
    username: state.auth.user.displayName,
    selectedHeadline: state.post.selectedHeadline,
  };
};

export default connect(mapStateToProps, {
  PostClose, PostCreate, RefreshPosts, LoadNews, LoadPosts, LoadSpecificPosts
})(NewsScreen);
