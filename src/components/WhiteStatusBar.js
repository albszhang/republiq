import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform
} from 'react-native';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class WhiteStatusBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

export default WhiteStatusBar;
