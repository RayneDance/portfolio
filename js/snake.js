let snake = new GameEngine(game, document.getElementById("snakeCanvas"));
(function(){
    let snakeCanvas = document.getElementById("snakeCanvas");
    let ctx = snakeCanvas.getContext("2d");
    ctx.moveTo(0, 0);
    snake.configuration.debug = false;
    snake.configuration.tickRate = 100;
    snake.canvas = document.getElementById("snakeCanvas");
    createUI();

    snake.addKeybind("W");
    snake.addKeybind("A");
    snake.addKeybind("S");
    snake.addKeybind("D");
    snake.addKeybind("ARROW-LEFT");
    snake.addKeybind("ARROW-RIGHT");
    snake.addKeybind("ARROW-UP");
    snake.addKeybind("ARROW-DOWN");

    snake.newGameObject("GameState");
    snake.gameObjs["GameState"].persist = true;
    snake.gameObjs["GameState"].state = 1; //lobby

    snake.start(gameloop = game());
})();

function game(){
    let state = snake.gameObjs["GameState"]
    if(state.state == 1){
        let input = snake.getLastInput();
        if(input == "ClickCollusion"){
            if(snake.getClickedObject().id == "NewGame"){
                prepGame();
            }
        }
    }
    if(state.state == 2){
        state.snakeSpeed = 2+(2*state.score/12)
        if(Date.now() - state.lastMoveTick > 1000/state.snakeSpeed){
            let header = document.getElementById("snakeHeader");
            header.innerHTML=state.score;
            let input = snake.getLastInput();
            state.lastMoveTick = Date.now();

            let xmov = 0;
            let ymov = 0;
            let newvec = snake.gameObjs["SnakeHead"].vector;
            if(input){
                switch(input){
                    case "W":
                        ymov = -50;
                        newvec = [0,-1,0]
                        break;
                    case "ARROW-UP":
                        ymov = -50;
                        newvec = [0,-1,0]
                        break;
                    case "A":
                        xmov = -50;
                        newvec = [-1,0,0]
                        break;
                    case "ARROW-LEFT":
                        xmov = -50;
                        newvec = [-1,0,0]
                        break;
                    case "S":
                        ymov = 50;
                        newvec = [0,1,0]
                        break;
                    case "ARROW-DOWN":
                        ymov = 50;
                        newvec = [0,1,0]
                        break;
                    case "D":
                        xmov = 50;
                        newvec = [1,0,0]
                        break;
                    case "ARROW-RIGHT":
                        xmov = 50;
                        newvec = [1,0,0]
                        break;
                }
            }

            for(let obj in snake.gameObjs){
                if(obj == "SnakeHead"){
                    if(!(newvec[0] == 1 && snake.gameObjs["SnakeHead"].vector[0] == -1) && !(newvec[0] == -1 && snake.gameObjs["SnakeHead"].vector[0] == 1) &&
                        !(newvec[1] == 1 && snake.gameObjs["SnakeHead"].vector[1] == -1) && !(newvec[1] == -1 && snake.gameObjs["SnakeHead"].vector[1] == 1)){
                        snake.gameObjs["SnakeHead"].vector = newvec;
                        if(newvec[1] == -1){
                            snake.gameObjs["SnakeHead"].rotation = 0;
                            snake.gameObjs["SnakeHead"].y += -50;
                            if(!boundsCheck(snake.gameObjs["SnakeHead"].x, snake.gameObjs["SnakeHead"].y) || !snakeCollusionCheck()){
                                //Game over man.
                                snake.gameObjs["SnakeHead"].y += 50;
                                state.state = 3;
                                return;
                            }
                        }
                        if(newvec[1] == 1){
                            snake.gameObjs["SnakeHead"].rotation = 180;
                            snake.gameObjs["SnakeHead"].y += 50;
                            if(!boundsCheck(snake.gameObjs["SnakeHead"].x, snake.gameObjs["SnakeHead"].y) || !snakeCollusionCheck()){
                                //Game over man.
                                snake.gameObjs["SnakeHead"].y += -50;
                                state.state = 3;
                                return;
                            }
                        }
                        if(newvec[0] == -1){
                            snake.gameObjs["SnakeHead"].rotation = 270;
                            snake.gameObjs["SnakeHead"].x += -50;
                            if(!boundsCheck(snake.gameObjs["SnakeHead"].x, snake.gameObjs["SnakeHead"].y) || !snakeCollusionCheck()){
                                //Game over man.
                                snake.gameObjs["SnakeHead"].x += 50;
                                state.state = 3;
                                return;
                            }
                        }
                        if(newvec[0] == 1){
                            snake.gameObjs["SnakeHead"].rotation = 90;
                            snake.gameObjs["SnakeHead"].x += 50;
                            if(!boundsCheck(snake.gameObjs["SnakeHead"].x, snake.gameObjs["SnakeHead"].y) || !snakeCollusionCheck()){
                                //Game over man.
                                snake.gameObjs["SnakeHead"].x += -50;
                                state.state = 3;
                                return;
                            }
                        }
                    }else{
                        if(snake.gameObjs["SnakeHead"].vector[0] == 1){
                            snake.gameObjs["SnakeHead"].x += 50;
                        }
                        if(snake.gameObjs["SnakeHead"].vector[0] == -1){
                            snake.gameObjs["SnakeHead"].x += -50;
                        }
                        if(snake.gameObjs["SnakeHead"].vector[1] == 1){
                            snake.gameObjs["SnakeHead"].y += 50;
                        }
                        if(snake.gameObjs["SnakeHead"].vector[1] == -1){
                            snake.gameObjs["SnakeHead"].y += -50;
                        }

                    }
                }

                if(obj.includes("SnakeSection")){
                    let current = snake.gameObjs[obj];
                    if(current.vector[0] == 1){
                        current.x += 50;
                        current.rotation = 0;
                    }
                    if(current.vector[0] == -1){
                        current.x += -50;
                        current.rotation = 180;
                    }
                    if(current.vector[1] == 1){
                        current.y += 50;
                        current.rotation = 90;
                    }
                    if(current.vector[1] == -1){
                        current.y += -50;
                        current.rotation = 270;
                    }

                    if(current.nextSegment === undefined){
                        while(current.id != "SnakeHead"){
                            current.vector = current.previousSection.vector;
                            current = current.previousSection;
                        }
                    }
                }
            }

            if(foodCheck()){

            }

            snake.inputs = [];
        }  
    }

    if(state.state == 3){
        gameOverMan();
    }
}

