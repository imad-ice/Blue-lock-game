// Initiating the required Variables and Constants
const gridRows = 5;
const gridCols = 6;
const totalTiles = gridRows * gridCols;
let timeLeft = 30;
let positionIsagi, positionBachira, positionNagi, positionGagamaru;
let gamesWon = 0;
let totalGames = 0;
let gameStarted = false; 
let gameOver = false; 

const isagiDialogue = new Audio('im-a-striker.mp3'); 
const nagiCatchSound = new Audio('nagi.mp3'); 
const bachiraCatchSound = new Audio('bachira.mp3');
const goalSound = new Audio('goal.mp3'); 

const tiles = [];
for (let i = 1; i <= totalTiles; i++) {
    const tile = document.getElementById(`tile-${i}`);
    if (tile) {
        tiles.push(tile);
    }
}

let goalPost = [];
for (let i = 1; i <= 3; i++) {
    const goalTile = document.getElementById(`goal-${i}`);
    if (goalTile) {
        goalPost.push(goalTile);
    }
}

const timeDisplay = document.getElementById('time');
const upButton = document.getElementById('up');
const downButton = document.getElementById('down');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const shootButton = document.getElementById('shoot');
const promptText = document.getElementById('prompt-text');
const gamesWonDisplay = document.getElementById('games-won');
const totalGamesDisplay = document.getElementById('total-games');
const restartYesButton = document.getElementById('restart-yes');
const restartNoButton = document.getElementById('restart-no');
const restartPrompt = document.getElementById('restart-prompt');

// Local Storage for Game Stats

function loadStats() {
    const storedWins = localStorage.getItem('gamesWon');
    const storedTotal = localStorage.getItem('totalGames');
    if (storedWins) gamesWon = parseInt(storedWins, 10);
    if (storedTotal) totalGames = parseInt(storedTotal, 10);
    updateStatsDisplay();
}

function saveStats() {
    localStorage.setItem('gamesWon', gamesWon.toString());
    localStorage.setItem('totalGames', totalGames.toString());
}

function updateStatsDisplay() {
    gamesWonDisplay.textContent = gamesWon;
    totalGamesDisplay.textContent = totalGames;
}

function incrementTotalGames() {
    totalGames++;
    updateStatsDisplay();
    saveStats();
}

function incrementGamesWon() {
    gamesWon++;
    updateStatsDisplay();
    saveStats();
}


function resetGame() {
    clearInterval(timerInterval); // Clear the old timer
    timeLeft = 30;
    timeDisplay.textContent = `${timeLeft} sec`;
    metavCount = 0;
    isDisabled = false;
    gameOver = false; // Reset gameOver flag

    // Clear board tiles
    tiles.forEach(tile => {
        tile.innerHTML = "";
        tile.style.backgroundColor = ""; 
        tile.classList.remove('selectable'); 
        tile.style.cursor = "default";
    });
    selectableTiles.forEach(tileNum => {
        const tile = document.getElementById(`tile-${tileNum}`);
        if (tile) {
            tile.classList.add('selectable');
            tile.style.backgroundColor = "#fdd835"; 
            tile.style.cursor = "pointer";
        }
    });

    // Reset goalpost
    for (let i = 1; i <= 3; i++) {
        const goalTile = document.getElementById(`goal-${i}`);
        if (goalTile) {
            goalTile.innerHTML = ""; 
        }
    }

    
    positionIsagi = null; 
    positionBachira = 21;
    positionNagi = 3;
    positionGagamaru = 1;


    if (goalPost[positionGagamaru]) {
        goalPost[positionGagamaru].appendChild(gagamaru);
    }

    promptText.style.display = "block"; // Show the prompt text again

    // Restart timer
    startTimer();
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startTimer(); // Start timer only when game begins
        timeDisplay.style.display = "block"; 
        promptText.style.display = "block";
        promptText.textContent = "Choose your starting position (Tiles 25-30)"; 
    }
}

function playGoalSound() {
    goalSound.play();
}

function playNagiCatchSound() {
    nagiCatchSound.play();
}

function playBachiraCatchSound() {
    bachiraCatchSound.play();
}

function playIsagiDialogue() {
    if (!gameOver) {
        isagiDialogue.play();
    }
}

// User Input and Initial Positioning

