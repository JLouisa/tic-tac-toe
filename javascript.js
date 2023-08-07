const game = (function () {
  (createPlayer = function (name, marker) {
    const playerName = name;
    const playerMarker = marker;
  }),
    (binding = () => {
      const playBtn = document.querySelector(".btnstyle1");
    }),
    (createBoard = () => {
      let gameBoard = [];
      for (let i = 0; i < 4; i++) {
        gameBoard[i] = document.createElement("div");
        gameBoard[i].classList.add("square", `row${i}`);
        for (let j = 0; j < 4; j++) {
          gameBoard[i] = document.createElement("div");
          gameBoard[i].classList.add("square", `row${i}Col${j}`);
        }
      }
    }),
    (render = () => {});
})();