function snakeCollusionCheck(){
    let xy = [snake.gameObjs["SnakeHead"].x, snake.gameObjs["SnakeHead"].y];

    for(let obj in snake.gameObjs){
        if(obj.includes("SnakeSection")){
            let current = snake.gameObjs[obj];
            if(xy[0] == current.x && xy[1] == current.y){
                return false;
            }
        }
    }
    return true;
    
}

function foodCheck(){
    let head = snake.gameObjs["SnakeHead"];
    let food = snake.gameObjs["Food"];

    if(head.x == food.x && head.y == food.y){
        snake.gameObjs["GameState"].score += 1;
        let snek = snake.newGameObject("SnakeSection");
        snek.addImage("/portfolio/assets/img/snek.png");
        snek.nextSegment = undefined;
        snek.hascollider = true;
        snek.colliderwidth = 50;
        snek.colliderheight = 50;
        
        let last = snake.gameObjs["SnakeSection2"];

        while(last.nextSegment !== undefined){
            last = last.nextSegment;
        }

        snek.previousSection = last;
        snek.previousSection.nextSegment = snek;
        snek.x = last.x;
        snek.y = last.y;

        let xcell = Math.floor(Math.random()*12);
        let ycell = Math.floor(Math.random()*8);
        let freepos = Array.from(Array(12), () => new Array(8));

        for(let i = 0; i < 12; i++){
            for(let j = 0; j < 8; j++){
                freepos[i][j] = true; 
            }
        }
        
        for(obj in snake.gameObjs){
            freepos[snake.gameObjs[obj].x/50][snake.gameObjs[obj].y/50] = false;
        }
        
        while(freepos[xcell][ycell] == false){
            xcell = Math.floor(Math.random()*12);
            ycell = Math.floor(Math.random()*8);
        }

        food.x = xcell*50;
        food.y = ycell*50;
    }
}

