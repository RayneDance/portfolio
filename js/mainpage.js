var projectsHTML = ` <div class="col-xl-12">
<div class="card mb-4">
    <div class="card-header">
        Projects I'm proud of.
    </div>
    <div class="card-body">
        <a href='https://github.com/RayneDance/hockey-bot'>Discord NHL bot</a><p><i>Python</i><br>This bot pulled current day game data, as well as supporting querys for scores.</p>
        <a href='https://github.com/RayneDance/tic-tac-toe'>tic-tac-toe</a><p><i>Python/PyGame</i><br>Proud of the effectiveness of my gameobj.py file for a rough entity/component system.</p>
        <a href='https://github.com/RayneDance/Whitespace-Remover'>Whitespace Remover</a><p><i>JavaScript</i><br>Intercepts copy and trims any whitespace off front/back before sending to clipboard. Useful when copying things from a webpage.</p>
    </div>
</div>
</div>
`

var gamesHTML = `
<div class="col-xl-6">
<div class="card mb-4">
    <div class="card-header">
        Games I'm making or made.
    </div>
    <div class="card-body"><ul>
    <li><a href="snake.html">Snake!</a></li>
    <li><a href="https://store.steampowered.com/app/1547960/Freedoms_TicTacToe/">Tic-Tac-Toe</a> Under development.
    </div>
</div>
</div>
<div class="col-xl-6">
<div class="card mb-4">
<div class="card-header">
    <i class="fas fa-chart-bar me-1"></i>
    Bar Chart Example
</div>
<div class="card-body"></div>
</div>
</div>
`

function ProjectsMain(){
    let outer = document.getElementById("mainpageContentLoad");

    outer.innerHTML = projectsHTML;
}

function GamesMain(){
    let outer = document.getElementById("mainpageContentLoad");
    outer.innerHTML = gamesHTML;
}