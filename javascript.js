const game = (function () {
  let players = [];

  //Cache DOM
  const playBtnEl = document.querySelector("#playBtn");
  const boardEl = document.querySelector(".board");
  const formsEl = document.querySelector(".getForms");
  const playerName1El = document.querySelector("#playerOne");
  const playerName2El = document.querySelector("#playerTwo");

  //Binding
  playBtnEl.addEventListener("click", builder);
  playerName1El.addEventListener("input", (e) => {
    createPlayer(e.target.value);
  });
  playerName2El.addEventListener("input", (e) => {
    createPlayer(e.target.value);
  });

  //Builder
  function builder() {
    createBoard();
    hider();
    console.log(players);
  }

  //Factory Players
  createPlayer = function (name) {
    const playerName = name.toLowerCase;
    players.push({ name });
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
    boardEl.appendChild(n);
  }
  //Hider
  function hider() {
    formsEl.setAttribute("style", "display: none;");
    playBtnEl.setAttribute("style", "display: none;");
    boardEl.setAttribute("style", "display: grid;");
  }
})();

// const gods = [];

// let test1 = "Odin";
// let test2 = "Thor";

// gods.push(test1, test2);
