const name = document.getElementById('name-input');
const nameButton = document.getElementById('start');
const container = document.querySelector('.container');
const gameSection = document.getElementById('game-section');
const gameArea = document.getElementById('game-area');
const userName = document.getElementById('userName')
// Game-area buttons
const gameButtons = document.querySelectorAll('.game-buttons');
const gameStartButton = document.getElementById('game-start');
const easyButton = document.getElementById('easy');
const mediumButton = document.getElementById('medium');
const hardButton = document.getElementById('hard');
const stopButton = document.getElementById('stop-game')
//SOUND
const audio = document.getElementById('sound');
//SCORE
let score = document.getElementById('score');
let highScore = document.getElementById('high-score');

gameSection.style.display = 'none';

let interval;
let timingInterval = 2000;
let mode = 'easy'

nameButton.addEventListener('click', function(){
    userName.innerText = name.value;
    const newName = name.value
    console.log(newName)
    container.style.display = "none"
    gameSection.style.display = 'block'
    highScore.innerText = window.localStorage.getItem("highScore");
});

let spanLength = 1;
let scoreValue = 0;
let highScoreValue = 0;

gameStartButton.addEventListener('click', function() {
    startGame(timingInterval);
});

stopButton.addEventListener('click', function() {
    stopGame();
});

easyButton.addEventListener('click', function() {
    startGame(timingInterval);
    mode = 'easy'
})
mediumButton.addEventListener('click', function() {
    startGame(1500);
    scoreValue+2
    mode = 'medium'
})
hardButton.addEventListener('click', function() {
    startGame(800);
    scoreValue+3
    mode = 'hard'
})

function stopGame() {
    clearInterval(interval);
};

function startGame(timing) {
    mode = '    '
    clearInterval(interval);
    interval = setInterval(() => {
        fromLocalStorage();
        if(spanLength > 50) {
            stopGame();
            gameArea.innerHTML = ""
            spanLength = 0;
            alert("Game stoped");
            if(+score.innerText > +highScore.innerText) {
                highScore.innerText = score.innerText
            }
            scoreValue = 0;
            return
        }
        randomLeftX = Math.floor(Math.random() * 350)
        randomLeftY= Math.floor(Math.random() * 350)
        
        let span = document.createElement('span');
        span.className= 'bubble';
        span.style.left = randomLeftX+'px';
        span.style.top = randomLeftY+'px';

        span.addEventListener('click', function(e){
            fromLocalStorage();
            e.target.remove();
            audio.play();
            spanLength--;
            if(mode == 'easy') {
                scoreValue++;
            } else if(mode == 'medium') {
                scoreValue += 2;
            } else if(mode == 'hard') {
                scoreValue += 3;
            }
        });
        score.innerText = scoreValue;
        
        gameArea.appendChild(span)
        spanLength++
    }, timing);
};


const fromLocalStorage = () => {
    if (+score.innerText > +highScore.innerText) {
      window.localStorage.setItem("highScore", score.innerText);
      highScore.innerText = score.innerText;
    }
};
  