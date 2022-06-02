const buttons = Array.from(document.getElementsByTagName('button'));
const buttonCont = document.getElementById("btncnt");


let playerScoreCounter = 0;
let computerScoreCounter = 0;
let roundCounter = 1;


// event handler
// controller functions
// computer 1 game and updates screen
function clicked(e) {
    const computerMove = computerPlay();
    const playerMove = e.currentTarget.name
    console.log(playerMove)
    const winner = determineWinner(playerMove, computerMove)
    updateScreen(winner, playerMove, computerMove);
}

// add event listeners
buttons.forEach(button => {
    button.addEventListener('click', clicked);
});



function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false;
    });
    buttonCont.classList.add('anim');
}


function disableButtons() {
    buttons.forEach(button => {
        button.disabled = true;
    });
    buttonCont.classList.remove('anim');
}

function computerPlay() {
    const moves = ['Scissors', 'Rock', 'Paper'];
    const random = Math.floor(Math.random()*3);
    
    return moves[random];
}



function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        return 'draw';
    } else if (
        (playerMove === 'Scissors' && computerMove === 'Paper') ||
        (playerMove === 'Rock' && computerMove === 'Scissors') ||
        (playerMove === 'Paper' && computerMove === 'Rock')
    ) {
        playerScoreCounter++;
        return 'player';
    } else {
        computerScoreCounter++;
        return 'computer';
    }
}

function updateScreen(winner, playerMove, computerMove) {
    const playerScore = document.getElementById('playerscore');
    const computerScore = document.getElementById('computerscore');
    const result = document.getElementById('result');
    const round = document.getElementById('round');
    

    // updating result label depending on winner
    // showing who won round here
    if (winner === 'player') {
        result.innerText = `You Win! ${playerMove} beats ${computerMove}`
        result.classList.remove('lose')
        result.classList.add('win')
        result.classList.remove('draw')
    } else if (winner === 'draw') {
        result.innerText = `It's a Draw`
        result.classList.remove('lose')
        result.classList.remove('win')
        result.classList.add('draw')
    } else {
        result.classList.remove('win')

        result.innerText = `You Lose! ${computerMove} beats ${playerMove}`
    }
    result.style.visibility = 'visible';
    
    
    roundCounter++;
    disableButtons();

    // buttons disabled after 2sec this time out function will update score and round labels on the DOM
    // also handles when 5th rounds have been played to reset everything

    setTimeout(() => {

        playerScore.innerText = `Your Score: ${playerScoreCounter}`
        computerScore.innerText = `Computer Score: ${computerScoreCounter}`

        result.classList.remove('lose')
        result.classList.remove('draw')
        result.classList.remove('win')
        result.innerText = `Fight`
        enableButtons();

        if (roundCounter === 6) {
            disableButtons();
            // final score output on the screen
            if (computerScoreCounter === playerScoreCounter) {
                result.innerText = `Its a draw ${playerScoreCounter} - ${computerScoreCounter}`
            } else if (computerScoreCounter > playerScoreCounter) {
                result.innerText = `Computer wins ${computerScoreCounter} - ${playerScoreCounter}`
            } else {
                result.innerText = `You WIN! ${playerScoreCounter} - ${computerScoreCounter}`
            }
            

            playerScoreCounter = 0;
            computerScoreCounter = 0;
            roundCounter = 1;
            
            setTimeout(() => {
                enableButtons();
            }, 2000);

            setTimeout(() => {
                round.innerText = `Round: ${roundCounter}`;
                result.innerText = `Fight`  
                playerScore.innerText = `Your Score: ${playerScoreCounter}`
                computerScore.innerText = `Computer Score: ${computerScoreCounter}`
            }, 2000)
            return;
        } else {
            round.innerText = `Round: ${roundCounter}`; 
        }
    }, 2000)
}