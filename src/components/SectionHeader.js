import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

import {
  SortMethodSelected
} from '../actions';

class SectionHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      selected: this.props.sortMethod
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderSorter() {
    const { section } = this.props;
    if (section.title === 'DISCUSSION') {
      return (
        <View>
          {this.renderSortMethod()}
        </View>
      );
    } else {
      return (
        <View style={styles.sectionHeaderContainerStyle}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      );
    }
  }

  renderSortMethod() {
    const { sortMethod } = this.props;
    const { section } = this.props;
    if (sortMethod === 'TOP') {
      return (
        <View style={styles.sectionHeaderContainerStyle}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}
            style={{ flexDirection: 'row', paddingRight: 18 }}
          >
            <Image
              source={require('../img/sortButtons/topUnselect.png')}
              style={{ height: 12, width: 16.8 }}
            />
            <Text style={styles.sorterText}>{sortMethod} OPINIONS</Text>
            <View style={{ paddingTop: 3 }}>
              <Image
                source={require('../img/sortButtons/selectHeadline.png')}
                style={{ height: 7.5, width: 9 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (sortMethod === 'NEWEST') {
      return (
        <View style={styles.sectionHeaderContainerStyle}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}
            style={{ flexDirection: 'row', paddingRight: 18 }}
          >
            <Image
              source={require('../img/sortButtons/newestUnselect.png')}
              style={{ height: 14, width: 14 }}
            />
            <Text style={styles.sorterText}>{sortMethod} OPINIONS</Text>
            <View style={{ paddingTop: 3 }}>
              <Image
                source={require('../img/sortButtons/selectHeadline.png')}
                style={{ height: 7.5, width: 9 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderSelectedButton() {
    if (this.state.selected === 'TOP') {
      return (
        <View>
          <TouchableOpacity
            style={{ flexDirection: 'row', paddingLeft: 14, paddingTop: 20 }}
            onPress={() => {
              this.setState({ selected: 'NEWEST' })
            }}
          >
            <Image
              source={require('../img/sortButtons/newestUnselect.png')}
              style={{ height: 16, width: 16 }}
            />
            <Text style={styles.sorterModalText}>NEWEST</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingLeft: 14,
              paddingTop: 20,
              paddingBottom: 10
            }}
          >
            <Image
              source={require('../img/sortButtons/topSelect.png')}
              style={{ height: 12, width: 16.8 }}
            />
            <Text style={styles.sorterModalTextSelected}>TOP</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.selected === 'NEWEST') {
      return (
        <View>
          <TouchableOpacity
            style={{ flexDirection: 'row', paddingLeft: 14, paddingTop: 20 }}
          >
            <Image
              source={require('../img/sortButtons/newestSelect.png')}
              style={{ height: 16, width: 16 }}
            />
            <Text style={styles.sorterModalTextSelected}>NEWEST</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingLeft: 14,
              paddingTop: 20,
              paddingBottom: 10
            }}
            onPress={() => {
              this.setState({ selected: 'TOP' })
            }}
          >
            <Image
              source={require('../img/sortButtons/topUnselect.png')}
              style={{ height: 12, width: 16.8 }}
            />
            <Text style={styles.sorterModalText}>TOP</Text>
          </TouchableOpacity>
        </View>

      )
    }
  }

  render() {
    return (
      <View>
        <View style={{ height: 15, backgroundColor: '#F6F6F6' }} />
        {this.renderSorter()}

        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          style={{ justifyContent: 'flex-end' }}
        >
         <View
          style={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'column' }}
         >
         {/* HEADER */}
          <View
            style={{
              borderBottomWidth: 0.5,
              borderColor: '#E6E6E6',
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 14
            }}
          >
            <Text style={styles.sorterHeaderText}>Sort opinions by</Text>
          </View>

        {this.renderSelectedButton()}

          {/* DONE BUTTON */}
          <View style={{ padding: 14 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#EBEBEB',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8
              }}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
                this.props.SortMethodSelected(this.state.selected);
                this.props.refresh(this.state.selected);
              }}
            >
              <Text style={styles.doneText}>DONE</Text>
            </TouchableOpacity>
          </View>
         </View>
       </Modal>
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
    justifyContent: 'space-between',
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

  sorterText: {
    fontFamily: 'Avenir-Black',
    fontSize: 12,
    color: '#9E9E9E',
    paddingRight: 4,
    paddingLeft: 4
  },

  sorterModalText: {
    fontFamily: 'Avenir-Black',
    fontSize: 12,
    color: '#9E9E9E',
    paddingRight: 18,
    paddingLeft: 14
  },

  sorterModalTextSelected: {
    fontFamily: 'Avenir-Black',
    fontSize: 12,
    color: '#262626',
    paddingRight: 18,
    paddingLeft: 14
  },


  sorterHeaderText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    color: '#5E5E5E'
  },

  doneText: {
    fontFamily: 'Avenir-Black',
    fontSize: 13,
    color: '#7E7E7E',
  },

};

const mapStateToProps = state => {
  return {
    sortMethod: state.sort.sortMethod
  };
};

export default connect(mapStateToProps, { SortMethodSelected })(SectionHeader);
