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
  var solution = undefined; // fix me

  // if num is 0, 2, or 3
  if (num === 0 || num === 2 || num === 3) {
    var board = new Board({n: num});
    // return the solution
    return board.rows();
  }


  //create a recursive function with 3 params: rowIndex, columnIndex, board
  var innerFunc = function(rowIndex, colIndex, board) {
    //base case
    // if the current row is equel to num
    if (rowIndex === num) {
      // return the board
      solution = board.rows();
      return solution;
    }

    //recursive case
    // iterate over the row at the current rowIndex
    for (var i = 0; i < num; i++) {
      //toggle the element at the current rowIndex and columnIndex
      board.togglePiece(rowIndex, i);
      // if the board does not have any conflicts
      if (!board.hasAnyQueensConflicts()) {
        //invoke recursive function on rowIndex + 1, colIndex, board
        innerFunc(rowIndex + 1, colIndex, board);
        // if the solution is not undefined
        if (solution !== undefined) {
          // return the solution
          return solution;
        }
      }
      // untoggle the current element at rowIndex, columnIndex - we will hit this after we exit the previous recursive call
      board.togglePiece(rowIndex, i);
    }
  };
  //invoke the recursive function with rowIndex 0, colIndex 0, and empty board
  innerFunc(0, 0, new Board({n: num}));

  console.log('Single solution for ' + num + ' queens:', JSON.stringify(solution));
  // return the solution
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(num) {
  var solutionCount = 0; //fixme

  // if num is 0, 2, or 3
  if (num === 2 || num === 3) {
    // return the solutionCount
    return solutionCount;
  }


  //create a recursive function with 3 params: rowIndex, columnIndex, board
  var innerFunc = function(rowIndex, colIndex, board) {
    //base case
    // if the current row is equel to num
    if (rowIndex === num) {
      // increment solutionCount by 1
      solutionCount++;
      return;
    }

    //recursive case
    // iterate over the row at the current rowIndex
    for (var i = 0; i < num; i++) {
      //toggle the element at the current rowIndex and columnIndex
      board.togglePiece(rowIndex, i);
      // if the board does not have any conflicts
      if (!board.hasAnyQueensConflicts()) {
        //invoke recursive function on rowIndex + 1, colIndex, board
        innerFunc(rowIndex + 1, colIndex, board);
      }
      // untoggle the current element at rowIndex, columnIndex - we will hit this after we exit the previous recursive call
      board.togglePiece(rowIndex, i);
    }
  };
  //invoke the recursive function with rowIndex 0, colIndex 0, and empty board
  innerFunc(0, 0, new Board({n: num}));

  console.log('Number of solutions for ' + num + ' queens:', solutionCount);
  return solutionCount;
};
