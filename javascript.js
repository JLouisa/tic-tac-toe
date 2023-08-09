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
  const mainEl = document.querySelector(".main");
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

  console.log(cpuCheck.checked);

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
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
    display.setAttribute("style", "display: flex;");
  }

  //Listener Module
  cpuCheck.addEventListener("click", cpuToggle);
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
  function displayScores() {
    playerOneScore.textContent = score[0].count;
    playerTwoScore.textContent = score[1].count;
  }
  function displayPlayers(n1, n2) {
    playerOne.textContent = n1;
    playerTwo.textContent = n2;
  }

  //Factory for Players
  createPlayer = function (name, marker) {
    players.push({ name, marker });
  };

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

  //ScoreBoard creator Module
  function scoreCreator(name, count) {
    score.push({ name, count });
  }

  //ScoreBoard keeper Module
  function scoreKeeper(emblem) {
    switch (emblem) {
      case "X": {
        score[0].count += 1;
        displayScores();
        break;
      }
      case "O": {
        score[1].count += 1;
        displayScores();
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
      });
    }
    playerOneTurn = true;
    render();
    displayScores();
  }
  // -------------------------------------------------------------------------
  //Game Logic
  function gameLogic(emblem) {
    let game = [];
    gameBoard.forEach((n) => {
      game.push(n.marker);
    });

    let winR = 0;
    let winC = 0;
    let winD = 0;
    let r = 0;
    let c = 0;
    let d = 0;
    let d2 = 4;
    let d3 = 9;

    for (let x = 0; x < 8; x += 3) {
      // -----------Row--------------
      for (; r < x + 3; r++) {
        if (game[r] === emblem) {
          winR += 1;
        } else {
          winR = 0;
        }
        if (winR === 3) {
          break;
        }
      }

      // -----------Column--------------
      for (; c < x + 8; c += 3) {
        if (winR == 3) {
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
      }
      if (x == 0) {
        c = 1;
      }
      if (x == 3) {
        c = 2;
      }
      if (x == 6) {
        c = 3;
      }

      // -----------Diagonal--------------
      for (; d < d3; d += d2) {
        if (winC == 3 || winR == 3) {
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
        if (d >= 8 && d2 == 2) {
          break;
        }
      }

      //-----------Master Check and Reset--------------
      if (winR === 3 || winC === 3 || winD === 3) {
        scoreKeeper(emblem);
        resetFunc();
        alert(`${emblem} won the game`);
        break;
      } else {
        winC = 0;
        winR = 0;
        winD = 0;
      }
      if (!game.includes("")) {
        alert("It's a tie! Try harder!!");
        resetFunc();
        break;
      }
    }
  }
})();
