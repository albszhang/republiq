import React, { Component } from 'react';
import { View, Text, SectionList } from 'react-native';

const newTasks = [
  { id: 2, title: 'Wax on' },
  { id: 3, title: 'Wax off' },
  { id: 17, title: 'Wax on' },
  { id: 18, title: 'Wax off' },
  { id: 19, title: 'Wax on' },
  { id: 20, title: 'Wax off' },
  { id: 21, title: 'Wax on' },
  { id: 22, title: 'Wax off' },
  { id: 23, title: 'Wax on' },
  { id: 24, title: 'Wax off' },
  { id: 25, title: 'Wax on' },
  { id: 26, title: 'Wax off' },
  { id: 27, title: 'Wax on' },
  { id: 28, title: 'Wax off' },
];

const completedTasks = [
  { id: 1, title: 'Watch Karate Kid' },
  { id: 4, title: 'Watch Karate Kid' },
  { id: 5, title: 'Watch Karate Kid' },
  { id: 6, title: 'Watch Karate Kid' },
  { id: 7, title: 'Watch Karate Kid' },
  { id: 8, title: 'Watch Karate Kid' },
  { id: 9, title: 'Watch Karate Kid' },
  { id: 10, title: 'Watch Karate Kid' },
  { id: 11, title: 'Watch Karate Kid' },
  { id: 12, title: 'Watch Karate Kid' },
  { id: 13, title: 'Watch Karate Kid' },
  { id: 14, title: 'Watch Karate Kid' },
  { id: 15, title: 'Watch Karate Kid' },
  { id: 16, title: 'Watch Karate Kid' },
];

class NotifScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NOTIFSSCREEEN</Text>
        <SectionList
          sections={[
            { title: 'New Tasks', data: newTasks },
            { title: 'Completed tasks', data: completedTasks}
          ]}
          renderItem={({ item }) => (
            <Text>{item.title}</Text>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={{ fontWeight: 'bold' }}>{section.title}</Text>
          )}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
};

export { NotifScreen };
