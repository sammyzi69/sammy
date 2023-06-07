let currentPlayer = 'X';
let gameEnded = false;
let moves = 0;
const board = Array.from(document.querySelectorAll('.board button'));
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function makeMove(index) {
    const cell = board[index];
    if (!gameEnded && cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        moves++;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            board[a].textContent === currentPlayer &&
            board[b].textContent === currentPlayer &&
            board[c].textContent === currentPlayer
        ) {
            highlightCells(combo);
            displayWinner(currentPlayer);
            gameEnded = true;
            break;
        }
    }
    if (!gameEnded && moves === 9) {
        displayWinner('Draw');
        gameEnded = true;
    }
}

function highlightCells(cells) {
    for (let cellIndex of cells) {
        board[cellIndex].classList.add('highlight');
    }
}

function displayWinner(player) {
    const message = player === 'Draw' ? 'It\'s a draw!' : `Player ${player} wins!`;
    setTimeout(() => {
        alert(message);
    }, 100);
}

function resetGame() {
    currentPlayer = 'X';
    gameEnded = false;
    moves = 0;
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'highlight');
    });
}

