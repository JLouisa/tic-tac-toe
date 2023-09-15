//Remake in the works

const game = (function () {
  let players = [];
  let gameBoard = [];
  let boardGrid = [];
  let score = [];
  let playerName1 = "";
  let playerName2 = "";
  let playerOneTurn = true;
  let mReset = false;

  //Cache DOM
  const winner = document.querySelector(".winner");
  const winningMsgEl = document.querySelector(".winningMsg");
  const contintueBtn = document.querySelector("#continueBtn");
  const display = document.querySelector(".display");
  const playBtnEl = document.querySelector("#playBtn");
  const boardEl = document.querySelector(".board");
  const formsEl = document.querySelector(".getForms");
  const playerName1El = document.querySelector("#playerOne");
  const playerName2El = document.querySelector("#playerTwo");
  const player2 = document.querySelector("#player2");
  const resetBtn = document.querySelector("#reset");
  const cpuCheck = document.querySelector("#CPU");
  const scoreBoard = document.querySelector(".playerNames");
  const playerOne = document.createElement("div");
  const playerTwo = document.createElement("div");
  const playerOneScore = document.createElement("div");
  const playerTwoScore = document.createElement("div");
  const markerX = "X";
  const markerO = "O";

  // console.log(cpuCheck.checked);

  //Creator
  function createDisplayPlayers() {
    playerOne.classList.add(".playerOne");
    playerTwo.classList.add(".playerTwo");
    scoreBoard.appendChild(playerOne);
    scoreBoard.appendChild(playerTwo);
    scoreBoard.insertBefore(playerOneScore, playerTwo);
    scoreBoard.appendChild(playerTwoScore);
    playerOneScore.textContent = "0";
    playerTwoScore.textContent = "0";
    displayScores(playerOne);
  }
  function createBoard() {
    for (let i = 0; i < 9; i++) {
      boardGrid[i] = document.createElement("div");
      boardEl.appendChild(boardGrid[i]);
      Namer(boardGrid[i], [i]);
      gameBoard.push({ grid: boardGrid[i], marker: "" });
    }
    listener();
  }

  //Hide Forms after game start
  function hider() {
    winner.setAttribute("style", "display: none;");
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
    display.setAttribute("style", "display: flex;");
  }

  //Listener Module
  // cpuCheck.addEventListener("click", cpuToggle);
  contintueBtn.addEventListener("click", hider);
  playBtnEl.addEventListener("click", () => {
    verifyNames();
  });
  resetBtn.addEventListener("click", () => {
    mReset = true;
    resetFunc();
  });
  function listener() {
    gameBoard.forEach((n) => {
      n.grid.addEventListener("click", () => {
        playerTurns(n.grid, gameBoard.indexOf(n));
      });
    });
  }

  //Renderer
  function render() {
    gameBoard.forEach((n) => {
      n.grid.textContent = n.marker;
    });
  }
  function displayScores(emblem) {
    playerOneScore.textContent = score[0].count;
    playerTwoScore.textContent = score[1].count;
    setTimeout(function () {
      switch (emblem) {
        case "X": {
          winningMsgEl.textContent = `${playerName1} won this round!`;
          break;
        }
        case "O": {
          winningMsgEl.textContent = `${playerName2} won this round!`;
          break;
        }
      }
    }, 1000);
  }
  function displayPlayers(n1, n2) {
    playerOne.textContent = n1;
    playerTwo.textContent = n2;
  }

  //Factory for Players
  createPlayer = function (name, marker) {
    players.push({ name, marker });
  };

  //Winning Msg Toglle
  function winToggleOn() {
    winner.setAttribute("style", "display: flex;");
  }

  //CPU Toggle
  function cpuToggle() {
    if (cpuCheck.checked == true) {
      player2.setAttribute("style", "visibility: hidden;");
      player2.value = "";
    } else {
      player2.setAttribute("style", "visibility: visible;");
    }
  }

  //Verifying Player names
  function verifyNames() {
    playerName1 = playerName1El.value;
    playerName2 = playerName2El.value;

    if (playerName1 == "") {
      playerName1 = "Player 1";
    }
    if (playerName2 == "") {
      playerName2 = "Player 2";
    }
    createPlayerNames(playerName1, playerName2);
    createDisplayPlayers();
    displayPlayers(playerName1, playerName2);
    displayScores();
  }

  //Setup Players
  function createPlayerNames(player1, player2) {
    createPlayer(player1, markerX);
    createPlayer(player2, markerO);
    createBoard();
    scoreCreator(player1, 0);
    scoreCreator(player2, 0);
    hider();
  }

  //Name Class
  function Namer(name, i) {
    name.classList.add("square", `row${i}`);
  }

  //DisplayController Player One
  function displayController(pMark, i, a) {
    switch (gameBoard[a].marker) {
      case "": {
        gameBoard[a].marker = pMark;
        playerOneTurn == true ? (playerOneTurn = false) : (playerOneTurn = true);
        render();
        gameLogic(pMark);
        break;
      }
      case !"": {
        //else {Wait for Action}
        break;
      }
    }
  }

  //Wait for Action
  //function doNothing() {}

  //Turn Module
  function playerTurns(grid, i) {
    switch (playerOneTurn) {
      case true:
        displayController(players[0].marker, grid, i);
        break;

      case false:
        displayController(players[1].marker, grid, i);
        break;
    }
  }

  //ScoreBoard Creator Module
  function scoreCreator(name, count) {
    score.push({ name, count });
  }

  //ScoreBoard keeper Module
  function scoreKeeper(emblem) {
    switch (emblem) {
      case "X": {
        score[0].count += 1;
        displayScores(emblem);
        break;
      }
      case "O": {
        score[1].count += 1;
        displayScores(emblem);
        break;
      }
    }
  }

  //Process Game logic resutls
  function processorGL(won, emblem) {
    switch (won) {
      case 0: {
        console.log("It's a tie!");
        setTimeout(resetFunc, 1000);
        setTimeout(function () {
          alert("It's a tie! Try harder!!");
        }, 1000);
        break;
      }
      case 1: {
        console.log(`${emblem} won the Game`);
        setTimeout(resetFunc, 1000);
        setTimeout(scoreKeeper(emblem), 1000);
        setTimeout(winToggleOn, 1000);
        break;
      }
    }
  }

  //Reset Module
  function resetFunc() {
    gameBoard.forEach((n) => {
      n.marker = "";
    });
    if (mReset == true) {
      score.forEach((n) => {
        n.count = 0;
        mReset = false;
      });
    }
    playerOneTurn = true;
    render();
    displayScores();
  }
  // -------------------------------------------------------------------------
  //Game Logic
  function gameLogic(emblem) {
    let wonGame = false;
    let game = [];
    gameBoard.forEach((n) => {
      game.push(n.marker);
    });
    let winR = 0;
    let winC = 0;
    let winD = 0;

    for (let x = 0; x < 1; x++) {
      // -----------Row--------------
      let r = 0;
      while (r < 9) {
        if (game[r] === emblem) {
          winR += 1;
        } else {
          winR = 0;
        }
        if (winR === 3) {
          break;
        }

        r++;
        if (r === 3 || r === 6) {
          winR = 0;
        }
      }

      // -----------Column--------------
      let c = 0;
      let c2 = 0;
      while (c <= 8) {
        if (winR === 3) {
          break;
        }
        if (game[c] === emblem) {
          winC += 1;
        } else {
          winC = 0;
        }
        if (winC === 3) {
          break;
        }

        c += 3;

        if (c2 === 0 && c > 8) {
          winC = 0;
          c = 1;
          c2 = 1;
        }
        if (c2 === 1 && c > 8) {
          winC = 0;
          c = 2;
          c2 = 2;
        }
        if (c2 === 2 && c > 8) {
          winC = 0;
          c = 3;
          c2 = 3;
        }
      }

      // -----------Diagonal--------------
      let d = 0;
      let d2 = 4;
      let d3 = 9;
      while (d < d3) {
        if (winC === 3 || winR === 3) {
          break;
        }
        if (game[d] === emblem) {
          winD += 1;
        } else {
          winD = 0;
        }
        if (winD === 3) {
          break;
        }
        if (d >= 8 && d2 === 4) {
          d = 0;
          d2 = 2;
          d3 = 8;
        }
        d += d2;
        if (d >= 8 && d2 == 2) {
          break;
        }
      }
      // -----------End--------------

      // else {
      //   processorGL(0, emblem);
      // }
    } // Master Loop ends
    if (winR === 3 || winC === 3 || winD === 3) {
      wonGame = true;
      processorGL(1, emblem);
    }
    if (!game.includes("") && wonGame == false) {
      processorGL(0, emblem);
    }
    winC = 0;
    winR = 0;
    winD = 0;
  }
})();

