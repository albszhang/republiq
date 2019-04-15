import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

// import { emailChanged } from '../actions';
// import LoginForm from '../components/LoginForm';

class SignInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      fadeAnim: new Animated.Value(0),
      //Initial value for opacity: 0
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }

  componentDidUpdate() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  }

//this is really horribly written code, but it's what i thought of first.
  pageData() {
    const { fadeAnim } = this.state;
    if (this.state.page === 1) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View />
          <Animated.View
            style={{
              flexDirection: 'column', alignItems: 'center', opacity: fadeAnim
            }}
          >
            <Text style={styles.headerStyle}>Welcome to Republiq.</Text>
            <Text style={styles.secondStyle}>A way to engage with the world.</Text>
          </Animated.View>
        </View>
      );
    } else if (this.state.page === 2) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View />
          <Animated.View
            style={{
              flexDirection: 'column', alignItems: 'center', paddingTop: 50, opacity: fadeAnim
            }}
          >
            <View
              style={{
                 paddingLeft: 60, paddingRight: 60, paddingBottom: 20, alignItems: 'center',
               }}
            >
              <Text style={styles.headerStyle}>News Made Simple.</Text>
              <Text style={styles.secondStyle}>
                We bring you the top stories of the day, intelligently aggregated from across the political spectrum.
              </Text>
            </View>
            <Image
              style={{ width: 223, height: 462 }}
              source={require('../img/onboarding/first.png')}
            />
          </Animated.View>
        </View>
      );
    } else if (this.state.page === 3) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View />
          <Animated.View
            style={{
              flexDirection: 'column', alignItems: 'center', paddingTop: 50, opacity: fadeAnim
            }}
          >
            <View
              style={{
                 paddingLeft: 60, paddingRight: 60, paddingBottom: 20, alignItems: 'center',
               }}
            >
              <Text style={styles.headerStyle}>Engage With Different Viewpoints</Text>
              <Text style={styles.secondStyle}>
                Get the hottest opinions on what’s happening.
              </Text>
            </View>
            <Image
              style={{ width: 223, height: 462 }}
              source={require('../img/onboarding/second.png')}
            />
          </Animated.View>
        </View>
      );
    } else if (this.state.page === 4) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View />
          <Animated.View
            style={{
              flexDirection: 'column', alignItems: 'center', paddingTop: 50, opacity: fadeAnim
            }}
          >
            <View
              style={{
                 paddingLeft: 60, paddingRight: 60, paddingBottom: 20, alignItems: 'center',
               }}
            >
              <Text style={styles.headerStyle}>Speak Your Mind.</Text>
              <Text style={styles.secondStyle}>
                Say what you think without the fear of backlash. Everyone is anonyous on Repubiq, and we’re commited to your privacy and free speech.
              </Text>
            </View>
            <Image
              style={{ width: 223, height: 462 }}
              source={require('../img/onboarding/third.png')}
            />
          </Animated.View>
        </View>
      );
    }
  }

  renderButton() {
    if (this.state.page >= 4) {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('SignInScreen');
          }}
        >
          <Image
            style={{ width: 46, height: 46 }}
            source={require('../img/onboarding/arrow.png')}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ page: this.state.page + 1, fadeAnim: new Animated.Value(0) });
          }}
        >
          <Image
            style={{ width: 46, height: 46 }}
            source={require('../img/onboarding/arrow.png')}
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.pageData()}
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  headerStyle: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 21,
    color: '#FF5353',
    textAlign: 'center'
  },
  secondStyle: {
    fontFamily: 'Avenir-Roman',
    fontSize: 16,
    color: '#555555',
    textAlign: 'center'
  },
  button: {
    shadowRadius: 20,
    shadowOpacity: 0.18,
    paddingBottom: 50,
  }
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(SignInScreen);
