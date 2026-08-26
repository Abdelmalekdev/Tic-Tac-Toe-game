
let currentPlayer = 1;
let gameContainer = document.querySelector('#game-container');
let restartBtn = document.querySelector('#restart-btn');
let turnIndicator = document.querySelector('#turn-indicator');

let stopGame = false;


for (let i = 0; i < gameContainer.children.length; i++) {
    gameContainer.children[i].addEventListener('click', handleClick);
}

restartBtn.addEventListener('click', restartGame);

function handleClick(e) {

    if (stopGame === true) {
        return
    }
    const cell = e.currentTarget;
    
    if ( cell.innerHTML === ''){
        if (currentPlayer === 1) {
            cell.innerHTML = '<i class="fa-solid fa-x text-8xl"></i>'; 

            if (checkWinner(1) === 0){
                checkDraw();
                currentPlayer = 2; 
                turnIndicator.innerHTML = '<i class="fa-solid fa-o text-4xl"></i>';
            } else{
                resetGame(checkWinner(1));
            }
            
        }
        else {
            cell.innerHTML = '<i class="fa-solid fa-o text-8xl"></i>';

            if (checkWinner(2) === 0){
                checkDraw();
                currentPlayer = 1;
                turnIndicator.innerHTML = '<i class="fa-solid fa-x text-4xl"></i>';
            } else{
                resetGame(checkWinner(2));
            }
            
        }
    }
}

function restartGame(){
    for (let i = 0; i < gameContainer.children.length; i++) {
        gameContainer.children[i].innerHTML = '';
    }
    stopGame = false;
}

function checkWinner(x) {
    let winner = 0;
    for (let j = 0; j <= 6; j+=3){

        for (let i = j; i <= j+1; i++){
            if (gameContainer.children[i].innerHTML !== '' && gameContainer.children[i+1].innerHTML !== ''){
                if (gameContainer.children[i].innerHTML !== gameContainer.children[i+1].innerHTML){
                    break
                }
                else if (i === j+1){
                    winner = x;
                }
            } else{
                break
            }
        }
        if (winner === x){
            break    
        }
    }

    if (winner !== x){
        for (let j = 0; j <= 2; j++){
            for (let i = j; i <= j+3; i+=3){
                if (gameContainer.children[i].innerHTML !== '' && gameContainer.children[i+3].innerHTML !== ''){
                    if (gameContainer.children[i].innerHTML !== gameContainer.children[i+3].innerHTML){
                        break
                    }
                    else if (i === j+3){
                        winner = x;
                        
                    }
                } else{
                    break
                }
            }

            if (winner === x){
                break
            }    
        }
    }

    if (winner !== x){
        for(let i = 0; i <= 4; i+=4){
            if (gameContainer.children[i].innerHTML !== '' && gameContainer.children[i+4].innerHTML !== ''){
                if (gameContainer.children[i].innerHTML !== gameContainer.children[i+4].innerHTML){
                    break
                } 
                else if (i === 4){
                    winner = x;
                }
            } else{
                break
            }
        }
    }

    if (winner !== x){
        for(let i = 2; i <= 4; i+=2){
            if (gameContainer.children[i].innerHTML !== '' && gameContainer.children[i+2].innerHTML !== ''){
                if (gameContainer.children[i].innerHTML != gameContainer.children[i+2].innerHTML){
                    break
                }
                else if (i === 4){
                    winner = x;
                }
            } else{
                break
            }
        }
    }

    return winner;
}
 
let playerXScore = document.querySelector('#player-x-score');
let playerOScore = document.querySelector('#player-o-score');
let drawScore = document.querySelector('#draw-score');

function checkDraw(){
    let draw = true;
    for (let i = 0; i < 9; i++){
        if (gameContainer.children[i].innerHTML === ''){
            draw = false;
            break
        }
    }
    if (draw === true){
        resetGame(0);
    }
    return draw;
}

function resetGame(result) {

    if(result === 1){
        playerXScore.innerHTML = parseInt(playerXScore.innerHTML) + 1;
    } else if (result === 2){
        playerOScore.innerHTML = parseInt(playerOScore.innerHTML) + 1;
    } else if (result === 0){
        drawScore.innerHTML = parseInt(drawScore.innerHTML) + 1;
    }

    stopGame = true;

}
