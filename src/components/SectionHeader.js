import React, { Component } from 'react';
import { View, Text } from 'react-native';

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
    paddingTop: 11,
    paddingBottom: 11,
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
