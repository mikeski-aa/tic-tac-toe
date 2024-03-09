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
            board[i].push('0');
        }
    }

//  this allows for extracting the gameboard.
    const getBoard = () => board;
// this will allow us to mark spots on the board
    const markBoard = (yCord, xCord) => {

        console.log(board[0][0]);
        if (board[yCord][xCord] !== '0') {return (console.log('error not empty'))}
        
        board[yCord][xCord] = newcurr.val(); 
    }
// this function will print the game board
    const printBoard = () =>{
        console.table(getBoard());
    }
    return {getBoard, printBoard, markBoard};
} 

function createPlayer1(pname){
    const name = () => pname;
    const val = () => 1;
    return {name, val};
}

function createPlayer2(pname){
    const name = () => pname;
    const val = () => 2;
    return {name, val};
}
//create players here
const player1 = createPlayer1('Mike');
const player2 = createPlayer2('Jilf');

// swap players - not first curr has to be P1 later on
let newcurr ='';

function switchPlayer(curr){
    if (curr === player1) {curr = player2} else {curr = player1}
    return (newcurr = curr);
}
function checkWin(){
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
            checkArrMatch(tempArr);
        }
    
//  check diagonally if [0][0], [1][1], [2][2] are the same
        (function checkDiag() {
            let tempArr = [];
            for (let i = 0; i < 3; i++){
                
                tempArr.push(myboard.getBoard()[i][i]);        
            }
        checkArrMatch(tempArr);
    })();
//  and if [0][2], [1][1], [2][0] diag match
        (function checkDiag() {
            let tempArr = [];
            tempArr.push(myboard.getBoard()[0][2]);
            tempArr.push(myboard.getBoard()[1][1]);
            tempArr.push(myboard.getBoard()[2][0]);          
            checkArrMatch(tempArr);
    })();
//  checks for a tie
    (function tieCheck(){

        let counter = 0;
        for (x of myboard.getBoard()) {
            y = x.filter((x) => x === '0');
            counter += y.length;
        }
        console.log(`Amount of available spaces is: ${counter}`);
        if (counter === 0) {return(alert('We have a tie'))} else {console.log('NO TIE, GAME ON!')}
    
    })();

    function checkArrMatch(tempArr) {
        if (tempArr.filter((x) => x === player1.val()).length === 3) {
         for (let i = 0; i < 5; i++ ){
            console.log(`${i}, We have a winner WOOO - the winner is ${newcurr.name()}`)}
            return (winStat = true);
        } else if (tempArr.filter((x) => x === player2.val()).length === 3) {
            for (let i = 0; i < 5; i++ ){
            console.log(`${i}, We have a winner WOOO - the winner is ${newcurr.name()}`)}
            return (winStat = true);
        }
        
    }
    if (winStat === true) {console.log('GAME OVER')}
    }

const myboard = gameBoard();
let winStat = false;

//test the game
function playGame(){


    console.log('Time to play Tic Tac Toe');
    console.log(`Player 1 is ${player1.name()}`);
    console.log(`Player 2 is ${player2.name()}`);

    console.table(myboard.printBoard());
    newcurr = player1;
    console.log('Player 1 type the coordinates of your move!')

    myboard.markBoard(0,2);;;
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);

    myboard.markBoard(0,1);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);

    myboard.markBoard(1,1);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);

    myboard.markBoard(2,2);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);

    myboard.markBoard(2,1);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);
    
    myboard.markBoard(2,0);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);

    myboard.markBoard(0,0);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);

    myboard.markBoard(1,0);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);

    myboard.markBoard(1,2);
    console.table(myboard.printBoard());
    checkWin();
    switchPlayer(newcurr);
    console.log(`Next turn is by ${newcurr.name()}`);
    

}

(function domInt(){
    const grid = document.querySelector('.gameboard');
    
    for (let j=0; j<3; j++) {
        for (let i=0; i<3; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add(`div${j}${i}`);
        newDiv.textContent = '';
        grid.appendChild(newDiv)
        }
    }
})();

function updateDom(){
    for (let j=0; j<3; j++) {
        for (let i=0; i<3; i++) {
        let test = document.querySelector(`.div${j}${i}`)
        if (myboard.getBoard()[j][i] === 1) {
            test.textContent = 'X';
        } else if (myboard.getBoard()[j][i] === 2) {
            test.textContent = 'O';
        } 
        }
    }
}

const divselect = document.querySelector('.gameboard');
divselect.addEventListener('click', (e) => {
    console.log(e.target.classList);
    let text = e.target.classList;
    console.log(text.toString());
})

function domHandle() {
    let dom = {
        click: function() {

        }
    }
}

// myboard.markBoard(0,0);
// myboard.markBoard(0,1);
// myboard.markBoard(1,1);
// myboard.markBoard(0,2);
// myboard.markBoard(2,2);


for (x of myboard.getBoard()[1]) {
    console.log(`test ${x}`)
}