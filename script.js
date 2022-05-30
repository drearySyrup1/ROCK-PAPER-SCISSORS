function computerPlay() {

    let moves = ['rock', 'paper', 'scissors'];

    let rand = Math.floor(Math.random()*3);

    return moves[rand];
}

function playSingleRound(playerSelection, computerSelection) {

    if (playerSelection === computerSelection) {
        return ['Draw', 'draw']
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
        return [`You Win! ${playerSelection} beats ${computerSelection}`,'player']
    } else {
        return [`You Lose! ${computerSelection} beats ${playerSelection}`,'computer']
    }

}


function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 1; i <= 5; i++) {
        console.log(`Round: ${i}`);

        let playerSelection;

        while (true) {
            playerSelection = prompt(": ").toLowerCase();

            if (playerSelection === 'rock' ||
            playerSelection === 'paper' ||
            playerSelection === 'scissors') {
                break;
            } else {
                console.log("Wrong")
            }
        }


        let round = playSingleRound(playerSelection, computerPlay());
        console.log(round[0])

        if (round[1] !== 'draw') {
            if (round[1] === 'player') {
                playerScore++;
            } else {
                computerScore++;
            }
        }
    }

    console.log(`Final Scores
    Player: ${playerScore}
    Computer: ${computerScore}`)
}


game();