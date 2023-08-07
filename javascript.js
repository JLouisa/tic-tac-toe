// const game = (function () {
//   (createPlayer = function (name, marker) {
//     const playerName = name;
//     const playerMarker = marker;
//     return { name, marker };
//   }),
//     (binding = () => {
//       const playBtn = document.querySelector("#playBtn");
//       listener(playBtn);
//       const board = document.querySelector(".board");
//       render(board);
//     }),
//     (listener = (event) => {
//       event.addEventListener("click", createBoard);
//     }),
//     (createBoard = () => {
//       let gameBoard = [];
//       for (let i = 0; i < 3; i++) {
//         gameBoard[i] = document.createElement("div");
//         gameBoard[i].classList.add("square", `row${i}`);
//         board.appendChild(gameBoard[i]);
//         for (let j = 0; j < 2; j++) {
//           gameBoard[i][j] = document.createElement("div");
//           gameBoard[i][j].classList.add("square", `row${i}Col${j}`);
//           board.appendChild(gameBoard[i][j]);
//         }
//       }
//     }),
//     (render = (parent) => {
//       parent.appendChild(board);
//     });
// })();

function hideBtn() {
  playBtn.setAttribute("style", "display: none;");
  board.setAttribute("style", "display: grid;");
}

const playBtn = document.querySelector("#playBtn");
playBtn.addEventListener("click", () => {
  createBoard();
  hideBtn();
});

const board = document.querySelector(".board");

function createBoard() {
  let gameBoard = [];
  for (let i = 0; i < 3; i++) {
    gameBoard[i] = document.createElement("div");
    gameBoard[i].classList.add("square", `row${i}`);
    board.appendChild(gameBoard[i]);
    for (let j = 0; j < 2; j++) {
      gameBoard[i][j] = document.createElement("div");
      gameBoard[i][j].classList.add("square", `row${i}Col${j}`);
      board.appendChild(gameBoard[i][j]);
    }
  }
}
