let game_start = document.querySelector('.game__game-start');
let game_play = document.querySelector('.game__game-play');

document.querySelector('.game__button-play').addEventListener('click', () => {
    game_play.style.display = 'block';
    game_start.style.display = 'none';
    gamePlay();
});

let gamePlay = () => {
  startTime();
  pointCircle();
};

let angle = 60;
let speedBird = 10;
let valueTime = 100;
let score = 0;

let positionLeft_bird = [];
let positionBottom_bird = [];


let startTime = () => {
    if(valueTime > 0){
        setTimeout(() => {
            valueTime--;
            let min = Math.floor(valueTime / 60);
            let sec = valueTime - min * 60;
            startTime();
            if(min === 0 || min < 10){
                if(sec < 10){
                    document.querySelector('.game-play__time').innerText = 'Time: 0'+min+':0'+sec;
                }else{
                    document.querySelector('.game-play__time').innerText = 'Time: 0'+min+':'+sec;
                }
            }else{
                if(sec < 10){
                    document.querySelector('.game-play__time').innerText = 'Time: '+min+':0'+sec;
                }else{
                    document.querySelector('.game-play__time').innerText = 'Time: '+min+':'+sec;
                }
            }

        },1000)
    }
};

document.querySelector('.game-play__button-run').addEventListener('click', () => {
    j = 1;
    runBird();
});

let pointCircle = () => {
    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 37:
                leftCircle();
                break;
            case 38:
                topCircle();
                break;
            case 39:
                rightCircle();
                break;
            case 40:
                bottomCircle();
                break;
            case 13:
                j = 1;
                runBird();
                break;
        }
    });

    document.querySelector('.game-play__button_left').addEventListener('click', () => {
        leftCircle();
    });

    document.querySelector('.game-play__button_top').addEventListener('click', () => {
        topCircle();
    });

    document.querySelector('.game-play__button_right').addEventListener('click', () => {
        rightCircle();
    });

    document.querySelector('.game-play__button_bottom').addEventListener('click', () => {
        bottomCircle();
    });
};



let positionCircle = () => {
    let classCircle = 0;
    positionLeft_bird = [];
    positionBottom_bird = [];
    document.querySelector('.game-play__circles').innerHTML = '';
    for(let circle_left = 0; circle_left <= 2000; circle_left += 25 ){
        let circle_top = Math.floor(circle_left * Math.tan(angle) - ((9.81) / (2 * speedBird * speedBird * Math.cos(angle) * Math.cos(angle)) * circle_left * circle_left));
        classCircle += 1;

        if(circle_top + 350 > 140){
            let div = document.createElement('div');
            div.className = 'circle circle-'+classCircle;
            div.style.left = circle_left+200 + 'px';
            div.style.bottom = circle_top+350 +'px';
            positionLeft_bird.push(circle_left + 150);
            positionBottom_bird.push(circle_top + 300);
            document.querySelector('.game-play__circles').appendChild(div);
        }
    }
};

let leftCircle = () => {
    speedBird -= 5;
    positionCircle();
};

let topCircle = () => {
    angle += 5;
    positionCircle();
};

let rightCircle = () => {
    speedBird += 5;
    positionCircle();
};

let bottomCircle = () => {
    angle -= 5;
    positionCircle();
};

let j = 1;

let runBird = () =>{
    let positionBird = positionBottom_bird.length;

    setTimeout(() => {
        if(positionBird+1 > j ){
            document.querySelector('.game-play__bird-red').style.left = positionLeft_bird[j] + 'px';
            document.querySelector('.game-play__bird-red').style.bottom = positionBottom_bird[j] + 'px';
            runBird();
            document.querySelector('.circle-'+j).classList.remove('circle');
            j++;

            caliziaBird(positionBottom_bird[j], positionLeft_bird[j]);

        }else{
            clearTimeout(runBird);
            document.querySelector('.game-play__bird-red').style.left = 8 + 'vw';
            document.querySelector('.game-play__bird-red').style.bottom = 38 + 'vh';
        }
    },38)
};

let caliziaBird = (y, x) => {
    let boxs_length = document.querySelectorAll('.boxs__box').length;
    let bird = document.querySelector('.game-play__bird-red');
    for(let i = 0; i < boxs_length; i++){
        let box = document.querySelectorAll('.boxs__box')[i];

        if(box){
            if(box.offsetLeft <= bird.offsetLeft+85 && box.offsetLeft+100 >= bird.offsetLeft && box.offsetTop <= bird.offsetTop+85 && box.offsetTop+100 >= bird.offsetTop){
                box.remove();
                score += 1;
                document.querySelector('.game-play__score').innerText = 'Score: '+score;
            }
        }
    }
};

