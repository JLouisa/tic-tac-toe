const game = (function () {
  let players = [];
  let gameBoard = [];
  let boardGrid = [];
  let playerOneTurn = true;
  let isListening = true;

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

  //Listener
  function listener(grid, i) {
    grid.addEventListener(
      "click",
      () => {
        action(grid, i);
      },
      { once: isListening }
    );
  }
  playBtnEl.addEventListener("click", () => {
    getPlayerNames();
  });
  resetBtn.addEventListener("click", () => {
    resetFunc();
  });

  //Action after Listening
  function action(grid, i) {
    playerTurns(grid, i);
    // grid.textContent = gameBoard[i].marker;
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
      displayController(boardGrid[i]);
      listener(boardGrid[i], [i]);
    }
  }

  //Name Class
  function Namer(name, i) {
    name.classList.add("square", `row${i}`);
  }

  //Renderer
  function render() {
    // function render(pMark, i, ...a) {
    for (n of gameBoard) {
      n.grid.textContent = n.marker;
    }
  }

  //Intermediate
  function interHold(pMark, i, ...a) {
    gameBoard[a[0]].marker = pMark;
    render();
  }

  //Hider
  function hider() {
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
  }

  //Turn Module
  function playerTurns(grid, i) {
    switch (playerOneTurn) {
      case true:
        interHold(players[0].marker, grid, i);
        playerOneTurn = false;
        break;

      case false:
        interHold(players[1].marker, grid, i);
        playerOneTurn = true;
        break;
    }
  }

  // DisplayController Module
  function displayController(grid) {
    gameBoard.push({ grid, marker: "" });
  }

  //Reset Module
  function resetFunc() {
    playerOneTurn = true;
    isListening = true;
    gameBoard.forEach((n) => {
      n.marker = "";
    });
    render();
  }
  //ScoreBoard Module
  //
})();
