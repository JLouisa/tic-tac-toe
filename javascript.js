const game = (function () {
  let players = [];
  let gameBoard = [];
  let boardGrid = [];
  let playerOneTurn = true;
  let fullBoard = false;

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

  //Init Listener
  playBtnEl.addEventListener("click", () => {
    getPlayerNames();
  });
  resetBtn.addEventListener("click", () => {
    resetFunc();
  });
  function recurListener() {
    gameBoard.forEach((n) => {
      n.grid.addEventListener(
        "click",
        () => {
          playerTurns(n.grid, gameBoard.indexOf(n));
        },
        { once: true }
      );
    });
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
      gameBoard.push({ grid: boardGrid[i], marker: "" });
    }
    recurListener();
  }

  //Name Class
  function Namer(name, i) {
    name.classList.add("square", `row${i}`);
  }

  //Renderer
  function render() {
    gameBoard.forEach((n) => {
      n.grid.textContent = n.marker;
    });
    // for (n of gameBoard) {
    //   n.grid.textContent = n.marker;
    // }
  }

  //Intermediate
  function interHold(pMark, i, a) {
    gameBoard[a].marker = pMark;
    render();
    gameLogic();
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

  //Reset Module
  function resetFunc() {
    playerOneTurn = true;
    fullBoard = false;
    console.log("1 ");
    console.log(gameBoard);
    gameBoard.forEach((n) => {
      n.marker = "";
    });
    render();
    recurListener();
    console.log("2 ");
    console.log(gameBoard);
  }

  //Game Logic
  function gameLogic() {
    for (let x = 0; x < 1; x++) {
      if (
        (gameBoard[x].marker == gameBoard[x + 1].marker &&
          gameBoard[x + 1].marker == gameBoard[x + 2].marker &&
          gameBoard[x].marker == "X") ||
        (gameBoard[x].marker == gameBoard[x + 3].marker &&
          gameBoard[x].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "X") ||
        (gameBoard[x + 3].marker == gameBoard[x + 1].marker &&
          gameBoard[x + 3].marker == gameBoard[x + 2].marker &&
          gameBoard[x + 3].marker == "X") ||
        (gameBoard[x + 1].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 1].marker == gameBoard[x + 6].marker &&
          gameBoard[x + 1].marker == "X") ||
        (gameBoard[x + 2].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 2].marker == gameBoard[x + 5].marker &&
          gameBoard[x + 2].marker == "X") ||
        (gameBoard[x].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 8].marker &&
          gameBoard[x].marker == "X") ||
        (gameBoard[x + 2].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 6].marker &&
          gameBoard[x + 2].marker == "X") ||
        (gameBoard[x].marker == gameBoard[x + 1].marker &&
          gameBoard[x + 1].marker == gameBoard[x + 2].marker &&
          gameBoard[x].marker == "O") ||
        (gameBoard[x].marker == gameBoard[x + 3].marker &&
          gameBoard[x].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "O") ||
        (gameBoard[x + 3].marker == gameBoard[x + 1].marker &&
          gameBoard[x + 3].marker == gameBoard[x + 2].marker &&
          gameBoard[x].marker == "O") ||
        (gameBoard[x + 1].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 1].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "O") ||
        (gameBoard[x + 2].marker == gameBoard[x + 3].marker &&
          gameBoard[x + 2].marker == gameBoard[x + 5].marker &&
          gameBoard[x].marker == "O") ||
        (gameBoard[x].marker == gameBoard[x + 4].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 8].marker &&
          gameBoard[x].marker == "O") ||
        (gameBoard[x + 2].marker == gameBoard[x + 2].marker &&
          gameBoard[x + 4].marker == gameBoard[x + 6].marker &&
          gameBoard[x].marker == "O")
      ) {
        alert("You have won");
      }
    }
    // for (let y = 0; y < 9; y++) {
    //   if (gameBoard[y].marker !== "") {
    //     fullBoard = true;
    //   } else if (fullBoard == true && y > 7) {
    //     resetFunc();
    //   }
    // }
  }

  //ScoreBoard Module
})();
