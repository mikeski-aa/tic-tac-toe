//  function to create a 2d array of the game space
function gameBoard (){
    const rows = 3; 
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
//  at each array position in original board array, the for loop creates a new array
//  this is denoted by []
//  adding items to the new array within each board[i] location creates a 2D array of the board
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(addVal().getVal());
        }
    }

//  this allows for extracting the gameboard.
    const getBoard = () => board;

// this will allow us to mark spots on the board
    const markBoard = (yCord, xCord) => {

        console.log(board[0][0]);
        if (board[yCord][xCord] !== '0') {return (console.log('error not empty'))}
        
        gameTurn();
        val.addMarker(currTurn.value);
        board[yCord][xCord] = val.getVal();
        printBoard();   
    }

// this function will print the game board
    function printBoard(){
        console.table(getBoard());
    }

    return {getBoard, printBoard, markBoard};
    
} 

// adds value to array

const addVal = () => {
    let value = '0';
    
    const addMarker = (x) => {
        value = x;
    }

    const getVal = () => value;
    return ({getVal, addMarker});
}
// create two players for the game

const createPlayers = () => {

        function player(name, val) {
            const value = val;
            return {name, value};
        }
        
        let players = {
            p1: player('Mike', 1),
            p2: player('Joe', 2)
        };

        const gTest = () => players;
        return {gTest}
}
//  figure out who's turn it is to play the game

function playerTurn() {
    let tCount = 0;
    currTurn = createPlayers().gTest().p1

     function next(){
        if (tCount === 0 || tCount%2 === 0) {
            tCount += 1;
            console.log(`the tcount is ${tCount}`);
            return (currTurn = createPlayers().gTest().p1);
            
        } else {
            console.log(`Current t score is ${tCount}`);
            tCount += 1;
            return (currTurn = createPlayers().gTest().p2);
        }
    }

    const getNextPlayer = () => next();
    return (getNextPlayer);
}

//  finding win conditions in the board array
//  win condition is same type of marker either in one row, column or diagonally

function checkWin(){
let winStat = false;
//  for loop to check winner in each row  
    for (let i=0; i<3; i++){
        let tempArr = myboard.getBoard()[i];
        checkArrMatch(tempArr);
    }

    for (let i=0; i<3; i++){
        let tempArr = [];
        tempArr.push(myboard.getBoard()[0][i]);
        tempArr.push(myboard.getBoard()[1][i]);
        tempArr.push(myboard.getBoard()[2][i]);
        console.log(`${i} column values are ${tempArr}`);
        checkArrMatch(tempArr);
    }

//  check diagonally if [0][0], [1][1], [2][2] are the same
    (function checkDiag() {
        let tempArr = [];
        for (let i = 0; i < 3; i++){
            
            tempArr.push(myboard.getBoard()[i][i]);
            console.log(tempArr);
        }
    checkArrMatch(tempArr);
})();
//  and if [0][2], [1][1], [2][0] diag match
    (function checkDiag() {
        let tempArr = [];
        tempArr.push(myboard.getBoard()[0][2]);
        tempArr.push(myboard.getBoard()[1][1]);
        tempArr.push(myboard.getBoard()[2][0]);
        console.log(tempArr);
        checkArrMatch(tempArr);
})();

return ({winStat});
}
 

function checkArrMatch(tempArr) {
    if (tempArr.filter((x) => x === createPlayers().gTest().p1.value).length === 3) {
        console.log(`3 match! ${createPlayers().gTest().p1.name} is the winner!`);
//  rest of the game needs to be notified that a winner was found
        return (winStat = true);
    } else if (tempArr.filter((x) => x === createPlayers().gTest().p2.value).length === 3) {
        console.log(`3 match! ${createPlayers().gTest().p2.name} is the winner!`);
//  rest of the game needs to be notified that a winner was found
        return (winStat = true);
    }
}
  
(function gameLoop(){
    // let val = addVal();
    // let myboard = gameBoard();
    // let gameTurn = playerTurn();

    gameBoard().printBoard();
    console.log(`${createPlayers().gTest().p1.name} will be going first`)
})();
  

//  declare stuff here

// let players = createPlayers();


//  for (x of myboard.getBoard()) { console.log(x)}
//  for (x of myboard.getBoard()[1]) { console.log([x])}

// myboard.markBoard(0, 0);
// myboard.markBoard(0, 2);
// myboard.markBoard(2, 0);
// myboard.markBoard(2, 1);
// myboard.markBoard(2, 2);





//for testing rows p1 win:
// myboard.markBoard(0,0);
// myboard.markBoard(1,0);
// myboard.markBoard(0,1);
// myboard.markBoard(2,0);
// myboard.markBoard(0,2);

//for testing rows p2 win
// myboard.markBoard(1,0);
// myboard.markBoard(0,0);
// myboard.markBoard(2,0);
// myboard.markBoard(0,1);
// myboard.markBoard(2,2);
// myboard.markBoard(0,2);

//for testing cols p1 win
// myboard.markBoard(0,1);
// myboard.markBoard(0,0);
// myboard.markBoard(1,1);
// myboard.markBoard(0,2);
// myboard.markBoard(2,1);


// for testing diag 
// myboard.markBoard(0,0);
// myboard.markBoard(0,1);
// myboard.markBoard(1,1);
// myboard.markBoard(0,2);
// myboard.markBoard(2,2);

// for testing diag other way
// myboard.markBoard(0,2);
// myboard.markBoard(0,1);
// myboard.markBoard(1,1);
// myboard.markBoard(2,2);
// myboard.markBoard(2,0);