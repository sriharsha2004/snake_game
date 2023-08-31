let board = document.getElementById('board');
let scorecard = document.getElementById('scorecard');
let high = document.getElementById('high');
let speed = 10;
let lasttime =0;
let snakeArr = [{x:5 , y:10}];
let food = {x:10,y:5}
let score = 0;
let a = 2;
let b = 18;

function collide(snakeArr){
    if(snakeArr[0].x > 20 || snakeArr[0].x<=0 || snakeArr[0].y > 20 || snakeArr[0].y <= 0 ){
        return true;
    }
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y){
            return true;
        }        
    }    
    return false;
}

function run(){

    if(collide(snakeArr)){
        snakeArr = [{x:5,y:10}]
        food ={x:10,y:5};
        inputdir = {x:0,y:0}
        score = 0;
        scorecard.innerHTML = "<b>Score : 0</b>";
        alert("Game over! Enter any key to play the game again");
    }


    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x ; 
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


    if(food.x === snakeArr[0].x && food.y === snakeArr[0].y){
        score+=1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            high.innerHTML = "<b>High score :</b>"+hiscoreval;
        
        }
        scorecard.innerHTML = "<b>Score : </b><b>"+score+"</b>";
        snakeArr.unshift({x : snakeArr[0].x + inputdir.x , y: snakeArr[0].y + inputdir.y})
        food = {x : Math.round( a+(b-a)*Math.random()) , y:Math.round( a+(b-a)*Math.random())}
    }

    for (let i = snakeArr.length - 2; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}else{
    hiscoreval = JSON.parse(hiscore);
    high.innerHTML = "<b>High Score : </b><b>"+hiscore+"</b>";
}
inputdir = {x:0,y:0};
window.addEventListener('keydown',e => {
    inputdir = {x:0,y:0};
    if(e.key == "ArrowUp"){
        console.log("up");
        inputdir.x = 0;
        inputdir.y = -1; 
    }
    if(e.key == 'ArrowDown'){
        console.log("down");
        inputdir.x = 0;
        inputdir.y = 1; 
    }
    if(e.key == 'ArrowLeft'){
        console.log("left");
        inputdir.x = -1;
        inputdir.y = 0; 
    }
    if(e.key == 'ArrowRight'){
        console.log("rit");
        inputdir.x = 1;
        inputdir.y = 0;
    }
})

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lasttime)/1000 < 1/speed){
        return;
    }
    lasttime = ctime;

    run();
}

window.requestAnimationFrame(main)
