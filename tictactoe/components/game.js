'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Modal
} from 'react-native';

import store from '../stores/tictactoestore';

export default class Game extends Component {
  constructor(props) {
    super(props);
    // cascade styles down
    styles = Object.assign(props.styles, styles);
    this.state = store.getState();
    
    store.subscribe(() => {
      this.setState(store.getState());
    }).bind(this);
  }
  render() {
    var underlayColor = '#14BDAC';
    return(
      <View style={styles.grid}>
        <View style={styles.row}>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noTopLine]} 
            onPress={this.onMark.bind(this,1,1)}>
            <Text style={styles.xo}>{this.state.tictactoe.row1.col1.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noTopLine]} 
            onPress={this.onMark.bind(this,1,2)}>
            <Text style={styles.xo}>{this.state.tictactoe.row1.col2.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noTopLine, styles.noRightLine]} 
            onPress={this.onMark.bind(this,1,3)}>
            <Text style={styles.xo}>{this.state.tictactoe.row1.col3.value}</Text></TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col} 
            onPress={this.onMark.bind(this,2,1)}>
            <Text style={styles.xo}>{this.state.tictactoe.row2.col1.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col}
            onPress={this.onMark.bind(this,2,2)}>
            <Text style={styles.xo}>{this.state.tictactoe.row2.col2.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noRightLine]}
            onPress={this.onMark.bind(this,2,3)}>
            <Text style={styles.xo}>{this.state.tictactoe.row2.col3.value}</Text></TouchableHighlight>
        </View>
        <View style={[styles.row, styles.noLine]}>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col}
            onPress={this.onMark.bind(this,3,1)}>
            <Text style={styles.xo}>{this.state.tictactoe.row3.col1.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col}
            onPress={this.onMark.bind(this,3,2)}>
            <Text style={styles.xo}>{this.state.tictactoe.row3.col2.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noRightLine]}
            onPress={this.onMark.bind(this,3,3)}>
            <Text style={styles.xo}>{this.state.tictactoe.row3.col3.value}</Text></TouchableHighlight>
        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.winner}>
          <View style={styles.modal}>
            <View>
              <TouchableHighlight style={styles.winnerButton} 
                onPress={this.onReset.bind(this)}
                onLongPress={() => {return false;}}>
                <Text style={styles.winnerText}>{this.state.winnerText}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  onMark(row,col) {
    var cell = {row: row, col: col};
    store.dispatch({
      type: 'MARK_CELL',
      cell
    });
    store.dispatch({
      type: 'CHECK_WINNER'
    });
  }
  onReset() {
    store.dispatch({
      type: 'RESET_GAME'
    });
  }
  componentDidMount() {
    // 
  }
}

var styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    backgroundColor: '#119E90',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  col: {
    marginRight: 7,
    marginTop: 7,
    width: 100,
    height: 100,
    backgroundColor: '#14BDAC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  xo: {
    color: '#0D7F74',
    fontWeight: 'bold',
    fontSize: 56,
    fontFamily: 'ChalkboardSE-Regular'
  },
  noRightLine: {
    marginRight: 0
  },
  noTopLine: {
    marginTop: 0
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerButton: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    backgroundColor: '#E97508'
  },
  winnerText: {
    color: '#ffffff',
    fontSize: 36,
    fontFamily: 'ChalkboardSE-Regular'
  }
});