
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

    if (stopGame) {
        return
    }
    const cell = e.currentTarget;
    
    if ( cell.innerHTML === ''){
        if (currentPlayer === 1) {

            cell.innerHTML = '<img src="icons/X.svg" class="xo-animation">'; 

            if (checkWinner(1) === 0){
                checkDraw();
                currentPlayer = 2; 
                turnIndicator.innerHTML = '<img src="icons/O.svg" class="w-[5%]">';
            } else{
                resetGame(1);
            }
            
        }
        else {
            cell.innerHTML = '<img src="icons/O.svg" class="xo-animation">';

            if (checkWinner(2) === 0){
                checkDraw();
                currentPlayer = 1;
                turnIndicator.innerHTML = '<img src="icons/X.svg" class="w-[5%]">';
            } else{
                resetGame(2);
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

function getCellImg(index) {
    let img = gameContainer.children[index].querySelector('img');
    return img ? img.getAttribute('src') : ''; 
}

function checkWinner(x) {
    let winner = 0;

    for (let j = 0; j <= 6; j+=3){

        for (let i = j; i <= j+1; i++){
            if (getCellImg(i) !== '' && getCellImg(i+1) !== ''){
                if (getCellImg(i) !== getCellImg(i+1)){
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
                if (getCellImg(i) !== '' && getCellImg(i+3) !== ''){
                    if (getCellImg(i) !== getCellImg(i+3)){
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
            if (getCellImg(i) !== '' && getCellImg(i+4) !== ''){
                if (getCellImg(i) !== getCellImg(i+4)){
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
            if (getCellImg(i) !== '' && getCellImg(i+2) !== ''){
                if (getCellImg(i) != getCellImg(i+2)){
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

    stopGame = true;

    if(result === 1){
        playerXScore.classList.remove('xo-animation');
        void playerXScore.offsetWidth;
        playerXScore.innerHTML = parseInt(playerXScore.innerHTML) + 1;
        playerXScore.classList.add('xo-animation');
    } else if (result === 2){
        playerOScore.classList.remove('xo-animation');
        void playerOScore.offsetWidth;
        playerOScore.innerHTML = parseInt(playerOScore.innerHTML) + 1;
        playerOScore.classList.add('xo-animation');
    } else if (result === 0){
        drawScore.classList.remove('xo-animation');
        void drawScore.offsetWidth;
        drawScore.innerHTML = parseInt(drawScore.innerHTML) + 1;
        drawScore.classList.add('xo-animation');
    }

}

let credit = document.querySelector('#credit');
let creditText = document.querySelector('#credit-text');

credit.addEventListener('mouseenter', function(){
    creditText.classList.remove('md:opacity-0');
})

credit.addEventListener('mouseleave', function(){
    creditText.classList.add('md:opacity-0');
})
