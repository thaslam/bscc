/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Game from './components/game';

export default class tictactoe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>TicTacToe</Text>
        <View style={styles.body}>
          <Game styles={styles} />
        </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14BDAC',
  },
  body: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center'
  },
  header: {
    color: '#ffffff',
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
    marginTop: 80,
    fontFamily: 'Noteworthy-Bold'
  },
});

AppRegistry.registerComponent('tictactoe', () => tictactoe);
