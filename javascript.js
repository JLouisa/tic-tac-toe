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

  //Setup Players
  function getPlayerNames() {
    createPlayer(playerName1El.value, "X");
    createPlayer(playerName2El.value, "O");
    createBoard();
    hider();
  }

  //Init Listener
  playBtnEl.addEventListener("click", () => {
    getPlayerNames();
  });
  resetBtn.addEventListener("click", () => {
    resetFunc();
  });
  function recurListener() {
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
    recurListener();
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
  }

  //Intermediate Player One
  function interHold(pMark, i, a) {
    if (gameBoard[a].marker == "") {
      gameBoard[a].marker = pMark;
      render();
      gameLogic();
      playerOneTurn = false;
    }
    //else {Wait for Action}
  }

  //Intermediate Player Two
  function interHold2(pMark, i, a) {
    if (gameBoard[a].marker == "") {
      gameBoard[a].marker = pMark;
      render();
      gameLogic();
      playerOneTurn = true;
    }
    //else {Wait for Action}
  }

  //Hider
  function hider() {
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
  }

  //Wait for Action
  //

  //Turn Module
  function playerTurns(grid, i) {
    switch (playerOneTurn) {
      case true:
        interHold(players[0].marker, grid, i);
        break;

      case false:
        interHold2(players[1].marker, grid, i);
        break;
    }
  }

  //Reset Module
  function resetFunc() {
    playerOneTurn = true;
    console.log(gameBoard);
    gameBoard.forEach((n) => {
      n.marker = "";
    });
    render();
  }

  //Game Logic
  function gameLogic() {
    for (let x = 0; x < 1; x++) {
      if (
        //First Row
        (gameBoard[x].marker == gameBoard[x + 1].marker &&
          gameBoard[x + 1].marker == gameBoard[x + 2].marker &&
          gameBoard[x + 1].marker == "X") ||
        (gameBoard[x].marker == gameBoard[x + 1].marker &&
          gameBoard[x + 1].marker == gameBoard[x + 2].marker &&
          gameBoard[x].marker == "O") ||
        //Second Row
        (gameBoard[x + 3].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 5].marker &&
          gameBoard[x + 3].marker == "X") ||
        (gameBoard[x + 3].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 5].marker &&
          gameBoard[x + 3].marker == "O") ||
        // Third Row
        (gameBoard[x].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 3].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "X") ||
        (gameBoard[x].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 3].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "O") ||
        //First Column
        (gameBoard[x].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 3].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "X") ||
        (gameBoard[x].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 3].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "O") ||
        //Second Column
        (gameBoard[x + 1].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 7].marker &&
          gameBoard[x + 4].marker == "X") ||
        (gameBoard[x + 1].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 7].marker &&
          gameBoard[x + 1].marker == "O") ||
        //Third Column
        (gameBoard[x + 2].marker == gameBoard[x + 5].marker &&
          gameBoard[x + 6].marker == gameBoard[x + 8].marker &&
          gameBoard[x + 2].marker == "X") ||
        (gameBoard[x + 2].marker == gameBoard[x + 5].marker &&
          gameBoard[x + 6].marker == gameBoard[x + 8].marker &&
          gameBoard[x + 2].marker == "O") ||
        //Left2Right Diagonal
        (gameBoard[x].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 8].marker &&
          gameBoard[x].marker == "X") ||
        (gameBoard[x].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 8].marker &&
          gameBoard[x].marker == "O") ||
        //Right2Left Diagonal
        (gameBoard[x + 2].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 6].marker &&
          gameBoard[x + 2].marker == "X") ||
        (gameBoard[x + 2].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 6].marker &&
          gameBoard[x + 2].marker == "O")
      ) {
        alert("You have won");
        resetFunc();
      }
    }
    let b = 0;
    for (let y = 0; y < 9; y++) {
      if (gameBoard[y].marker !== "") {
        b += 1;
      }
      if (b == 9 && y <= 8) {
        alert("It's a tie!");
        resetFunc();
        break;
      }
    }
    b = 0;
  }

  //ScoreBoard Module

  //Duplicate eventlisteners issue with resetting.
})();
