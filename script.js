(function ticTacToe() {
  //  function to create a 2d array of the game space
  function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
      //  at each array position in original board array, the for loop creates a new array
      //  this is denoted by []
      //  adding items to the new array within each board[i] location creates a 2D array of the board
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push("0");
      }
    }

    //  this allows for extracting the gameboard.
    const getBoard = () => board;
    // this will allow us to mark spots on the board
    const markBoard = (yCord, xCord) => {
      console.log(board[0][0]);
      if (board[yCord][xCord] !== "0") {
        return console.log("error not empty");
      }

      board[yCord][xCord] = newcurr.val();
    };
    // this function will print the game board
    const printBoard = () => {
      console.table(getBoard());
    };
    // this function will reset the game board to original state
    const resetBoard = () => {
      for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push("0");
        }
      }
    };

    return { getBoard, printBoard, markBoard, resetBoard };
  }

  function createPlayer1(pname) {
    const name = () => pname;
    const val = () => 1;
    let score = 0;
    let marker = "CROSS";
    return { name, val, score, marker };
  }

  function createPlayer2(pname) {
    const name = () => pname;
    const val = () => 2;
    let score = 0;
    let marker = "CIRCLE";
    return { name, val, score, marker };
  }

  function switchPlayer(curr) {
    if (curr === player1) {
      curr = player2;
    } else {
      curr = player1;
    }
    return (newcurr = curr);
  }
  function checkWin() {
    //  for loop to check winner in each row
    for (let i = 0; i < 3; i++) {
      let tempArr = myboard.getBoard()[i];
      checkArrMatch(tempArr);
    }

    for (let i = 0; i < 3; i++) {
      let tempArr = [];
      tempArr.push(myboard.getBoard()[0][i]);
      tempArr.push(myboard.getBoard()[1][i]);
      tempArr.push(myboard.getBoard()[2][i]);
      checkArrMatch(tempArr);
    }

    //  check diagonally if [0][0], [1][1], [2][2] are the same
    (function checkDiag() {
      let tempArr = [];
      for (let i = 0; i < 3; i++) {
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
    (function tieCheck() {
      let counter = 0;
      for (x of myboard.getBoard()) {
        y = x.filter((x) => x === "0");
        counter += y.length;
      }
      console.log(`Amount of available spaces is: ${counter}`);
      if (counter === 0) {
        return (drawStat = true);
      } else {
        console.log("NO TIE, GAME ON!");
      }
    })();
    //  function checks for in a row matches
    function checkArrMatch(tempArr) {
      if (tempArr.filter((x) => x === player1.val()).length === 3) {
        return (winStat = true);
      } else if (tempArr.filter((x) => x === player2.val()).length === 3) {
        return (winStat = true);
      }
    }
    if (winStat === true || drawStat === true) {
      console.log("GAME OVER");
    }
  }

  //  object for creating dom elements and interacting with the play board

  function domThings() {
    const init = () => {
      const grid = document.querySelector(".gameboard");

      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
          const newDiv = document.createElement("button");
          newDiv.classList.add(`div${j}${i}`);
          newDiv.textContent = "";
          grid.appendChild(newDiv);
        }
      }
    };

    const updateDom = () => {
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
          let test = document.querySelector(`.div${j}${i}`);
          if (myboard.getBoard()[j][i] === 1) {
            test.classList.add("X");
          } else if (myboard.getBoard()[j][i] === 2) {
            test.classList.add("O");
          }
        }
      }
    };

    const clearDomBoard = () => {
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
          let test = document.querySelector(`.div${j}${i}`);
          test.textContent = "";
          test.classList.remove("O");
          test.classList.remove("X");
        }
      }
    };

    const playGame = () => {
      let divselect = document.querySelector(".gameboard");

      divselect.addEventListener("click", (e) => {
        if (winStat === true || drawStat === true) {
          divselect = "null";
          return;
        } else {
          let tarVal = e.target.classList;
          let coord = tarVal.value.slice(3).split("");

          // check if field is empty

          if (myboard.getBoard()[coord[0]][coord[1]] !== "0") {
            return alert("ERROR NOT EMPTY"), console.log("error not empty");
          }

          // proceed with game if it is

          myboard.markBoard(coord[0], coord[1]);
          testDOM.updateDom();
          checkWin();
          testDOM.displayWinner(winStat, drawStat);
          testDOM.drawAnnounce(drawStat);

          if (winStat === false && drawStat === false) {
            switchPlayer(newcurr);
            testDOM.displayCurrentMove(newcurr.name(), newcurr.marker);
          }
        }
      });
    };

    const resetGame = () => {
      let resetBtn = document.querySelector(".resetBoard");

      resetBtn.addEventListener("click", () => {
        myboard.resetBoard();
        testDOM.clearDomBoard();
        newcurr = player1;
        winStat = false;
        drawStat = false;
        displayCurrentMove(newcurr.name(), newcurr.marker);
      });
    };

    const addPlayerName = (name) => {
      let addBtn = document.querySelector(".addPlay");

      addBtn.addEventListener("click", () => {
        if (playercounter === 0) {
          let playername = prompt("Please enter the name of the first player");
          if (playername === null) {
            return alert("ERROR player name cannot be blank!");
          }
          player1 = createPlayer1(playername);
          return playercounter++, (newcurr = player1);
        } else if (playercounter === 1) {
          let playername = prompt("Please enter the name of the second player");
          if (playername === null) {
            return alert("ERROR player name cannot be blank!");
          }
          player2 = createPlayer2(playername);
          playercounter++;
          testDOM.boardVisibility(playercounter);
          displayCurrentMove(player1.name(), player1.marker);
          return playercounter, player2;
        }
      });
    };

    const displayCurrentMove = (pname, pmarker) => {
      let currentMove = document.querySelector(".currentPlayer");
      if (winStat !== true) {
        currentMove.textContent = `${pname}'s move (${pmarker})!`;
      }
    };

    const boardVisibility = (value) => {
      let boardVis = document.querySelector("div>.gameboard");
      let addPlayVis = document.querySelector(".addPlay");
      let resetBtnVis = document.querySelector(".resetBoard");

      if (value === 2) {
        boardVis.style.visibility = "visible";
        addPlayVis.style.display = "none";
        resetBtnVis.style.visibility = "visible";
      } else {
        boardVis.style.visibility = "hidden";
        addPlayVis.style.visibility = "visible";
        resetBtnVis.style.visibility = "hidden";
      }
    };

    const displayWinner = (winStat) => {
      if (winStat === true) {
        let currMessage = document.querySelector(".currentPlayer");
        currMessage.textContent = `${newcurr.name()} is the winner!`;
        newcurr.score += 1;
        if (newcurr.val() === 1) {
          let p1msg = document.querySelector(".player1");
          p1msg.style.visibility = "visible";
          p1msg.textContent = `${newcurr.name()}'s score is: ${newcurr.score}`;
        } else {
          let p2msg = document.querySelector(".player2");
          p2msg.style.visibility = "visible";
          p2msg.textContent = `${newcurr.name()}'s score is: ${newcurr.score}`;
        }
      }
    };

    const drawAnnounce = (drawStat) => {
      if (drawStat === true && winStat === false) {
        let currMessage = document.querySelector(".currentPlayer");
        currMessage.textContent = `WE HAVE A DRAW`;
      }
    };

    return {
      init,
      updateDom,
      playGame,
      resetGame,
      clearDomBoard,
      addPlayerName,
      displayCurrentMove,
      boardVisibility,
      displayWinner,
      drawAnnounce,
    };
  }

  // setting initial game conditions

  function initGameConditions() {
    playercounter = 0;
    testDOM.boardVisibility(playercounter);
    testDOM.addPlayerName();
    testDOM.init();
    testDOM.playGame();
    testDOM.resetGame();

    return {
      playercounter,
    };
  }
  let winStat = false;
  let drawStat = false;
  const testDOM = domThings();
  const myboard = gameBoard();
  initGameConditions();
})();