//----------------------Dev----------------------------
// // ========================CPU===========CPU==========================
// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// //Novice
// function cpuN() {
//   if (cpuCheck == true) {
//     let n = 0;
//     while (n < game.length) {
//       // console.log(game[n]);
//       if (game[n] == " ") {
//         console.log(game);
//         game[n] = "O";
//         console.log(`CPU added "O" at ${n}`);
//         console.log(game);
//         break;
//       }
//       n++;
//     }
//   }
// }

// // Intermediate
// function cpuI() {
//   if (cpuCheck == true) {
//     let n = 0;
//     let z = 1;
//     while (n < 40) {
//       if (z < 20) {
//         // console.log(game[n]);
//         let cpuC = [];
//         cpuC.push(getRandomInt(0, 8));
//         if (game[cpuC[0]] == " ") {
//           console.log(game);
//           console.log(cpuC[0]);
//           game[cpuC[0]] = "O";
//           console.log(`CPU added "O" at ${cpuC[0]}`);
//           console.log("---------0----1----2--|-3----4----5--|-6----7----8-|");
//           console.log(game);
//           break;
//         }
//         n++;
//         console.log(`Attempts ${z++}`);
//       } else {
//         cpuN();
//         console.log("Novice used");
//         break;
//       }
//     }
//   }
// }

// let start = () => {
//   cpuI();
//   gameLogic(mark1, game);
//   gameLogic(mark2, game);
//   // console.log(game);
// };

// let dev1 = () => {
//   gameLogic(mark1, devgame);
// };
// let dev2 = () => {
//   gameLogic(mark2, devgame);
// };

// //------------------AI------------------------

// // Array Row = [[1, 2, 3], [4, 5, 6], [7 ,8 ,9]]  = 8 points to win / 5 min
// // Array Colum =[[1, 4, 7], [2, 5, 8], [3, 6, 9]] = 8 points to win / 5 min
// //Array Diagonal = [[1, 5, 9], [3, 5, 7]] = 10 points / 7 min

// //Most numbers = 5 (x4)
// //AVG numbers = 1, 3, 5, 7, 9 (x3)
// //Least numbers = 2, 4, 6, 8 (x2)
