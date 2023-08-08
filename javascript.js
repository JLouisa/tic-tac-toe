const game = (function () {
  let players = [];
  let gameBoard = [];
  let boardGrid = [];
  let markers = "";
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
  function listener(grid, i) {
    grid.addEventListener("click", () => {
      playerTurns(i);
      grid.textContent = gameBoard[i].marker;
      console.log(grid);

      // render(i);
      // console.log(gameBoard[i]);
      // console.log(gameBoard[i].marker);
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
    for (let i = 0; i < 9; i++) {
      boardGrid[i] = document.createElement("div");
      boardEl.appendChild(boardGrid[i]);
      Namer(boardGrid[i], [i]);
      displayController(boardGrid[i]);
      listener(boardGrid[i], [i]);
    }
    // render();
  }

  //Name Class
  function Namer(name, ilet) {
    name.classList.add("square", `row${ilet}`);
  }

  //Renderer
  function render(pMark, i) {
    gameBoard[i].marker = pMark;
    console.log(pMark);
    console.log(gameBoard[i].marker);
    // for (block in gameBoard) {
    //   console.log(gameBoard[block].marker);
    // }
  }

  //Hider
  function hider() {
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
  }

  //Turn Module
  function playerTurns(i) {
    switch (playerOneTurn) {
      case true:
        console.log("Player One turn");
        render(players[0].marker, i);
        playerOneTurn = false;
        break;

      case false:
        console.log("Player Two turn");
        render(players[1].marker, i);
        playerOneTurn = true;
        break;
    }
  }

  // DisplayController Module
  function displayController(grid) {
    gameBoard.push({ grid, marker: "" });
    // render();
  }

  //Disable marked grids

  //ScoreBoard Module
  //
})();