// Highlight selectable tiles (Tiles 25-30) and set up initial game state
const selectableTiles = [25, 26, 27, 28, 29, 30];
selectableTiles.forEach(tileNum => {
    const tile = document.getElementById(`tile-${tileNum}`);
    if (tile) {
        tile.classList.add('selectable'); // Use class 'selectable' for styling
        tile.addEventListener("click", function () {
            if (positionIsagi === null) { // Only allow selection if Isagi is not yet placed
                selectableTiles.forEach(num => {
                    const selectableTile = document.getElementById(`tile-${num}`);
                    if (selectableTile) {
                        selectableTile.classList.remove('selectable'); // Remove class for styling
                        selectableTile.style.backgroundColor = ""; // Clear background color
                        selectableTile.style.cursor = "default";
                    }
                });
                positionIsagi = tileNum - 1; // Adjust to array index
                // Ensure Isagi is placed only when selected
                positionBachira = (tileNum < 27) ? 20 : 21;
                positionNagi = (tileNum < 27) ? 2 : 3;
                if (!document.getElementById('isagi')) {
                    tiles[positionIsagi].appendChild(isagi);
                }
                if (!document.getElementById('bachira') && tiles[positionBachira]) {
                    tiles[positionBachira].appendChild(bachira);
                }
                if (!document.getElementById('nagi') && tiles[positionNagi]) {
                    tiles[positionNagi].appendChild(nagi);
                }
                promptText.style.display = "none"; // Hide the prompt after selection
                incrementTotalGames(); 
            }
        });
    }
});

// Create Game Characters (Isagi, Bachira, Nagi, Gagamaru)

// Create Isagi
const isagi = document.createElement('img');
isagi.src = 'https://i.redd.it/pn69t0l7ane91.jpg';
isagi.id = 'isagi';

// Create Bachira
const bachira = document.createElement('img');
bachira.src = 'https://i.pinimg.com/736x/9f/47/3a/9f473a4340e070e3e7eb2f318285db7e.jpg';
bachira.id = 'bachira';

// Create Nagi
const nagi = document.createElement('img');
nagi.src = 'https://i.pinimg.com/736x/a7/52/48/a75248fcce571b28cc860a8baee1e92d.jpg';
nagi.id = 'nagi';

// Create Gagamaru
const gagamaru = document.createElement('img');
gagamaru.src = 'https://i.pinimg.com/736x/fa/ec/ed/faeced45bc2823ae1b31822c06cee9d7.jpg';
gagamaru.id = 'gagamaru';

// Timer Setup
let timerInterval; 
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showRestartPrompt('Time is up! Game Over!');
            resetGame(); // Reset game instead of reload
        } else {
            timeLeft--;
            timeDisplay.textContent = `${timeLeft} sec`;
        }
    }, 1000);
}

// Game Logic Functions

function moveIsagi(newPosition) {
    if (positionIsagi === null || newPosition < 0 || newPosition >= totalTiles) return;
    const isagi = document.getElementById('isagi');
    if (!isagi || !tiles[positionIsagi].contains(isagi)) return;

    tiles[positionIsagi].innerHTML = ""; // Clear image using innerHTML for animation purposes
    tiles[newPosition].appendChild(isagi);
    positionIsagi = newPosition;

    
    
    if (positionIsagi === positionBachira) {
        playBachiraCatchSound();
        gameOver = true; // Set gameOver flag
        setTimeout(() => {
            showRestartPrompt('Game Over! Bachira caught you!');
            resetGame();
        },5000); // Adjust delay as needed
        return;
    }
    if (positionIsagi === positionNagi) {
        playNagiCatchSound();
        gameOver = true; // Set gameOver flag
        setTimeout(() => {
            showRestartPrompt('Game Over! Nagi caught you!');
            resetGame();
        }, 2000); // Adjust delay as needed
        return;
    }
    moveDefenders();
    moveGagamaru();
    
    setTimeout(() => {
        playIsagiDialogue();
    }, 2000);

}

// Function to move defenders (Bachira and Nagi)
function moveDefenders() {
    // Calculate row and column for each character
    let isagiRow = Math.floor(positionIsagi / gridCols);
    let isagiCol = positionIsagi % gridCols;
    let bachiraRow = Math.floor(positionBachira / gridCols);
    let bachiraCol = positionBachira % gridCols;
    let nagiRow = Math.floor(positionNagi / gridCols);
    let nagiCol = positionNagi % gridCols;

    let moveBachira = Math.random() < 0.5;
    let moveNagi = Math.random() < 0.5;

    if (moveBachira) {
       
        let newBachiraRow = bachiraRow;
        let newBachiraCol = bachiraCol;
        if (Math.abs(isagiRow - bachiraRow) > Math.abs(isagiCol - bachiraCol)) {
            newBachiraRow += isagiRow > bachiraRow ? 1 : -1;
        } else {
            newBachiraCol += isagiCol > bachiraCol ? 1 : -1;
        }
        let newBachiraPos = newBachiraRow * gridCols + newBachiraCol;

        if (newBachiraPos === positionNagi) {
            newNagiPos = (newBachiraPos > 0) ? newBachiraPos - 1 : newBachiraPos + 1;
        }
        if (newBachiraPos >= 0 && newBachiraPos < totalTiles) {
            tiles[positionBachira].innerHTML = ""; 
            tiles[newBachiraPos].appendChild(bachira);
            positionBachira = newBachiraPos;

            if (positionBachira === positionIsagi) {
                playBachiraCatchSound();
                gameOver = true;
                setTimeout(() => {
                    showRestartPrompt('Game Over! Bachira caught you!');
                    resetGame();
                }, 5000); 
                return;
            }
        }
    }

    if (moveNagi) {
        // Determine new position for Nagi
        let newNagiRow = nagiRow;
        let newNagiCol = nagiCol;
        if (Math.abs(isagiRow - nagiRow) > Math.abs(isagiCol - nagiCol)) {
            newNagiRow += isagiRow > nagiRow ? 1 : -1;
        } else {
            newNagiCol += isagiCol > nagiCol ? 1 : -1;
        }
        let newNagiPos = newNagiRow * gridCols + newNagiCol;
        if (newNagiPos === positionBachira) {
            newNagiPos = (newNagiPos > 0) ? newNagiPos - 1 : newNagiPos + 1;
        }

        if (newNagiPos >= 0 && newNagiPos < totalTiles) {
            tiles[positionNagi].innerHTML = ""; 
            tiles[newNagiPos].appendChild(nagi);
            positionNagi = newNagiPos;
            if (positionNagi === positionIsagi) {
                playNagiCatchSound();
                gameOver = true; 
                setTimeout(() => {
                    showRestartPrompt('Game Over! Nagi caught you!');
                    resetGame();
                }, 1000);
                return;
            }
        }
    }
}


