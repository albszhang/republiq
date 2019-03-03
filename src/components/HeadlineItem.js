import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class HeadlineItem extends Component {
  render() {
    const { index, item, navigation } = this.props;

    return (
      <View style={{ backgroundColor: 'white' }} key={index}>
        <TouchableOpacity
          style={styles.headlineContainerStyle}
          onPress={() => { navigation.navigate('News'); }}
        >
          <View style={styles.innerStyle}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.numberStyle}>{item.order}</Text>
              <Text style={styles.headlineStyle}>{item.headline}</Text>
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
    paddingTop: 26,
  },

  innerStyle: {
    marginLeft: 18,
    paddingRight: 18,
    paddingBottom: 26,
    borderBottomWidth: 0.5,
    borderColor: '#DFDFDF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  numberStyle: {
    fontFamily: 'Avenir-Black',
    fontSize: 15,
    color: '#FF5353'
  },

  headlineStyle: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 14,
    color: '#393939',
    paddingLeft: 12
  },
};

export default HeadlineItem;
