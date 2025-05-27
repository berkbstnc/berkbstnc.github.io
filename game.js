const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;
let gameOver = false;

function jump() {
    if (isJumping) return;
    isJumping = true;
    let upInterval = setInterval(() => {
        let dinoTop = parseInt(window.getComputedStyle(dino).bottom);
        if (dinoTop >= 120) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                dinoTop = parseInt(window.getComputedStyle(dino).bottom);
                if (dinoTop <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dino.style.bottom = (dinoTop - 5) + 'px';
                }
            }, 15);
        } else {
            dino.style.bottom = (dinoTop + 5) + 'px';
        }
    }, 15);
}

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !gameOver) {
        jump();
    }
    if (gameOver && e.code === 'Space') {
        window.location.reload();
    }
});

function moveObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).right);
    if (obstacleLeft >= 600) {
        obstacle.style.right = '0px';
        score++;
        scoreDisplay.textContent = 'Skor: ' + score;
    } else {
        obstacle.style.right = (obstacleLeft + 5) + 'px';
    }
}

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    if (
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top &&
        dinoRect.top < obstacleRect.bottom
    ) {
        gameOver = true;
        scoreDisplay.textContent = 'Oyun Bitti! Skor: ' + score + ' (Yeniden başlamak için boşluk)';
        clearInterval(gameLoop);
    }
}

function gameTick() {
    if (!gameOver) {
        moveObstacle();
        checkCollision();
    }
}

obstacle.style.right = '0px';
const gameLoop = setInterval(gameTick, 20);
dino.style.bottom = '0px'; 