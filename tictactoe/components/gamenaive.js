'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Modal
} from 'react-native';

export default class GameNaive extends Component {
  constructor(props) {
    super(props);
    // cascade styles down
    styles = Object.assign(props.styles, styles);
    this.state = {
      turnCount: 0,
      winner: false,
      winnerText: '',
      tictactoe: {
        lastValue: null,
        row1: {col1: {value: null}, col2: {value: null}, col3: {value: null}},
        row2: {col1: {value: null}, col2: {value: null}, col3: {value: null}},
        row3: {col1: {value: null}, col2: {value: null}, col3: {value: null}},
    }};
  }
  render() {
    var underlayColor = '#14BDAC';
    return(
      <View style={styles.grid}>
        <View style={styles.row}>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noTopLine]} 
            onPress={this.onPress.bind(this,this.state.tictactoe.row1.col1)}>
            <Text style={styles.xo}>{this.state.tictactoe.row1.col1.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noTopLine]} 
            onPress={this.onPress.bind(this,this.state.tictactoe.row1.col2)}>
            <Text style={styles.xo}>{this.state.tictactoe.row1.col2.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noTopLine, styles.noRightLine]} 
            onPress={this.onPress.bind(this,this.state.tictactoe.row1.col3)}>
            <Text style={styles.xo}>{this.state.tictactoe.row1.col3.value}</Text></TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col} 
            onPress={this.onPress.bind(this,this.state.tictactoe.row2.col1)}>
            <Text style={styles.xo}>{this.state.tictactoe.row2.col1.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col}
            onPress={this.onPress.bind(this,this.state.tictactoe.row2.col2)}>
            <Text style={styles.xo}>{this.state.tictactoe.row2.col2.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noRightLine]}
            onPress={this.onPress.bind(this,this.state.tictactoe.row2.col3)}>
            <Text style={styles.xo}>{this.state.tictactoe.row2.col3.value}</Text></TouchableHighlight>
        </View>
        <View style={[styles.row, styles.noLine]}>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col}
            onPress={this.onPress.bind(this,this.state.tictactoe.row3.col1)}>
            <Text style={styles.xo}>{this.state.tictactoe.row3.col1.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={styles.col}
            onPress={this.onPress.bind(this,this.state.tictactoe.row3.col2)}>
            <Text style={styles.xo}>{this.state.tictactoe.row3.col2.value}</Text></TouchableHighlight>
          <TouchableHighlight underlayColor={underlayColor} style={[styles.col, styles.noRightLine]}
            onPress={this.onPress.bind(this,this.state.tictactoe.row3.col3)}>
            <Text style={styles.xo}>{this.state.tictactoe.row3.col3.value}</Text></TouchableHighlight>
        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.winner}
          onRequestClose={() => {alert("Modal has been closed.")}}>
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
  onPress(cell) {
    if (cell.value) return;
    
    this.state.turnCount += 1;
    if (this.state.lastValue == 'X') {
      cell.value = 'O';
    }
    else {
      cell.value = 'X';
    }

    this.state.lastValue = cell.value
    this.setState(cell);

    var winner = this.checkForWinner(this.state.tictactoe);
    if (winner) {
      this.setState({
        winner: true, 
        winnerText: winner + ' is the Winner!'});
    }
    else if (this.state.turnCount >= 9) {
      this.setState({
        winner: true, 
        winnerText: 'No Winner'});
    }
  }
  resetGame() {
    var ttt = this.state.tictactoe;
    ttt.row1.col1.value = ttt.row1.col2.value = ttt.row1.col3.value =
    ttt.row2.col1.value = ttt.row2.col2.value = ttt.row2.col3.value =
    ttt.row3.col1.value = ttt.row3.col2.value = ttt.row3.col3.value = null;
    this.state.turnCount = 0;
    this.setState({winner: false, ttt});
  }
  checkForWinner(grid) {
    if (grid.row1.col1.value && 
        grid.row1.col1.value === grid.row1.col2.value &&
        grid.row1.col1.value === grid.row1.col3.value)
        return grid.row1.col1.value;

    if (grid.row2.col1.value &&
        grid.row2.col1.value === grid.row2.col2.value &&
        grid.row2.col1.value === grid.row2.col3.value)
        return grid.row2.col1.value;

    if (grid.row3.col1.value &&
        grid.row3.col1.value === grid.row3.col2.value &&
        grid.row3.col1.value === grid.row3.col3.value)
        return grid.row3.col1.value;

    if (grid.row1.col1.value &&
        grid.row1.col1.value === grid.row2.col1.value &&
        grid.row1.col1.value === grid.row3.col1.value)
        return grid.row1.col1.value;

    if (grid.row1.col2.value &&
        grid.row1.col2.value === grid.row2.col2.value &&
        grid.row1.col2.value === grid.row3.col2.value)
        return grid.row1.col2.value;

    if (grid.row1.col3.value &&
        grid.row1.col3.value === grid.row2.col3.value &&
        grid.row1.col3.value === grid.row3.col3.value)
        return grid.row1.col3.value;

    if (grid.row1.col1.value &&
        grid.row1.col1.value === grid.row2.col2.value &&
        grid.row1.col1.value === grid.row3.col3.value)
        return grid.row1.col1.value;

    if (grid.row1.col3.value &&
        grid.row1.col3.value === grid.row2.col2.value &&
        grid.row1.col3.value === grid.row3.col1.value)
        return grid.row1.col3.value;
    
    return null;
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