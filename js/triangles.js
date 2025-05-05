class triangleGenerator {
    constructor(canvas){
        this.canvas = canvas;
    }

    draw(dots, dotPairs, factor){

        let ctx = this.canvas.getContext("2d");
        //Just to be really really sure
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        //600x400
        //const randomMoves = [[0, this.canvas.height], [this.canvas.width, this.canvas.height], [this.canvas.width/2, 0]]
        //const randomMoves = [[100,100], [300,1], [500,100], [175,350],[425,350]]
        const randomMoves = dotPairs;

        let dot = [Math.floor(Math.random()*this.canvas.width), Math.floor(Math.random()*this.canvas.height)];
        let color = document.getElementById("colorPicker").value;
        let rainbow = false;
        if (color == "#ffffff"){
            rainbow = true;
        }
        for(let i = 0; i < dots; i++){
            if (rainbow){
                color = "#"+Math.floor(Math.random()*16777215).toString(16);
            }
            // Reduce outliers
            if(i > 10){
                ctx.fillStyle = color;
                ctx.fillRect(dot[0], dot[1], 1, 1);
            }
            let newDirection = randomMoves[Math.floor(Math.random()*dotPairs.length)];
            
            dot = [dot[0]+Math.floor((newDirection[0] - dot[0])/factor), dot[1]+Math.floor((newDirection[1] - dot[1])/factor)];
            //console.log(dot);
        }
    }
    clear(){
        let ctx = this.canvas.getContext("2d");
        
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    pascal(pascals){
        let ctx = this.canvas.getContext("2d");
        let color = document.getElementById("colorPicker").value;
        ctx.fillStyle = color;
        let divisor = document.getElementById("factor").value;
        let xoffset = 300;

        for(let i = 0; i < pascals.length; i++){
            for(let j = 0; j < pascals[i].length; j++){
                if(pascals[i][j] % BigInt(divisor) == 0){
                    ctx.fillRect(Math.round(xoffset-(pascals[i].length/2)+j), i, 1, 1);
                }
            }
        }


    }
}

window.addEventListener("load", function(){

    let generateButton = document.getElementById("generate");

    generateButton.addEventListener("click", () => {
        let triangles = new triangleGenerator(document.getElementById("triangleCanvas"));
        let dotPairs = getPointsFromInputs(); // Use the new function here
        let factor = 2; // Default factor for chaos game

        triangles.draw(
            document.getElementById("dotsRange").value,
            dotPairs,
            factor // Pass the factor for chaos game
        );
    });

    let clearCanvas = document.getElementById("clearCanvas");

    clearCanvas.addEventListener("click", () => {
        let triangles = new triangleGenerator(document.getElementById("triangleCanvas"));

        triangles.clear();
    });

    let addPoint = document.getElementById("addPoint");

    addPoint.addEventListener("click", () => {
        let pointList = document.getElementById("listOfPoints");
        pointList.innerHTML = pointList.innerHTML + '<input type="text" value="0" class="point-input"><input type="text" value="0" class="point-input"><br>';
    });

    let pascalGenerate = document.getElementById("pascal");

    pascalGenerate.addEventListener("click", () => {
        let triangles = new triangleGenerator(document.getElementById("triangleCanvas"));
        triangles.pascal(pascalsTriangle);
    });


    let pascalsTriangle = generatePascalsTriangle();
});

function generatePascalsTriangle(){
    // Size of numbers gets much larger than int can hold.
    let rows = [BigInt(1)];

    while (rows.length < 400){
        let newRow = [BigInt(1)]
        for (let i = 0; i < rows[rows.length -1].length; i++){
            if (i == rows[rows.length-1].length-1){
                newRow.push(BigInt(1));
            }
            else{
                newRow.push(BigInt(rows[rows.length-1][i] + rows[rows.length-1][i+1]))
            }
        }
        rows.push(newRow);
    }
    return rows;
}