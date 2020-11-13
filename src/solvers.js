/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(num) {
  // create a row and column variable and set to 0
  var rowIndex = 0;
  var colIndex = 0;
  // create a new board of size n
  var solution = new Board({n: num});
  // if n is 0
  if (num === 0) {
    // return solution
    return solution;
  }
  // as long as row and column are less than n
  while (rowIndex < num && colIndex < num) {
    // change the element at the row + 1 and column + 1 to a 1
    solution.togglePiece(rowIndex, colIndex);
    // increase row and column by 1
    rowIndex++;
    colIndex++;
  }

  console.log('Single solution for ' + num + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //edge case: if n = 0
  if (n === 0) {
    //console log the result
    console.log('Number of solutions for ' + n + ' rooks:', 0);
    //return 0
    return 0;
  }
  //create counter variable
  var counter = n;
  //set solution count equal to 1
  var solutionCount = 1;
  //as long as n is greater than zero
  while (counter > 0) {
    //increase the value of solution count by multiple of n
    solutionCount *= counter;
    //decrease n by 1
    counter--;
  }
  //return solution count
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(num) {
  // set the solution to a new board with size n
  // var solution = new Board();

  // if n is 0
  if (num === 0) {
    var board = new Board({n: num});
    // return the solution
    return board.rows();
  }


  //create a recursive function with 3 params: rowIndex, columnIndex, board
  var innerFunc = function(rowIndex, colIndex, board) {
    //base case: if the rowIndex and colIndex are out of bounds
    // if (!board._isInBounds(rowIndex, colIndex)) {
    //   //just return
    //   return;
    // }
    //base case: if the number of pieces on board is equal to n and there are no conflicts
    if (_.reduce(_.flatten(board.rows()), function(memo, number) { return memo + number; }, 0) === num && !board.hasAnyQueensConflicts()) {
      //return the board
      return board;
    }
    //recursive case: iterate over the row at the current rowIndex
    for (var i = 0; i < num; i++) {
      //toggle the element at the current rowIndex and columnIndex
      board.togglePiece(rowIndex, i);
      //invoke recursive function on rowIndex + 1, colIndex, board
      innerFunc(rowIndex + 1, colIndex, new Board(board.rows()));
      //untoggle the current element at rowIndex, columnIndex
      board.togglePiece(rowIndex, i);
    }
  };
  //invoke the recursive function with rowIndex 0, colIndex 0, and empty board
  debugger;
  var solution = innerFunc(0, 0, new Board({n: num}));

  console.log('Single solution for ' + num + ' queens:', JSON.stringify(solution));
  // return the solution
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
