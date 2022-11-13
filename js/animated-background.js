let engine = new GameEngine(animate, document.getElementById("backgroundAnimation"));


(function(){
    engine.canvas.width = window.innerWidth;
    engine.canvas.height = window.innerHeight;
    engine.configuration.tickRate = 24;

    generateBoxes();

    engine.start();
})();

function animate(){
    engine.canvas.width = window.innerWidth;
    engine.canvas.height = window.innerHeight;
    for (let obj in engine.gameObjs){
        let movable = engine.gameObjs[obj];
        movable.x += movable.ratex;
        movable.y += movable.ratey;

        if (movable.x > (engine.canvas.width - movable.img.width)){
            movable.ratex *= -1;
        }
        if (movable.x < 0){
            movable.ratex = Math.abs(movable.ratex);
        }
        if (movable.y > (engine.canvas.height - movable.img.height)){
            movable.ratey *= -1;
        }
        if (movable.y < 0){
            movable.ratey = Math.abs(movable.ratey);
        }
    }
}

function generateBoxes(){
    for (let i = 0; i < 20; i++){
        let ratex = Math.random() * 6 - 3;
        let ratey = Math.random() * 6 - 3;
        let x = Math.floor(1 + (Math.random() * window.innerWidth - 100));
        let y = Math.floor(1 + (Math.random() * window.innerHeight - 100));
        let tempObj = engine.newGameObject();
        tempObj.addImage("assets/img/floating.png");
        tempObj.x = x;
        tempObj.y = y;
        tempObj.ratex = ratex;
        tempObj.ratey = ratey;
    }
}