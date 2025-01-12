const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const chooseX = document.getElementById('chooseX');
const chooseO = document.getElementById('chooseO');
const startGame = document.getElementById('start-game');
const restartGame = document.getElementById('restart-game');
const playerInfo = document.getElementById('player-info');
const gameBoard = document.getElementById('game-board');
const turnInfo = document.getElementById('turn-info');
const cells = document.querySelectorAll('.cell');

let player1Name = '';
let player2Name = '';
let player1Marker = '';
let currentTurn = '';

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

player1Input.addEventListener('input', () => {
    player2Input.value = '';
    player2Input.disabled = true;
});

chooseX.addEventListener('click', () => {
    player1Marker = 'X';
    player2Input.disabled = false;
    player2Input.placeholder = 'Player 2, enter name';
    alert("Oops! You gotta no choice. Player 2 is O.");
    chooseX.disabled = true;
    chooseO.disabled = true;
    startGame.disabled = false;
});

chooseO.addEventListener('click', () => {
    player1Marker = 'O';
    player2Input.disabled = false;
    player2Input.placeholder = 'Player 2, enter name';
    alert("Oops! You gotta no choice. Player 2 is X.");
    chooseX.disabled = true;
    chooseO.disabled = true;
    startGame.disabled = false;
});

startGame.addEventListener('click', () => {
    player1Name = player1Input.value;
    player2Name = player2Input.value;
    currentTurn = player1Marker === 'X' ? player1Name : player2Name;
    turnInfo.textContent = `It's ${currentTurn}'s turn!`;
    playerInfo.classList.add('hidden');
    gameBoard.classList.remove('hidden');
});

restartGame.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'x', 'o');
    });
    turnInfo.textContent = '';
    restartGame.classList.add('hidden');
    playerInfo.classList.remove('hidden');
    gameBoard.classList.add('hidden');
    chooseX.disabled = false;
    chooseO.disabled = false;
    startGame.disabled = true;
    player1Input.value = '';
    player2Input.value = '';
    player2Input.disabled = true;
});

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (!cell.classList.contains('taken')) {
            const marker = currentTurn === player1Name ? player1Marker : (player1Marker === 'X' ? 'O' : 'X');
            cell.textContent = marker;
            cell.classList.add('taken', marker.toLowerCase());
            if (checkWinner(marker)) {
                announceWinner(marker);
            } else if (isDraw()) {
                announceDraw();
            } else {
                currentTurn = currentTurn === player1Name ? player2Name : player1Name;
                turnInfo.textContent = `It's ${currentTurn}'s turn!`;
            }
        }
    });
});

function checkWinner(marker) {
    const selectedCells = Array.from(cells).map((cell, index) =>
        cell.textContent === marker ? index : null
    ).filter(index => index !== null);

    return winningCombos.some(combo => combo.every(index => selectedCells.includes(index)));
}

function isDraw() {
    return Array.from(cells).every(cell => cell.classList.contains('taken'));
}

function announceWinner(marker) {
    const winner = marker === player1Marker ? player1Name : player2Name;
    turnInfo.textContent = `🎉 Hurray! ${winner} won the game! 🎉`;
    turnInfo.classList.add('animated');
    cells.forEach(cell => cell.classList.add('taken'));
    restartGame.classList.remove('hidden');
}

function announceDraw() {
    turnInfo.textContent = `🤝 It's a draw! Better luck next time!`;
    turnInfo.classList.add('animated');
    restartGame.classList.remove('hidden');
}
