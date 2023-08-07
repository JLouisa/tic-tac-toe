const game = (function () {
  let players = [];

  //Cache DOM
  const playBtnEl = document.querySelector("#playBtn");
  const board = document.querySelector(".board");

  //Binding
  playBtnEl.addEventListener("click", () => {
    createBoard();
    hider();
  });

  //Factory Players
  createPlayer = function (name, marker) {
    const playerName = name;
    const playerMarker = marker;
  };
  //Creator
  function createBoard() {
    let gameBoard = [];
    for (let i = 0; i < 3; i++) {
      gameBoard[i] = document.createElement("div");
      gameBoard[i].classList.add("square", `row${i}`);
      render(gameBoard[i]);
      for (let j = 0; j < 2; j++) {
        gameBoard[i][j] = document.createElement("div");
        gameBoard[i][j].classList.add("square", `row${i}Col${j}`);
        render(gameBoard[i][j]);
      }
    }
  }
  //Renderer
  function render(n) {
    board.appendChild(n);
  }
  //Hider
  function hider() {
    playBtnEl.setAttribute("style", "display: none;");
    board.setAttribute("style", "display: grid;");
  }
})();
