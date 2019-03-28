import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, InputAccessoryView, Button } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

const uuidv4 = require('uuid/v4');

class NotifScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      ranking: '',
      heat: '',
      nOfComments: '',
      nOfArticles: '',
      id: uuidv4(),
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      msg: true,
      success: false,
      error: false,

      text: ''
    };
  }

  onButtonPress() {
    //const news = firebase.firestore().collection('news');
    // firebase.firestore().collection('news').doc('2019-03-08').collection('headlines')
    firebase.firestore().collection('currentHeadlines')
    .doc(`${this.state.title}`)
      .set({
        title: this.state.title,
        ranking: this.state.ranking,
        heat: this.state.heat,
        nOfComments: this.state.nOfComments,
        nOfArticles: this.state.nOfArticles,
        id: this.state.id,
        dateCreated: this.state.dateCreated
      })
      .then(this.setState({
        title: '',
        ranking: '',
        heat: '',
        nOfComments: '',
        nOfArticles: '',
        id: uuidv4(),
        dateCreated: this.state.dateCreated,
        msg: true,
        success: true,
        error: false,
      }))
    .catch(this.setState({
      title: '',
      ranking: '',
      heat: '',
      nOfComments: '',
      nOfArticles: '',
      id: uuidv4(),
      dateCreated: this.state.dateCreated,
      msg: true,
      success: true,
      error: false
    }));
  }

  buttonResponse() {
    return (
      <View>
        {(this.state.msg === false) ? (<View></View>) :
          (this.state.success === true) ?
            (<Text style={styles.successTextStyle}>Success</Text>) :
            (<Text style={styles.errorTextStyle}>Error</Text>)
        }
      </View>
    );
  }


  testId() {
    console.log(uuidv4());
    console.log(firebase.firestore().Timestamp);
    return (
      <Text>{uuidv4()}</Text>
    );
  }

//THIS IS WHAT YOU WILL USE ON WEBSITE TO UPDATE ALL POSTS WHEN YOU
//CHANGE THE RANKING OF DIFFERENT HEADLINES. YOU NEED TO MAKE IT
//DYNAMIC THOUGH.
  testFireUpdate() {
    firebase.firestore().collection('posts')
      .where('topic', '==', 'Trump Cabinet Meeting')
      .get()
      .then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          console.log('testFireUpdate if exists', doc.data());
          const postObj = doc.data();

          firebase.firestore().collection('posts').doc(doc.id)
          .update({ ranking: 5 })
          .catch((error) => console.log(error));
        }
      });
    })
    .catch((error) => console.log(error));
  }

  renderTime() {
    const stringDate = new Date().toISOString();
    const date = new Date(`${stringDate}`);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    return (
      <Text>{year}-{month}-{dt}</Text>
    );
  }

  render() {
    const inputAccessoryViewID = 'inputAccessoryView1';
    return (
      <View style={styles.container}>
        <View style={styles.inputContainerStyle}>
          <TextInput
            value={this.state.title}
            style={styles.inputStyle}
            placeholder={'Title'}
            onChangeText={(text) => this.setState({ title: text })}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            value={this.state.ranking}
            style={styles.inputStyle}
            placeholder={'Ranking'}
            onChangeText={(text) => this.setState({ ranking: text })}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            value={this.state.heat}
            style={styles.inputStyle}
            placeholder={'heat'}
            onChangeText={(text) => this.setState({ heat: text })}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            value={this.state.nOfComments}
            style={styles.inputStyle}
            placeholder={'nOfComments'}
            onChangeText={(text) => this.setState({ nOfComments: text })}
          />
        </View>
        <View style={styles.inputContainerStyle}>
          <TextInput
            value={this.state.nOfArticles}
            style={styles.inputStyle}
            placeholder={'nOfArticles'}
            onChangeText={(text) => this.setState({ nOfArticles: text })}
          />
        </View>
        <View style={{ paddingTop: 15 }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.onButtonPress.bind(this)}
          >
            <Text style={styles.buttonTextStyle}>Send Headline Data</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 15 }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.testFireUpdate.bind(this)}
          >
            <Text style={styles.buttonTextStyle}>Update Data?</Text>
          </TouchableOpacity>
        </View>
        {this.buttonResponse()}
        <Text>NOTIFSSCREEEN</Text>
        {this.renderTime()}
        {this.testId()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    paddingTop: 30
  },
  inputContainerStyle: {
    height: 40,
    width: 200,
    paddingTop: 25,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTestContainerStyle: {
    flex: 1,
    height: 150,
    paddingTop: 25,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputTestStyle: {
    flex: 2,
    height: 500,
    color: '#4D4D4D',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    backgroundColor: '#ECECEC'
  },
  inputStyle: {
    flex: 2,
    height: 40,
    color: '#4D4D4D',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    fontFamily: 'Avenir-Book',
    backgroundColor: '#ECECEC'
  },
  buttonStyle: {
    height: 35,
    width: 200,
    borderRadius: 100,
    backgroundColor: '#21E1BE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    fontFamily: 'Avenir',
    fontSize: 14,
    color: 'white'
  },
  successTextStyle: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 14,
    color: '#3EC300'
  },
  errorTextStyle: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 14,
    color: '#E44B1B'
  },
};

export { NotifScreen };
