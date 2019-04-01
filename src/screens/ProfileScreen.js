import React, { Component } from 'react';
import {
  View, Text, Alert, TouchableOpacity, Image, ImageBackground, FlatList, Modal,
} from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import PostItem from '../components/PostItem';

import {
  RefreshPosts,
  RefreshProfilePosts,
  LoadPosts,
  LoadNews,
  LoadHeadlines,
  LoadProfilePosts,
  LoadProfileAge,
} from '../actions';


class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      username: firebase.auth().currentUser.displayName,
      refresh: false,
      loading: false
    };
  }

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    // const uid = 'JbADLShosbfDXQ4boLfzhxtFd2B3';
    //Load feed
    this.loadFeed(uid);
    this.props.LoadProfileAge();
  }

  onSignoutButtonPress() {
    console.log('Signout button pressed');
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Auth');
    })
    .catch((error) => {
      Alert.alert(error);
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  loadFeed = (uid) => {
    this.setState({
      refresh: true,
    });

    this.props.RefreshPosts(); //empties the post_feed action state
    this.props.RefreshProfilePosts();
    //this.props.LoadProfileAge();
    this.props.LoadNews();
    this.props.LoadPosts();
    this.props.LoadHeadlines();
    this.props.LoadProfilePosts(uid);
    //this.props.LoadSpecificPosts(this.props.navigation.getParam('title'));

    this.setState({
      refresh: false,
      loading: false
    });
  }

  loadNew = () => {
    const uid = firebase.auth().currentUser.uid;
    //Load Feed
    this.loadFeed(uid);
  }

  renderList() {
    if (this.props.post_profile_feed === []) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text> You don't have any posts yet! </Text>
        </View>
      );
    } else {
      return (
        this.state.loading === true ? (
          <View>
            <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Loading</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              refreshing={this.state.refresh}
              onRefresh={this.loadNew}
              data={this.props.post_profile_feed}
              renderItem={({ item, index }) => (
                <PostItem index={index} item={item} navigation={this.props.navigation} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      );
    }
  }

  renderHead() {
    return (
      <View style={styles.HeaderContainerStyle}>
        <View style={styles.topHeaderStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View styles={{ paddingLeft: 18 }}>
              <Image
                style={{ width: 85, height: 85 }}
                source={require('../img/profileIcon/hatman.png')}
              />
            </View>
            <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
              <Text style={styles.usernameTextStyle}>{this.state.username}</Text>
              <Text>{this.props.age}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Image
              style={{ width: 23, height: 23 }}
              source={require('../img/settings.png')}
            />
          </TouchableOpacity>

        </View>

        <View style={styles.sectionHeaderContainerStyle}>
          <Text style={styles.sectionHeaderText}>YOUR OPINIONS</Text>
        </View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHead()}
        {this.state.loading === true ? (
          <View>
            <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Loading</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              refreshing={this.state.refresh}
              onRefresh={this.loadNew}
              data={this.props.post_profile_feed}
              renderItem={({ item, index }) => (
                <PostItem index={index} item={item} navigation={this.props.navigation} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          )
        }

        <Modal
          animationType='slide'
          transparent
          visible={this.state.modalVisible}
        >
          <ImageBackground
            source={require('../img/background.jpg')} style={{ width: '100%', height: '100%' }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPressOut={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={{ paddingLeft: 25, paddingTop: 45, paddingBottom: 10 }}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require('../img/whiteExitButton.png')}
                />
              </TouchableOpacity>
              <View style={{ paddingLeft: 25 }}>
                <Text style={styles.settingsTextStyle}>Settings</Text>
              </View>
              <View style={{ paddingTop: 15, paddingLeft: 25 }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={this.onSignoutButtonPress}
                >
                  <Text style={styles.buttonTextStyle}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </Modal>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  buttonStyle: {
    height: 35,
    width: 110,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    fontFamily: 'Avenir-Black',
    fontSize: 14,
    color: '#FFCD5D'
  },
  HeaderContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    ...ifIphoneX({
        paddingTop: 40,
    }, {
        paddingTop: 20
    }),
    //paddingBottom: 20,
    backgroundColor: 'white'
  },
  topHeaderStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 30,
  },
  sectionHeaderContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingTop: 11,
    paddingBottom: 11,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#DFDFDF',
  },

  sectionHeaderText: {
    fontFamily: 'Avenir-Black',
    fontSize: 12,
    color: '#595959'
  },
  usernameTextStyle: {
    fontSize: 25,
    fontFamily: 'Avenir-Black',
    color: '#242424',
  },
  settingsTextStyle: {
    fontSize: 25,
    fontFamily: 'Avenir-Black',
    color: 'white',
  },

  informationTextStyle: {
    fontSize: 115,
    fontFamily: 'Avenir-Medium',
    color: '#242424'
  },

  modalStyle: {
    //backgroundColor: 'white',
    zIndex: 9,
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: 100,
    width: 100,
    borderRadius: 10
  }
};

const mapStateToProps = (state) => {
  return {
    post_feed: state.feed.post_feed,
    post_profile_feed: state.profile.post_profile_feed,
    age: state.profile.age
  };
};

export default connect(mapStateToProps, {
  RefreshPosts,
  RefreshProfilePosts,
  LoadPosts,
  LoadNews,
  LoadHeadlines,
  LoadProfilePosts,
  LoadProfileAge
})(ProfileScreen);
