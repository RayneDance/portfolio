class triangleGenerator {
    constructor(canvas){
        this.canvas = canvas;
    }

    draw(dots){

        let ctx = this.canvas.getContext("2d");
        //Just to be really really sure
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        const randomMoves = [[1, this.canvas.height-1], [this.canvas.width-1, this.canvas.height-1], [this.canvas.width/2, 1]]

        let dot = [Math.floor(Math.random()*this.canvas.width), Math.floor(Math.random()*this.canvas.height)];
        let color = document.getElementById("colorPicker").value;
        for(let i = 0; i < dots; i++){
            // Reduce outliers
            if(i > 10){
                ctx.fillStyle = color;
                ctx.fillRect(dot[0], dot[1], 1, 1);
            }
            let newDirection = randomMoves[Math.floor(Math.random()*3)];
            
            dot = [(dot[0]+newDirection[0])/2, (dot[1]+newDirection[1])/2];
        }
    }
    clear(){
        let ctx = this.canvas.getContext("2d");
        
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}

window.addEventListener("load", function(){

    let generateButton = document.getElementById("generate");

    generateButton.addEventListener("click", () => {
        let triangles = new triangleGenerator(document.getElementById("triangleCanvas"));

        triangles.draw(document.getElementById("dotsRange").value);
    });

    let clearCanvas = document.getElementById("clearCanvas");

    clearCanvas.addEventListener("click", () => {
        let triangles = new triangleGenerator(document.getElementById("triangleCanvas"));

        triangles.clear();
    });
});