// Selectors
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const newGameBtn = document.querySelector(".new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

// Initial variables
let turnO = true; // Player O starts
const winPatterns = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal \
  [2, 4, 6], // Diagonal /
];

// Reset the game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Enable all boxes and clear text
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Display the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const val1 = boxes[a].innerText;
    const val2 = boxes[b].innerText;
    const val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }

  // Check for a draw
  if ([...boxes].every((box) => box.innerText !== "")) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

// Box click handler
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

// Event listeners for buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