function boundsCheck(x,y){
    if(x < 0 || y < 0){
        return false;
    }

    if(x > 550 || y > 350){
        return false;
    }
    return true;
}

function gameOverMan(){
    snake.clearGameObjects();
    snake.gameObjs["GameState"].state = 1;
    createUI();

}

function prepGame(){
    snake.clearGameObjects();
    snake.gameObjs["GameState"].state = 2;
    snake.gameObjs["GameState"].lastMoveTick = Date.now();
    snake.gameObjs["GameState"].snakeSpeed = 2;
    snake.gameObjs["GameState"].score = 0;

    let snek = snake.newGameObject("SnakeHead");
    snek.addImage("/portfolio/assets/img/snekhead.png");
    snek.hascollider = true;
    snek.colliderwidth = 50;
    snek.colliderheight = 50;
    snek.x = 300;
    snek.y = 200;
    snek.vector = [1,0,0];
    snek.rotation = 90;
    snek.nextSegment = undefined;

    for(let i = 1; i < 3; i++){
        snek = snake.newGameObject("SnakeSection");
        snek.addImage("/portfolio/assets/img/snek.png");
        snek.previousSection = snake.gameObjs[Object.keys(snake.gameObjs)[Object.keys(snake.gameObjs).length-2]];
        snek.previousSection.nextSegment = snek;
        snek.nextSegment = undefined;
        snek.hascollider = true;
        snek.colliderwidth = 50;
        snek.colliderheight = 50;
        snek.vector = [1,0,0];
        snek.x = 300-(50*i);
        snek.y = 200;
        snek.rotation = 0;
    }

    snake.gameObjs["SnakeHead"].nextSegment = snake.gameObjs["SnakeSection"];

    let xcell = Math.floor(Math.random()*12) * 50;
    let ycell = Math.floor(Math.random()*8);

    while(ycell == 5){
        ycell = Math.floor(Math.random()*8);
    }

    ycell = ycell*50;

    let food = snake.newGameObject("Food");
    food.hascollider = true;
    food.x = xcell;
    food.y = ycell;
    food.addImage("/portfolio/assets/img/food.png");

}

function createUI(){
    let snakeCanvas = document.getElementById("snakeCanvas");
    let width = snakeCanvas.width;
    let height = snakeCanvas.height;

    let newgame = snake.newGameObject("NewGame");
    newgame.addImage("/portfolio/assets/img/newgame.png");

    newgame.hascollider = true;
    newgame.x = snakeCanvas.width/2 - 75;
    newgame.y = snakeCanvas.height/2 - 50;
    newgame.colliderwidth = 150;
    newgame.colliderheight = 50;


    let snek = snake.newGameObject("SnakeHead");
    snek.addImage("/portfolio/assets/img/snekhead.png");
    snek.hascollider = true;
    snek.colliderwidth = 50;
    snek.colliderheight = 50;
    snek.x = 0;
    snek.y = 0;
    snek.rotation = 270;

    for(let i = 0; i < 13; i++){
        snek = snake.newGameObject("SnakeSection");
        snek.addImage("/portfolio/assets/img/snek.png");
        snek.x = 50+(50*i);
        snek.y = 0;
        snek.rotation = 180;
    }


}
