const game = (function () {
  let players = [];
  let playerOneTurn = true;

  //Cache DOM
  const playBtnEl = document.querySelector("#playBtn");
  const boardEl = document.querySelector(".board");
  const formsEl = document.querySelector(".getForms");

  //Setup Players
  function getPlayerNames() {
    const playerName1El = document.querySelector("#playerOne").value;
    const playerName2El = document.querySelector("#playerTwo").value;
    createPlayer(playerName1El, "X");
    createPlayer(playerName2El, "O");
    builder();
  }

  //Listener
  function listener(grid) {
    grid.addEventListener("click", () => {
      grid.style.backgroundColor = "red";
    });
  }
  playBtnEl.addEventListener("click", () => {
    getPlayerNames();
  });

  //Builder
  function builder() {
    createBoard();
    hider();
  }

  //Factory Players
  createPlayer = function (name, marker) {
    const playerName = name.toLowerCase();
    const playerMarker = marker;
    players.push({ name, marker });
    console.log(players[0]);
    console.log(players[1]);
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
  function render(n) {
    boardEl.appendChild(n);
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
        playerOneTurn = false;
        break;
      }
      case "false": {
        ("route 2");
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
