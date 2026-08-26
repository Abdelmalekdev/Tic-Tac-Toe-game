
let currentPlayer = 1;
let gameContainer = document.querySelector('#game-container');



for (let i = 0; i < gameContainer.children.length; i++) {
    gameContainer.children[i].addEventListener('click', handleClick);
}

function handleClick(e) {
    const cell = e.currentTarget;

    if ( cell.innerHTML === ''){
        if (currentPlayer === 1) {
            cell.innerHTML = '<i class="fa-solid fa-x text-8xl"></i>';
            if (checkWinner(currentPlayer) === 0){
                checkDraw();
            } else{
                resetGame();
            }
            currentPlayer = 2;
        }
        else {
            cell.innerHTML = '<i class="fa-solid fa-o text-8xl"></i>';
            if (checkWinner(currentPlayer) === 0){
                checkDraw();
            } else{
                resetGame();
            }
            currentPlayer = 1;
        }
    }
}



function checkWinner(x) {
    let winner = 0;
    for (let j = 0; j < 3; j++){

        for (let i = j; i < j+3; i++){
            if (gameContainer.children[i].innerHTML != gameContainer.children[i+1].innerHTML){
                break
            }
            else if (i === j+2){
                winner = x;
            }
        }
        if (winner === x){
            break
            
        }
    }

    if (winner === 1){
        for (let j = 0; j < 3; j++){
            for (let i = j; i < j+6; i+=3){
                if (gameContainer.children[i].innerHTML != gameContainer.children[i+3].innerHTML){
                    break
                }
                else if (i === j+6){
                    winner = x;
                    
                }
            }

            if (winner === x){
                break
            }    
        }
    }

    if (winner === 1){
        for(let i = 0; i < 8; i+=4){
            if (gameContainer.children[i].innerHTML != gameContainer.children[i+4].innerHTML){
                    break
                }
                else if (i === 8){
                    winner = x;
                }
        }
    }

    if (winner === 1){
        for(let i = 2; i < 6; i+=2){
            if (gameContainer.children[i].innerHTML != gameContainer.children[i+2].innerHTML){
                    break
                }
                else if (i === 6){
                    winner = x;
                }
        }
    }

    return winner;
}
 
let playerXScore = docunement.querySelector('#player-x-score');
let playerOScore = docunement.querySelector('#player-o-score');
let DrawScore = docunement.querySelector('#draw-score');

function checkDraw(){
    let draw = false;
    for (let i = 0; i < 9; i++){
        if (gameContainer.children[i].innerHTML === ''){
            resetGame();
            draw = true;
            break
        }
    }
    return draw;
}

function resetGame() {
    for (let i = 0; i < 9; i++){
        gameContainer.children[i].innerHTML = '';
    }

    if(checkWinner(currentPlayer) === 1){
        playerXScore.innerHTML = parseInt(playerXScore.innerHTML) + 1;
    } else if (checkWinner(currentPlayer) === 2){
        playerOScore.innerHTML = parseInt(playerOScore.innerHTML) + 1;
    } else{
        DrawScore.innerHTML = parseInt(DrawScore.innerHTML) + 1;
    }
}
