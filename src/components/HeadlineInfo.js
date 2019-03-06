import React from 'react';
import { View, Text, Image, } from 'react-native';

const HeadlineInfo = () => {
  return (
    <View style={styles.infoContainerStyle}>
      {/* Warmness */}
      <View style={styles.infoItemStyle}>
        <View style={{ paddingRight: 5 }}>
          <Image
            style={{ width: 11, height: 14.3 }}
            source={require('../img/headlineElements/fire/warm.png')}
          />
        </View>
        <Text style={styles.warmTextStyle}>Warm</Text>
      </View>
      {/* Comments */}
      <View style={styles.infoItemStyle}>
        <View style={{ paddingRight: 5 }}>
          <Image
            style={{ width: 13, height: 12 }}
            source={require('../img/headlineElements/commentSymbol.png')}
          />
        </View>
        <Text style={styles.infoTextStyle}>Comments</Text>
      </View>
      {/* Articles */}

      <View style={styles.infoItemStyle}>
          <View style={{ paddingRight: 5 }}>
            <Image
              style={{ width: 11, height: 13 }}
              source={require('../img/headlineElements/articleSymbol.png')}
            />
          </View>
          <Text style={styles.infoTextStyle}>Articles</Text>
      </View>
    </View>
  );
};

const styles = {
  infoContainerStyle: {
    paddingTop: 4,
    paddingBottom: 11,
    flexDirection: 'row'
  },
  infoTextStyle: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
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
    fontSize: 14,
    color: '#FFB053' //<- placeholder color, this will become dynamic.
  },
};

export default HeadlineInfo;
