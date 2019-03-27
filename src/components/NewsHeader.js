import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Dimensions, WebView } from 'react-native';
import { withNavigation } from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
//import SafariView from 'react-native-safari-view';

import HeadlineInfo from './HeadlineInfo';

const tempData = [
  {
    id: 23452345,
    //index: 1,
    img: 'nytimes.png',
    time: '3 hours ago',
    url: 'https://www.nytimes.com/2018/12/31/us/politics/elizabeth-warren-2020-president-announcement.html',
    headline: 'Elizabeth Warren Announces Iowa Trip as She Starts Running for President in 2020'
  },
  {
    id: 5280326,
    //index: 2,
    img: 'nytimes.png',
    time: '3 hours ago',
    url: 'https://deadline.com/2019/03/elizabeth-warren-stephen-colbert-bill-barr-robert-mueller-report-donald-trump-video-1202582517/',
    headline:
    'Elizabeth Warren Tells Stephen Colbert She Does Not Trust Barr’s Mueller Report Recap'
  },
  {
    id: 3,
    //index: 3,
    img: 'nytimes.png',
    time: '3 hours ago',
    url: 'https://thehill.com/homenews/campaign/435768-elizabeth-warren-after-tmz-catches-her-sprinting-to-catch-train-try-and',
    headline: 'Elizabeth Warren after TMZ catches her sprinting to catch train: Try and Keep Up'
  },
  {
    id: 10,
    //index: -10,
    img: 'nytimes.png',
    time: '3 hours ago',
    url: 'https://www.nytimes.com/2018/12/31/us/politics/elizabeth-warren-2020-president-announcement.html',
    headline: 'testytest'
  },
];

class NewsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  openLink() {
    Linking.openURL(
      'https://www.nytimes.com/2018/12/31/us/politics/elizabeth-warren-2020-president-announcement.html'
    ).catch((err) => console.error('An error occurred', err));
    // SafariView.isAvailable()
    //  .then(SafariView.show({
    //    url: 'https://www.nytimes.com/2018/12/31/us/politics/elizabeth-warren-2020-president-announcement.html'
    //  }))
    //  .catch(() => {
    //    Linking.openURL(
    //      'https://www.nytimes.com/2018/12/31/us/politics/elizabeth-warren-2020-president-announcement.html'
    //    ).catch((err) => console.error('An error occurred', err));
    //  });
  }

  get pagination() {
        const { activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={tempData.length}
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

  renderItem({ item, index }) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          paddingBottom: 13,
          paddingLeft: 20,
          width: Dimensions.get('window').width,
        }}
        onPress={() => {
          Linking.openURL(item.url)
          .catch((err) => console.error('An error occurred', err));
        }}
      >
        {/* Article Info */}
        <View style={styles.articleInfoContainerStyle}>
          <View style={{ paddingRight: 8 }}>
            <Image
              style={{ width: 22.7, height: 25.3 }}
              source={{uri: 'https://firebasestorage.googleapis.com/v0/b/republiq-3a89c.appspot.com/o/newsIcons%2Fnytimes.png?alt=media&token=838be42d-e2ff-45ad-be73-b7decbcb3913'}}
            />
          </View>
          <View style={{ paddingRight: 8 }}>
            <Image
              style={{ width: 4, height: 4 }}
              source={require('../img/dotBig.png')}
            />
          </View>
          <Text style={styles.timeTextStyle}>3 hours ago</Text>
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
  render() {
    //const { navigation } = this.props;
    const title = this.props.navigation.getParam('title');
    const ranking = this.props.navigation.getParam('ranking');
    const heat = this.props.navigation.getParam('heat');
    const nOfArticles = this.props.navigation.getParam('nOfArticles');
    const nOfComments = this.props.navigation.getParam('nOfComments');
    console.log('navprops in newsheader success?', nOfArticles);
    return (
      <View style={styles.headerContainerStyle}>
        {/* <View style={{ paddingLeft: 20, }}>*/}
          <TouchableOpacity
            onPress={() => { this.props.nav.goBack(null); }}
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
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
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
          </View>

          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={tempData}
            renderItem={this.renderItem}
            layout={'default'}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            //windowSize={1}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
            carouselRef
          />
          {this.pagination}
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
    paddingBottom: 20,
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
  articleInfoContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8
  },
};
export default withNavigation(NewsHeader);
