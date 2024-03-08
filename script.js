//  function to create a 2d array of the game space
const gameBoard = () => {
    const rows = 3; 
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
//  at each array position in original board array, the for loop creates a new array
//  this is denoted by []
//  adding items to the new array within each board[i] location creates a 2D array of the board
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(val.getVal());
        }
    }

//  this allows for extracting the gameboard.
    const getBoard = () => board;

// this will allow us to mark spots on the board
    const markBoard = (xCord, yCord) => {

        console.log(board[0][0]);
        if (board[xCord][yCord] !== '0') {return (console.log('error not empty'))}
        
        gameTurn();
        val.addMarker(currTurn.value);
        board[xCord][yCord] = val.getVal();
        printBoard();
        
        
    }

// this function will print the game board
    function printBoard(){
        console.table(getBoard());
    }

    return ({getBoard, printBoard, markBoard});
    
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
//  figure out whos turn it is to play the game

function playerTurn() {
    let tCount = 0;

     function next(){
        if (tCount === 0 || tCount%2 === 0) {
            tCount += 1;
            console.log('Count is zero or even');
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

    
    for (let i=0; i<3; i++){
        let temp = myboard.getBoard()[i].filter((x) => x === createPlayers().gTest().p1.value);
        console.log(`Row ${i} - value 1 - length ${temp.length}`);
        let temp2 = myboard.getBoard()[i].filter((x) => x === createPlayers().gTest().p2.value);
        console.log(`Row ${i} - value 2 - length ${temp2.length}`);
        
        if (temp.length = 3 && temp.filter((x) => x === 1)){
            console.log(`${createPlayers().gTest().p1.name} is the winner`)       
//  rest of the game needs to be notified that a winner was found
            return;
        } else if ((temp2.length = 3)) {
            console.log(`${createPlayers().gTest().p2.name} is the winner`) 
//  rest of the game needs to be notified that a winner was found
            return;
        }
    }

//  check diagonally if [0][0], [1][1], [2][2] are the same
//  and if [0][2], [1][1], [2][0]

    let temp = [];
    for (let i = 0; i < 3; i++){
        
        temp.push(myboard.getBoard()[i][i]);
        console.log(temp);  
  
}

}

//  declare stuff here

// let players = createPlayers();
let val = addVal();
let myboard = gameBoard();
let gameTurn = playerTurn();

//  for (x of myboard.getBoard()) { console.log(x)}
//  for (x of myboard.getBoard()[1]) { console.log([x])}

// myboard.markBoard(0, 0);
// myboard.markBoard(0, 2);
// myboard.markBoard(0, 1);
// myboard.markBoard(2, 1);
// myboard.markBoard(2, 1);