const game = (function () {
  let players = [];
  let playerOneTurn = true;

  //Cache DOM
  const playBtnEl = document.querySelector("#playBtn");
  const boardEl = document.querySelector(".board");
  const formsEl = document.querySelector(".getForms");
  const playerName1El = document.querySelector("#playerOne");
  const playerName2El = document.querySelector("#playerTwo");

  //Setup Players
  function getPlayerNames() {
    createPlayer(playerName1El.value, "X");
    createPlayer(playerName2El.value, "O");
    createBoard();
    hider();
  }

  //Listener
  function listener(grid) {
    grid.addEventListener("click", () => {
      grid.style.backgroundColor = "red";
      console.log(grid);
    });
  }

  playBtnEl.addEventListener("click", () => {
    getPlayerNames();
  });

  //Factory for Players
  createPlayer = function (name, marker) {
    const playerName = name.toLowerCase();
    const playerMarker = marker;
    players.push({ name, marker });
  };

  //Creator
  function createBoard() {
    let gameBoard = [];
    for (let i = 0; i < 9; i++) {
      gameBoard[i] = document.createElement("div");
      gameBoard[i].classList.add("square", `row${i}`);
      render(gameBoard[i]);
      listener(gameBoard[i]);
    }
  }

  //Renderer
  function render(data) {
    boardEl.appendChild(data);
  }

  //Hider
  function hider() {
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
  }

  //Turn Module
  function playerTurns() {
    switch (playerOneTurn) {
      case "true": {
        ("route 1");
        players[0].marker;
        playerOneTurn = false;
        break;
      }
      case "false": {
        players[1].marker;
        playerOneTurn = true;
        break;
      }
    }
  }

  //DisplayController Module

  //Disable marked grids

  //ScoreBoard Module
  //
})();

// let marks = {
//   row1: "O",
//   row2: "X",
//   row3: "X",
//   row4: "O",
// };

// let marksX = ["row1", "row4", "row5"];
// let marksO = ["row0", "row3", "row9"];
