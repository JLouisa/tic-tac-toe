const game = (function () {
  let players = [];
  let gameBoard = [];
  let boardGrid = [];
  let playerOneTurn = true;

  //Cache DOM
  const playBtnEl = document.querySelector("#playBtn");
  const boardEl = document.querySelector(".board");
  const formsEl = document.querySelector(".getForms");
  const playerName1El = document.querySelector("#playerOne");
  const playerName2El = document.querySelector("#playerTwo");
  const resetBtn = document.querySelector("#reset");
  const markerX = "X";
  const markerO = "O";

  //Setup Players
  function getPlayerNames() {
    createPlayer(playerName1El.value, markerX);
    createPlayer(playerName2El.value, markerO);
    createBoard();
    hider();
  }

  //Hide Forms after game start
  function hider() {
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
  }

  //Listener Module
  playBtnEl.addEventListener("click", () => {
    getPlayerNames();
  });
  resetBtn.addEventListener("click", () => {
    resetFunc();
  });
  function listener() {
    gameBoard.forEach((n) => {
      n.grid.addEventListener("click", () => {
        playerTurns(n.grid, gameBoard.indexOf(n));
      });
    });
  }

  //Factory for Players
  createPlayer = function (name, marker) {
    const playerName = name.toLowerCase();
    const playerMarker = marker;
    players.push({ name, marker });
  };

  //Creator
  function createBoard() {
    for (let i = 0; i < 9; i++) {
      boardGrid[i] = document.createElement("div");
      boardEl.appendChild(boardGrid[i]);
      Namer(boardGrid[i], [i]);
      gameBoard.push({ grid: boardGrid[i], marker: "" });
    }
    listener();
  }

  //Name Class
  function Namer(name, i) {
    name.classList.add("square", `row${i}`);
  }

  //Renderer
  function render() {
    gameBoard.forEach((n) => {
      n.grid.textContent = n.marker;
    });
    console.log(gameBoard);
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

  //Reset Module
  function resetFunc() {
    gameBoard.forEach((n) => {
      n.marker = "";
    });
    playerOneTurn = true;
    render();
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
        resetFunc();
        alert(`${emblem} won the game`);
        break;
      } else {
        winC = 0;
        winR = 0;
        winD = 0;
        if (x >= 8) {
          alert("It's a tie!");
          resetFunc();
          break;
        }
      }
      if (!game.includes("")) {
        alert("It's a tie! Try harder!!");
        resetFunc();
        break;
      }
    } //MasterLoop
  }

  //ScoreBoard Module
})();
