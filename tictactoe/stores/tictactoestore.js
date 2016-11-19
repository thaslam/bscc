import { createStore } from 'redux';

const defaultState = {
  turnCount: 0,
  winner: false,
  winnerText: '',
  tictactoe: {
    lastValue: null,
    row1: {col1: {value: null}, col2: {value: null}, col3: {value: null}},
    row2: {col1: {value: null}, col2: {value: null}, col3: {value: null}},
    row3: {col1: {value: null}, col2: {value: null}, col3: {value: null}},
  }
};

// reducer
function ticTacToeStore(state = defaultState, action) {
  switch (action.type) {
    case 'MARK_CELL':
      return markCell(state, action.cell.row, action.cell.col);
    case 'CHECK_WINNER':
      return checkWinner(state);
    case 'RESET_GAME':
      return resetGame(state);
    default:
      return state;
  }
}

function resetGame(state) {
  let stateCopy = Object.assign({},state);
  stateCopy.winner = false;
  stateCopy.winnerText = 'false';
  stateCopy.turnCount = 0;
  stateCopy.tictactoe.row1.col1.value = stateCopy.tictactoe.row1.col2.value = stateCopy.tictactoe.row1.col3.value =
  stateCopy.tictactoe.row2.col1.value = stateCopy.tictactoe.row2.col2.value = stateCopy.tictactoe.row2.col3.value =
  stateCopy.tictactoe.row3.col1.value = stateCopy.tictactoe.row3.col2.value = stateCopy.tictactoe.row3.col3.value = null;
  
  return stateCopy;
}

function markCell(state, r, c) {
  let row = 'row' + r;
  let col = 'col' + c;
  let stateCopy = Object.assign({},state);
  if (stateCopy.tictactoe[row][col].value) return stateCopy;
  
  stateCopy.turnCount += 1;

  if (stateCopy.lastValue == 'X') stateCopy.tictactoe[row][col].value = '0';
  else stateCopy.tictactoe[row][col].value = 'X';

  stateCopy.lastValue = stateCopy.tictactoe[row][col].value;
  return stateCopy;
}

function checkWinner(state) {
  let stateCopy = Object.assign({}, state);
  var winner = evaluateForWinner(stateCopy.tictactoe);
  if (winner) {
    stateCopy.winner = true;
    stateCopy.winnerText = winner + ' is the Winner!';
  }
  else if (stateCopy.turnCount >= 9) {
    stateCopy.winner = true;
    stateCopy.winnerText = 'No Winner.'
  }
  return stateCopy;
}

function evaluateForWinner(grid) {
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

export default createStore(ticTacToeStore);