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
      grid.textContent = gameBoard[i].marker;
      console.log(grid);
      console.log(gameBoard[0].marker);
      playerTurns();
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
      Namer(boardGrid[i], [i]);
      render(boardGrid[i]);
      displayController(boardGrid[i]);
      listener(boardGrid[i], [i]);
    }
  }

  //Name Class
  function Namer(name, ilet) {
    name.classList.add("square", `row${ilet}`);
  }

  //Renderer
  function render(data) {
    boardEl.appendChild(data);
    // for (n in gameBoard)
    //   n.forEach((blocks) => {
    //     console.log(blocks);
    //   });
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
      case true:
        players[0].marker;
        console.log("Player One turn");
        playerOneTurn = false;
        break;

      case false:
        players[1].marker;
        console.log("Player Two turn");
        playerOneTurn = true;
        break;
    }
  }

  // DisplayController Module
  function displayController(grid) {
    gameBoard.push({ grid, marker: "X" });
    // render();
  }

  //Disable marked grids

  //ScoreBoard Module
  //
})();
