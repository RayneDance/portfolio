import {GameEngine, GameObject} from "/portfolio/js/gameengine.js";
let engine = new GameEngine(game, document.getElementById("tictactoeCanvas"));

(function(){

    let gameCanvas = document.getElementById("tictactoeCanvas");
    newGameUI();

    engine.start()

})();

function game(){
    return;
}

function newGameUI(){
    let canvas = document.getElementById("tictactoeCanvas");
    let background = engine.newGameObject("background");
    background.addImage("/portfolio/assets/img/tictactoe/Game.png");

    background.hascollider = true;
    background.x = canvas.width / 2;
    background.y = canvas.width / 2;
}