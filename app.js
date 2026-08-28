

let gameContainer = document.querySelector('#game-container');
let restartBtn = document.querySelector('#restart-btn');
let turnIndicator = document.querySelector('#turn-indicator');

//current player variable 1 for player X and 2 for player O
let currentPlayer = 1;

let stopGame = false;

//add event listener to each cell
for (let i = 0; i < gameContainer.children.length; i++) {
    gameContainer.children[i].addEventListener('click', handleClick);
}
//handle click event
function handleClick(e) {

    //check if the game is stopped
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

//add event listener to restart button
restartBtn.addEventListener('click', restartGame);
//restart game function for restart button event listener
function restartGame(){
    for (let i = 0; i < gameContainer.children.length; i++) {
        gameContainer.children[i].innerHTML = '';
    }
    stopGame = false;
}

//function to get the image source of a cell
function getCellImg(index) {
    let img = gameContainer.children[index].querySelector('img');
    return img ? img.getAttribute('src') : ''; 
}

//function to identify the winner return's : 1 for player X , 2 for player O , 0 for no winner and no draw
function checkWinner(x) {
    let winner = 0;

    //check for horizontal win
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

    //check for vertical win
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

    //check for diagonal win
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
 
//Score Ui variables
let playerXScore = document.querySelector('#player-x-score');
let playerOScore = document.querySelector('#player-o-score');
let drawScore = document.querySelector('#draw-score');

//function to check if the game is a draw return's true for draw and false for no draw
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

//function to stop the game and update the score based on the result 1 for player X win , 2 for player O win , 0 for draw
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

//credit hover effect
let credit = document.querySelector('#credit');
let creditText = document.querySelector('#credit-text');

credit.addEventListener('mouseenter', function(){
    creditText.classList.remove('md:opacity-0');
})

credit.addEventListener('mouseleave', function(){
    creditText.classList.add('md:opacity-0');
})

//developed by Abdelmalek_dev