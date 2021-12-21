class GameObject {

    constructor(id){
        this.x = 0;
        this.y = 0;
        this.id = id;
        this.img = undefined;
        this.vector = [0,0,0]; // x, y, magnitude
        this.drawdepth = 0;
        this.lastphysicsaction = 0;
        this.hascollider = false;
        this.colliderwidth = 0;
        this.colliderheight = 0;
        this.colliderx = 0;
        this.collidery = 0;
        this.rotation = 0;
        this.render = true;
        this.persist = false;
    }

    // Take a string, make it an img.  Ez.
    addImage(img){
        let hold = new Image();
        hold.src = img;
        this.img = hold;
    }

}

class GameEngine {

    constructor(gameloop, canvas){
        this.configuration = {
            tickRate: 1,
            drawRate: 60,
            debug: false
        };
        this.gameLoop = gameloop;
        this.gameObjs = {};

        this.lasttick = Date.now();
        this.deltatime = 0;
        this.lastdraw = Date.now();

        this.canvas = canvas;

        this.inputs = [];
        this.keybinds = {};
        this.clickedObject = false;
        document.addEventListener("keydown", this.handleKeyPress.bind(this));
        this.canvas.addEventListener("click", this.clickHandler.bind(this));
    }

    // Quick and dirty wrapper for console.log
    debuglog(msg){
        if(this.configuration.debug){
            console.log(msg);
        }
    }

    // Run the engine.  Should leave this manual so we can config before start
    start(tick = this.configuration.tickRate){
        console.log("Engine spin-up");
        tick = 1000/tick;
        this.lasttick = Date.now();
        // Must use bind or we'll have the wrong context
        this.interval = setInterval(this.gametick.bind(this), tick);
    }

    // Mostly useful for debugging.
    stop(){
        clearInterval(this.interval);
    }

    // This is our main game loop, for the engine side of things.
    gametick(){
        this.deltatime = Date.now() - this.lasttick;
        this.gameLoop();

        //draw the game.
        if(Date.now() - this.lastdraw >= 1000/this.configuration.drawRate){
            this.drawGame();
        }

        // We only want to store and track up to 10 inputs.
        while(this.inputs.length > 10){
            this.inputs.pop(0);
        }

        // Completion time of tick
        this.lasttick = Date.now();
    }

    drawGame(){

        // Sort our game objects by render depth and filter unrenderables
        let sortable = [];
        for (let x in this.gameObjs){
            // We don't want to mess with unrenderables
            if(this.gameObjs[x].render && this.gameObjs[x].img !== undefined){
                
                // We need to make sure we actually have an image in there.
                // We cant be sure that addImage() was used.
                if(typeof this.gameObjs[x].img == "string"){
                    let hold = new Image();
                    hold.src = this.gameObjs[x].img;
                    this.gameObjs[x].img = hold;
                }
                sortable.push(this.gameObjs[x]);

            }
        }

        sortable.sort((a,b) => (a.drawdepth > b.drawdepth) ? 1 : -1);

        let ctx = this.canvas.getContext("2d");
        //Just to be really really sure
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Clear the canvas, otherwise we're just rendering on top of last frame.
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        
        for(let i = 0; i < sortable.length; i++){

            // Save context because we're about to mess about
            ctx.save();

            //deal with rotations
            // Move context to center of image to be rotated.
            ctx.translate(sortable[i].x + sortable[i].img.width/2,sortable[i].y + sortable[i].img.height/2);
            // Rotate
            ctx.rotate(sortable[i].rotation*Math.PI/180);
            // Move context back to the corner of the image to avoid more problems with rendering.
            ctx.translate(-sortable[i].img.width/2, -sortable[i].img.height/2);

            //draw image
            ctx.drawImage(sortable[i].img, 0, 0);

            // Throw away translations/rotations.
            ctx.restore();

        }
        
        this.lastdraw = Date.now();
    }

    get gameObjectIDs(){
        return Object.keys(this.gameObjs);
    }

    // Create new game objects.  Dirty, but works.
    newGameObject(id = "newObject"){
        let digit = 2;
        let flag = false;
        if(this.gameObjs[id] !== undefined){
            flag = true;
            while(this.gameObjs[id+digit] !== undefined ){
                digit++;
            }
        }

        if(flag){
            id = id+digit;
        }

        this.gameObjs[id] = new GameObject(id);
        return this.gameObjs[id];
    }

    clearGameObjects(){
        for (let x in this.gameObjs){
            if (this.gameObjs[x].persist == false){
                delete this.gameObjs[x];
            }
        }
    }

    handleKeyPress(kp){
        let keycode = String.fromCharCode(kp.keyCode);

        // Arrow keys need translation, most other keypresses do not.
        switch (kp.keyCode){
            case 37:
                keycode = "ARROW-LEFT";
                break;

            case 38:
                keycode = "ARROW-UP";
                break;
            
            case 39:
                keycode = "ARROW-RIGHT";
                break;

            case 40:
                keycode = "ARROW-DOWN";
                break;
        }


        if(keycode in this.keybinds){
            this.inputs.push(keycode);
        }

    }

    addKeybind(key){
        this.keybinds[key] = true;
    }

    getInputs(){
        let hold = this.inputs;
        this.inputs = [];
        return hold;
    }

    getLastInput(){
        if(this.inputs.length > 0){
            return this.inputs.pop();
        }
        return false;
    }
    
    clickHandler(event){
        
        for(let x in this.gameObjs){
            if(this.gameObjs[x].hascollider){

                // Correct for the weirdness of click coordinates
                let rect = this.canvas.getBoundingClientRect();
                let clickx = event.x - rect.left;
                let clicky =  event.y - rect.top;

                if((this.gameObjs[x].x < clickx && clickx < this.gameObjs[x].x + this.gameObjs[x].colliderwidth) &&
                   (this.gameObjs[x].y < clicky && clicky < this.gameObjs[x].y + this.gameObjs[x].colliderheight)){
                       if(this.clickedObject){
                           if(this.gameObjs[x].drawdepth > this.gameObjs[this.clickedObject].drawdepth){
                               this.clickedObject = this.gameObjs[x].id;
                           }
                       }else{
                            this.clickedObject = this.gameObjs[x].id;
                        }
                       this.inputs.push("ClickCollusion");
                   }
            }
        }
    }

    getClickedObject(){
        if (this.clickedObject){
            let hold = this.gameObjs[this.clickedObject];
            this.clickedObject = false;
            return hold;
        }
        return false;
    }
}