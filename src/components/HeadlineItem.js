import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import HeadlineInfoHS from './HeadlineInfoHS';

let heatColor = '#404040';

class HeadlineItem extends Component {
  heatColorDecide() {
    console.log('is there heat here?', this.props.item.heat);
    if (this.props.item.heat === '1') {
      console.log('HEATHEAT', this.props.item.heat);
      heatColor = '#FF5353';
    } else if (this.props.item.heat === '0') {
      heatColor = '#FFB053';
    } else if (this.props.item.heat === '-1') {
      heatColor = '#EFD02D';
    } 
  }
  render() {
    const { index, item, navigation } = this.props;
    this.heatColorDecide();
    return (
      <View style={{ backgroundColor: 'white' }} key={index}>
        <TouchableOpacity
          style={styles.headlineContainerStyle}
          onPress={() => { navigation.navigate('News'); }}
        >
          <View style={styles.innerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: 'Avenir-Black',
                  fontSize: 15,
                  color: heatColor
                }}
              >
              {item.ranking}.</Text>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex_start',
                  paddingLeft: 12
                }}
              >
                <Text style={styles.headlineStyle}>{item.title}</Text>
                <HeadlineInfoHS
                  heat={item.heat}
                  nOfComments={item.nOfComments}
                  nOfArticles={item.nOfArticles}
                />
              </View>
            </View>
            <Image
              style={{ width: 6, height: 12, right: 10 }}
              source={require('../img/headlineArrow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  headlineContainerStyle: {
    backgroundColor: 'white',
    paddingTop: 18,
  },

  innerStyle: {
    marginLeft: 18,
    paddingRight: 18,
    paddingBottom: 18,
    borderBottomWidth: 0.5,
    borderColor: '#DFDFDF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  numberStyle: {
    fontFamily: 'Avenir-Black',
    fontSize: 15,
    color: heatColor
  },

  headlineStyle: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 14,
    color: '#393939',
    //paddingLeft: 12
  },
};

export default HeadlineItem;
