let road = document.getElementById('road');
let car = document.getElementById('car');
let obj = document.getElementById('obj');
let score = document.getElementById('sc');
let j = 5, gameScore = 0, vert, horz, highscore;

let gameObj = {}

document.onload(carGame())
function carGame() {

    gameScore = 0
    score.innerText = gameScore
  gameObj = {
    x1 : 250,
    y1 : car.offsetTop,
    w1 : car.offsetWidth,
    h1 : car.offsetHeight,
    h2 : obj.offsetHeight,
    w2 : obj.offsetWidth,
    x2 : 170,
    y2 : 10
  }
  
  obj.style.left = gameObj.x2;
  highscore = window.localStorage.getItem('highest') || 0;
  document.getElementById('hsc').innerText = highscore;
    
  document.addEventListener("keydown", carMove)
  obj.style.top = gameObj.y2;
  car.style.left = gameObj.x1;


  let mover = setInterval(() => {
    vert = (gameObj.y1 < (gameObj.y2 + gameObj.h2)) && ((gameObj.y1 + gameObj.h1) > gameObj.y2)
    horz = (gameObj.x1 < (gameObj.x2 + gameObj.w2)) && ((gameObj.x1 + gameObj.w1) > gameObj.x2)
    if(horz && vert) {
      setHighScore(gameScore, highscore);
      clearInterval(mover);
      alert('Game Over');
      carGame();
    }
    obj.style.top = gameObj.y2;
    if(gameObj.y2 > 613) {
        gameScore += 10
        score.innerText = gameScore;
        gameObj.y2 = -41;
        obj.style.top = gameObj.y2;
        let ran = Math.floor(Math.random()*(510 - 10) - 10);
        gameObj.x2 = ran;
        obj.style.left = gameObj.x2;
    }
    else if(gameObj.y2 >= 587){
        obj.style.height = 30;
        gameObj.y2 += j;
    }
    else{ 
        obj.style.height = 60
        gameObj.y2 += j;
    }
    
}, 13);
}

function carMove(key) {
    if(key.keyCode == 37 && gameObj.x1 > -10) {
        gameObj.x1 -= 10;
    } else if(key.keyCode == 39 && gameObj.x1 < 510) {
        gameObj.x1 += 10;
    }
    car.style.left = gameObj.x1;
}

function setHighScore(a, b) {
    let hiscore = a > b ? a : b;
    window.localStorage.setItem('highest', `${hiscore}`);
}

//formula for horizontal x1 < (x2 + x2.width) && (x1 + x1.width) > x2
//formula for vertical y1 < (y2 + y2.heigh) && (y1 + y1.height) > y2