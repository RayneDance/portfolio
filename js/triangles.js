class triangleGenerator {
    constructor(canvas){
        this.canvas = canvas;
    }

    draw(dots, dotPairs){

        let ctx = this.canvas.getContext("2d");
        //Just to be really really sure
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        //600x400
        //const randomMoves = [[0, this.canvas.height], [this.canvas.width, this.canvas.height], [this.canvas.width/2, 0]]
        //const randomMoves = [[100,100], [300,1], [500,100], [175,350],[425,350]]
        const randomMoves = dotPairs;

        let dot = [Math.floor(Math.random()*this.canvas.width), Math.floor(Math.random()*this.canvas.height)];
        let color = document.getElementById("colorPicker").value;
        for(let i = 0; i < dots; i++){
            // Reduce outliers
            if(i > 10){
                ctx.fillStyle = color;
                ctx.fillRect(dot[0], dot[1], 1, 1);
            }
            let newDirection = randomMoves[Math.floor(Math.random()*dotPairs.length)];
            
            dot = [dot[0]+Math.floor((newDirection[0] - dot[0])/2), dot[1]+Math.floor((newDirection[1] - dot[1])/2)];
            //console.log(dot);
        }
    }
    clear(){
        let ctx = this.canvas.getContext("2d");
        
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

window.addEventListener("load", function(){

    let generateButton = document.getElementById("generate");

    generateButton.addEventListener("click", () => {
        let triangles = new triangleGenerator(document.getElementById("triangleCanvas"));
        let dots = document.getElementsByClassName("point-input");
        let dotPairs = [];

        for (let i = 0; i < dots.length; i+=2){
            dotPairs.push([dots[i].value, dots[i+1].value]);
        }

        console.log(dotPairs);
        triangles.draw(document.getElementById("dotsRange").value, dotPairs);
    });

    let clearCanvas = document.getElementById("clearCanvas");

    clearCanvas.addEventListener("click", () => {
        let triangles = new triangleGenerator(document.getElementById("triangleCanvas"));

        triangles.clear();
    });
});