function moveGagamaru() {
    let newPosition = Math.floor(Math.random() * 3);
    goalPost[positionGagamaru].innerHTML = "";
    goalPost[newPosition].appendChild(gagamaru);
    positionGagamaru = newPosition;
}

// Event Listeners

// Button controls for movement
upButton.onclick = () => {
    if (positionIsagi !== null && positionIsagi >= gridCols) {
        moveIsagi(positionIsagi - gridCols);
    }
};
downButton.onclick = () => {
    if (positionIsagi !== null && positionIsagi + gridCols < totalTiles) {
        moveIsagi(positionIsagi + gridCols);
    }
};
leftButton.onclick = () => {
    if (positionIsagi !== null && positionIsagi % gridCols !== 0) {
        moveIsagi(positionIsagi - 1);
    }
};
rightButton.onclick = () => {
    if (positionIsagi !== null && (positionIsagi + 1) % gridCols !== 0) {
        moveIsagi(positionIsagi + 1);
    }
};

// Shooting Logic
const goalPositions = [1, 2, 3, 4];
shootButton.onclick = function () {
    if (positionIsagi !== null && goalPositions.includes(positionIsagi)) {
        let isGoal = true; 

        if ((positionIsagi === 1 && positionGagamaru === 0) ||
            ((positionIsagi === 2 || positionIsagi === 3) && positionGagamaru === 1) ||
            (positionIsagi === 4 && positionGagamaru === 2)) {
            isGoal = false; // Goal is NOT scored in these cases
        }

        if (!isGoal) {
            showRestartPrompt('Game Over! You hit the goalkeeper!');
        } else {
            playGoalSound(); // Play goal sound when goal is scored
            setTimeout(() => {
                
                showRestartPrompt('Goal Scored! You Win!');
                incrementGamesWon();
                resetGame(); 
            }, 3000);
            
        }
    }
};

restartYesButton.onclick = () => {
    restartPrompt.style.display = "none"; 
   
    clearInterval(timerInterval);
    timeLeft = 30;
    timeDisplay.textContent = `${timeLeft} sec`;
    positionIsagi = null;
    positionBachira = 21;
    positionNagi = 3;
    positionGagamaru = 1;
    tiles.forEach(tile => tile.innerHTML = ""); 
    goalPost.forEach(goal => goal.innerHTML = "");
    if (goalPost[positionGagamaru]) {
        goalPost[positionGagamaru].appendChild(gagamaru); 
    }
    startGame();
};

restartNoButton.onclick = () => {
    restartPrompt.style.display = "none"; 
};

// Keyboard controls
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w': // W key for up
            if (positionIsagi !== null && positionIsagi >= gridCols) {
                moveIsagi(positionIsagi - gridCols);
            }
            break;
        case 's': // S key for down
            if (positionIsagi !== null && positionIsagi + gridCols < totalTiles) {
                moveIsagi(positionIsagi + gridCols);
            }
            break;
        case 'a': // A key for left
            if (positionIsagi !== null && positionIsagi % gridCols !== 0) {
                moveIsagi(positionIsagi - 1);
            }
            break;
        case 'd': // D key for right
            if (positionIsagi !== null && (positionIsagi + 1) % gridCols !== 0) {
                moveIsagi(positionIsagi + 1);
            }
            break;
        case ' ': // Spacebar for shoot
            shootButton.onclick(); // Programmatically trigger the shoot button's click event
            break;
    }
});

// Function to show restart prompt with a message
function showRestartPrompt(message) {
    const restartMessage = document.getElementById('restart-message');
    restartMessage.textContent = message;
    restartPrompt.style.display = "block";
}

// Initialize Game State on Load
loadStats(); // Load stats from local storage
resetGame();  // Initialize game state, including positions and timer
