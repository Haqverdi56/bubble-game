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

nameButton.addEventListener('click', function(){
    userName.innerText = name.value;
    const newName = name.value
    console.log(newName)
    container.style.display = "none"
    gameSection.style.display = 'block'
});

gameStartButton.addEventListener('click', function() {
    startGame(timingInterval);
});

stopButton.addEventListener('click', function() {
    stopGame();
});

easyButton.addEventListener('click', function() {
    startGame(timingInterval);
})
mediumButton.addEventListener('click', function() {
    startGame(1500)
})
hardButton.addEventListener('click', function() {
    startGame(800);
})

function stopGame() {
    clearInterval(interval);
};

let spanLength = 1;
let scoreValue = 0;
let highScoreValue = 0;

function startGame(timing) {
    clearInterval(interval);
    interval = setInterval(() => {
        
        if(spanLength > 5) {
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
            e.target.remove();
            audio.play();
            spanLength--;
            scoreValue++;
        });
        score.innerText = scoreValue;
        
        gameArea.appendChild(span)
        spanLength++
    }, timing);
};
