import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { WebBrowser } from 'expo';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null
    };
  }

  _handlePressButtonAsync = async () => {
     let result = await WebBrowser.openBrowserAsync(
       'https://firebasestorage.googleapis.com/v0/b/republiq-3a89c.appspot.com/o/Privacy%20Policy.pdf?alt=media&token=2856b513-605e-48ae-9017-72ea8b6f327b'
     );
     this.setModalVisible(!this.state.modalVisible);
     this.setState({ result });
   };

  render() {
    return (
      <ImageBackground
        source={require('../img/background.jpg')} style={{ width: '100%', height: '100%' }}
      >
        <View style={{ flex: 1, justifyContent: 'space-between' }}>

          <View>
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

          <TouchableOpacity
            onPress={this._handlePressButtonAsync}
          >
            <Text style={styles.footerTextStyle}>Privacy Policy</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  }
}

const styles = {
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

  settingsTextStyle: {
    fontSize: 25,
    fontFamily: 'Avenir-Black',
    color: 'white',
  },

  footerTextStyle: {
    fontSize: 15,
    fontFamily: 'Avenir-Roman',
    color: 'white'
  },
};


export default SettingsScreen;
