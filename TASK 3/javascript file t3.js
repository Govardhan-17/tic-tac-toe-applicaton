// Constants for players
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// Initial game state
let currentPlayer = PLAYER_X;
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle cell click
function handleCellClick(cellClicked, cellIndex) {
    // If cell is already played or game is not active, return
    if (!gameActive || gameState[cellIndex] !== '') return;

    // Update cell UI
    cellClicked.textContent = currentPlayer;
    gameState[cellIndex] = currentPlayer;

    // Check for win
    if (checkWin()) {
        displayStatus(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    // Check for draw
    if (!gameState.includes('')) {
        displayStatus("It's a draw!");
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    displayStatus(`${currentPlayer}'s turn`);
}

// Function to check for win
function checkWin() {
    return winConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

// Function to display game status
function displayStatus(message) {
    document.getElementById('status').textContent = message;
}

// Function to reset the game
function resetGame() {
    currentPlayer = PLAYER_X;
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    displayStatus(`${currentPlayer}'s turn`);
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

// Add event listeners
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

document.getElementById('resetButton').addEventListener('click', resetGame);

// Initial status display
displayStatus(`${currentPlayer}'s turn`);
