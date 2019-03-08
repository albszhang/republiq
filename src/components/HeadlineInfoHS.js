import React, { Component } from 'react';
import { View, Text, Image, } from 'react-native';

let heatColor = '#AEAEAE';
let heatWord = 'Loading';
let heatImg = '../img/headlineElements/fire/default.png';

class HeadlineInfoHS extends Component {
  heatColorDecide() {
    if (this.props.heat === '1') {
      heatColor = '#FF5353';
      heatWord = 'Hot';
      return (
        <Image
          style={{ width: 11, height: 14.3 }}
          source={require('../img/headlineElements/fire/hot.png')}
        />
      );
    } else if (this.props.heat === '0') {
      heatColor = '#FFB053';
      heatWord = 'Warm';
      return (
        <Image
          style={{ width: 11, height: 14.3 }}
          source={require('../img/headlineElements/fire/warm.png')}
        />
      );
    } else if (this.props.heat === '-1') {
      heatColor = '#EFD02D';
      heatWord = 'Cool';
      return (
        <Image
          style={{ width: 11, height: 14.3 }}
          source={require('../img/headlineElements/fire/cool.png')}
        />
      );
    }
      return (
        <Image
          style={{ width: 11, height: 14.3 }}
          source={require('../img/headlineElements/fire/default.png')}
        />
      );
  }

  render() {
    return (
      <View style={styles.infoContainerStyle}>
        {/* Warmness */}
        <View style={styles.infoItemStyle}>
          <View style={{ paddingRight: 5 }}>
            {this.heatColorDecide()}
          </View>
          <Text
            style={{
              fontFamily: 'Avenir-Black',
              fontSize: 13,
              color: heatColor
            }}
          >
          {heatWord}</Text>
        </View>
        {/* Comments */}
        <View style={styles.infoItemStyle}>
          <View style={{ paddingRight: 5 }}>
            <Image
              style={{ width: 13, height: 12 }}
              source={require('../img/headlineElements/commentSymbol.png')}
            />
          </View>
          <Text style={styles.infoTextStyle}>{this.props.nOfComments}</Text>
        </View>
        {/* Articles */}

        <View style={styles.infoItemStyle}>
            <View style={{ paddingRight: 5 }}>
              <Image
                style={{ width: 11, height: 13 }}
                source={require('../img/headlineElements/articleSymbol.png')}
              />
            </View>
            <Text style={styles.infoTextStyle}>{this.props.nOfArticles}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  infoContainerStyle: {
    flexDirection: 'row'
  },
  infoTextStyle: {
    fontFamily: 'Avenir-Medium',
    fontSize: 13,
    color: '#666666'
  },
  infoItemStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 11
  },
  warmTextStyle: {
    fontFamily: 'Avenir-Black',
    fontSize: 13,
    color: '#FFB053' //<- placeholder color, this will become dynamic.
  },
};

export default HeadlineInfoHS;
