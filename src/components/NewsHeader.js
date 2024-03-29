import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, FlatList, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { WebBrowser } from 'expo';
//import SafariView from 'react-native-safari-view';

import { PostClose } from '../actions';
import HeadlineInfo from './HeadlineInfo';

class NewsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      result: null
    };
    //this.handlePressButtonAsync = this.handlePressButtonAsync.bind(this);
  }

  openLink() {
    Linking.openURL(
      'https://www.nytimes.com/2018/12/31/us/politics/elizabeth-warren-2020-president-announcement.html'
    ).catch((err) => console.error('An error occurred', err));
  }

  get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
              //dotsLength={tempData.length}
              dotsLength={this.props.articles.length}
              activeDotIndex={activeSlide}
              //carouselRef={(c) => { this._carousel = c; }}
              containerStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                justifyContent: 'flex-start',
                paddingHorizontal: 5,
                paddingVertical: 0
              }}
              dotStyle={{
                width: 25,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 7,
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
              }}
              dotContainerStyle={{
                paddingLeft: 10,
                marginHorizontal: 0
              }}
              inactiveDotStyle={{
                width: 25,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 7,
                backgroundColor: 'rgba(0, 0, 0, 0.30)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.8}
              //tappableDots
            />
        );
    }

  handlePressButtonAsync = async () => {
    const url = this.props.item.url;
    let result = await WebBrowser.openBrowserAsync(url);
    this.setState({ result });
  };

  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          paddingBottom: 13,
          paddingLeft: 20,
          width: Dimensions.get('window').width,
        }}
        onPress={async () => {
          const url = item.url;
          let result = await WebBrowser.openBrowserAsync(url);
          this.setState({ result });
          //this.handlePressButtonAsync.bind(this);
          // Linking.openURL(item.url)
          // .catch((err) => console.error('An error occurred', err));

        }}
      >
        {/* Article Info */}
        <View style={styles.articleInfoContainerStyle}>
          <View style={{ paddingRight: 8 }}>
            <Image
              //style={{ width: 22.7, height: 25.3 }}
              style={{
                flex: 1,
                alignSelf: 'stretch',
                width: 25,
                height: 25,
              }}
              resizeMode={'contain'}
              source={{ uri: `${item.imgurl}` }}
              //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/republiq-3a89c.appspot.com/o/newsIcons%2Fnytimes.png?alt=media&token=838be42d-e2ff-45ad-be73-b7decbcb3913'}}
            />
          </View>
          <View style={{ paddingRight: 8 }}>
            <Image
              style={{ width: 4, height: 4 }}
              source={require('../img/dotBig.png')}
            />
          </View>
          <Text style={styles.timeTextStyle}>{item.time}</Text>
        </View>
        {/* Article Text */}
        <View style={{ paddingTop: 3, paddingRight: 24 }}>
          <Text style={styles.articleTextStyle}>
        {item.headline}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderVertItem({ item, index }) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          paddingBottom: 12,
          marginLeft: 20,
          width: Dimensions.get('window').width,
          borderBottomWidth: 0.5,
          borderColor: '#DFDFDF'
        }}
        onPress={async () => {
          const url = item.url;
          let result = await WebBrowser.openBrowserAsync(url);
          this.setState({ result });
          //this.handlePressButtonAsync.bind(this);
          // Linking.openURL(item.url)
          // .catch((err) => console.error('An error occurred', err));

        }}
      >
        {/* Article Info */}
        <View style={styles.articleInfoContainerStyle}>
          <View style={{ paddingRight: 8 }}>
            <Image
              //style={{ width: 22.7, height: 25.3 }}
              style={{
                flex: 1,
                alignSelf: 'stretch',
                width: 25,
                height: 25,
              }}
              resizeMode={'contain'}
              source={{ uri: `${item.imgurl}` }}
              //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/republiq-3a89c.appspot.com/o/newsIcons%2Fnytimes.png?alt=media&token=838be42d-e2ff-45ad-be73-b7decbcb3913'}}
            />
          </View>
          <View style={{ paddingRight: 8 }}>
            <Image
              style={{ width: 4, height: 4 }}
              source={require('../img/dotBig.png')}
            />
          </View>
          <Text style={styles.timeTextStyle}>{item.time}</Text>
        </View>
        {/* Article Text */}
        <View style={{ paddingRight: 24 }}>
          <Text style={styles.articleVertTextStyle}>
        {item.headline}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    //const { navigation } = this.props;
    const title = this.props.navigation.getParam('title');
    const ranking = this.props.navigation.getParam('ranking');
    const heat = this.props.navigation.getParam('heat');
    const nOfArticles = this.props.navigation.getParam('nOfArticles');
    const nOfComments = this.props.navigation.getParam('nOfComments');
    return (
      <View style={styles.headerContainerStyle}>
        {/* <View style={{ paddingLeft: 20, }}>*/}
          <TouchableOpacity
            onPress={() => {
              this.props.nav.goBack(null);
              this.props.PostClose();
          }}
            style={{ paddingLeft: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Image
                style={{ width: 9.45, height: 17.55 }}
                source={require('../img/backButton.png')}
              />
            </View>
          </TouchableOpacity>

        {/* Title Section */}
          <View style={{ paddingLeft: 20, paddingRight: 20, borderBottomWidth: 0.5, borderColor: '#DFDFDF' }}>
            {/* Headline Title */}
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.headlineTextStyle}>{ranking}. {title}</Text>
            </View>
            {/* Information Section */}
            <HeadlineInfo
              heat={heat}
              nOfArticles={nOfArticles}
              nOfComments={nOfComments}
            />

{/*
            <Image
              style={{
                width: 330,
                height: 2,
                opacity: 0.5,
                paddingLeft: 20,
                paddingRight: 30
              }}
              source={require('../img/headlineElements/divider.png')}
            />
*/}
          </View>

          <ScrollView style={{ height: 250, flexGrow: 1 }}>
            <FlatList
              data={this.props.articles}
              renderItem={this.renderVertItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>

{/*
          <Carousel
            ref={(c) => { this._carousel = c; }}
            //data={tempData}
            data={this.props.articles}
            renderItem={this.renderItem}
            layout={'default'}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            //windowSize={1}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            carouselRef
          />
          {this.pagination}
*/}

        {/*  </View> */}
      </View>
    );
  }
}

const styles = {
  headerContainerStyle: {
    backgroundColor: '#FFF',
    //height: 275,
    paddingTop: 40,
    // paddingBottom: 20,
    position: 'relative',
  },
  headlineTextStyle: {
    fontFamily: 'Avenir-Black',
    fontSize: 26,
    color: '#404040',
    lineHeight: 30,
  },
  timeTextStyle: {
    fontFamily: 'Avenir-Book',
    fontSize: 14,
    color: '#808080'
  },
  articleTextStyle: {
    fontFamily: 'Avenir-Heavy',
    letterSpacing: -0.5,
    fontSize: 17,
    lineHeight: 22,
    color: '#404040',
    paddingRight: 40
  },
  articleVertTextStyle: {
    fontFamily: 'Avenir-Medium',
    letterSpacing: -0.5,
    fontSize: 15,
    lineHeight: 22,
    color: '#404040',
    paddingRight: 40
  },
  articleInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 3
  },
};

const mapStateToProps = state => {
  return {
    articles: state.feed.articles
  };
};

export default connect(mapStateToProps, { PostClose })(withNavigation(NewsHeader));
