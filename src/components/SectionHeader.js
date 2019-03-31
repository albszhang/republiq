import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

class SectionHeader extends Component {
  render() {
    const { section } = this.props;

    return (
      <View style={styles.sectionHeaderPadding}>
        <View style={styles.sectionHeaderContainerStyle}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  sectionHeaderPadding: {
    paddingTop: 15
  },

  sectionHeaderContainerStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    ...ifIphoneX({
      paddingTop: 15,
      paddingBottom: 11,
    }, {
      paddingTop: 11,
      paddingBottom: 11,
    }),
    // paddingTop: 11,
    // paddingBottom: 11,
    borderBottomWidth: 0.5,
    borderColor: '#DFDFDF',
  },

  sectionHeaderText: {
    fontFamily: 'Avenir-Black',
    fontSize: 12,
    color: '#595959'
  },
};

export default SectionHeader;
