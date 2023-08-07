const game = (function () {
  let players = [];
  console.log(players);

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
    console.log(players);
  };

  //Creator
  function createBoard() {
    let gameBoard = [];
    for (let i = 0; i < 3; i++) {
      gameBoard[i] = document.createElement("div");
      gameBoard[i].classList.add("square", `row${i}`);
      render(gameBoard[i]);
      listener(gameBoard[i]);
      for (let j = 0; j < 2; j++) {
        gameBoard[i][j] = document.createElement("div");
        gameBoard[i][j].classList.add("square", `row${i}Col${j}`);
        render(gameBoard[i][j]);
        listener(gameBoard[i][j]);
      }
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
})();

//Turn Module
//DisplayController Module
//ScoreBoard Module
//
