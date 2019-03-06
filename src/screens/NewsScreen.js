import React, { Component } from 'react';
import { View, Text, SectionList, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import WhiteStatusBar from '../components/WhiteStatusBar';
import PostItem from '../components/PostItem';
import SectionHeader from '../components/SectionHeader';
import NewsHeader from '../components/NewsHeader';
import { RefreshPosts, LoadPosts } from '../actions';

class NewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: false,
      loading: false,
    };
  }

  componentDidMount() {
    //Load Feed
    this.loadFeed();
  }

  loadFeed = () => {
    this.setState({
      refresh: true,
      //news_feed: [] <- put this in after you can load from firebase
    });

    this.props.RefreshPosts(); //empties the post_feed action state
    this.props.LoadPosts();

    this.setState({
      refresh: false,
      loading: false
    });
  }

  loadNew = () => {
    //Load Feed
    this.loadFeed();
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
                { title: 'DISCUSSION', data: this.props.post_feed }
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
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
};

const mapStateToProps = (state) => {
  return {
    post_feed: state.feed.post_feed
  };
};

export default connect(mapStateToProps, {
  RefreshPosts, LoadPosts
})(NewsScreen);
