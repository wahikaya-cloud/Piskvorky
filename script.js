document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
    
    let board = Array(36).fill('');
    let currentPlayer = 'X';
    let isGameActive = true;
    
    // Inicializace knihovny Confetti-JS
    const confettiSettings = { target: 'confetti-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);

    const checkWin = () => {
        const boardSize = 6;
        const winCondition = 5;

        // Kontrola řádků, sloupců a diagonál
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const index = i * boardSize + j;
                
                // Kontrola řádků
                if (j <= boardSize - winCondition) {
                    let isWin = true;
                    for (let k = 0; k < winCondition; k++) {
                        if (board[index + k] !== currentPlayer) {
                            isWin = false;
                            break;
                        }
                    }
                    if (isWin) return true;
                }

                // Kontrola sloupců
                if (i <= boardSize - winCondition) {
                    let isWin = true;
                    for (let k = 0; k < winCondition; k++) {
                        if (board[index + k * boardSize] !== currentPlayer) {
                            isWin = false;
                            break;
                        }
                    }
                    if (isWin) return true;
                }
                
                // Kontrola diagonály (dolů a doprava)
                if (i <= boardSize - winCondition && j <= boardSize - winCondition) {
                    let isWin = true;
                    for (let k = 0; k < winCondition; k++) {
                        if (board[index + k * (boardSize + 1)] !== currentPlayer) {
                            isWin = false;
                            break;
                        }
                    }
                    if (isWin) return true;
                }

                // Kontrola diagonály (dolů a doleva)
                if (i <= boardSize - winCondition && j >= winCondition - 1) {
                    let isWin = true;
                    for (let k = 0; k < winCondition; k++) {
                        if (board[index + k * (boardSize - 1)] !== currentPlayer) {
                            isWin = false;
                            break;
                        }
                    }
                    if (isWin) return true;
                }
            }
        }
        return false;
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());

        checkResult();
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Hraje hráč ${currentPlayer}`;
    };

    const checkResult = () => {
        if (checkWin()) {
            statusDisplay.textContent = `Hráč ${currentPlayer} vyhrál! 🎉`;
            isGameActive = false;
            confetti.render(); // Spustí animaci konfet
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            statusDisplay.textContent = 'Remíza! 🤝';
            isGameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const restartGame = () => {
        isGameActive = true;
        currentPlayer = 'X';
        board = Array(36).fill('');
        statusDisplay.textContent = `Hraje hráč ${currentPlayer}`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        confetti.clear(); // Ukončí animaci konfet po restartu
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});