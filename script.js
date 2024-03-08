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

        return {players}
}
// figure out whos turn it is to play the game

function playerTurn() {
    let tCount = 0;

     function win(){
        if (tCount === 0 || tCount%2 === 0) {
            tCount += 1;
            console.log('Count is zero or even');
            return (currTurn = players.players.p1);
            
        } else {
        console.log(`Current t score is ${tCount}`);
        tCount += 1;
        return (currTurn = players.players.p2);
        }
    }

    const getNextPlayer = () => win();

    return (getNextPlayer);
}


// declare stuff here

let players = createPlayers();
let val = addVal();
let myboard = gameBoard();
let gameTurn = playerTurn();

// let pTurn = () => {
//     if (tCount === 0){
//         pTurn = players.players.p2
//         ++tCount;
//     } else {
//         pTurn = players.players.p1
//         ++tCount;
//     }}  


// const gettCount = () => tCount;
// const getpTurn = () => pTurn();
// return {gettCount, getpTurn};