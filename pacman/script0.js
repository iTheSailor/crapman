var character ={
    id : document.getElementById('pacman'),
    location : characterLocation = []
}
var coins ={
    id: document.getElementsByClassName('coin'),
    location: coinsLocation = [],
}
var walls ={
    id: document.getElementsByClassName('wall'),
    location: wallsLocation = [],
}
var fruits ={
    id: document.getElementsByClassName('fruit'),
    location: fruitsLocation = [],
}
// var leftValue =;
// var topValue=;
var keys=['KeyS', 'KeyA', 'KeyW', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Space', 'Escape']
var ghosts = document.getElementsByClassName("ghost");
var world = []
var worldKey={
    0 : 'wall',
    1 : 'wall',
    2 : 'wall',
    3 : 'wall',
    4 : 'coin',
    5 : 'coin',
    6 : 'coin',
    7 : 'coin',
    8 : 'coin',
    9 : 'fruit',
    10 : 'wall',
    11 : 'wall',
    12 : 'wall',
    13 : 'wall',
    14 : 'coin',
    15 : 'coin',
    16 : 'coin',
    17 : 'coin',
    18 : 'coin',
    19 : 'coin',
    // 3 : 'space'
}
// var location = []

document.onkeydown = function movement(e) {
    var character=character[id], characterLocation=character[location];
    y=0
    x=0
    if((e.code =='KeyS'|| e.code == 'ArrowDown')){
        y++
        characterLocation[2] += y*40
        character.style.transform='rotate(90deg)'
        // console.log(y)
    }
    else if((e.code =='KeyW'|| e.code =='ArrowUp')){
        y--
        characterLocation[2] += y*40
        character.style.transform='rotate(270deg)'
        // console.log(y)
    }
    else if((e.code =='KeyA'|| e.code =='ArrowLeft')){
        x--
        characterLocation[0] +=x*40
        character.style.transform='rotate(180deg)'
        // console.log(x)
    }
    else if((e.code =='KeyD'|| e.code =='ArrowRight')){
        x++
        characterLocation[0] +=x*40
        character.style.transform='rotate(0deg)'
        // console.log(x)
    }
    character.style.top=characterLocation[2]+characterLocation[3] +'px';
    character.style.left=characterLocation[0]+characterLocation[1]+'px';
    // drawplayer()
}

function getOffset(el) {
    const rect = el[id].getBoundingClientRect();
    el[location]=[rect.left, window.scrollX, rect.top, window.scrollY];
    return el[location];
}
function worldPopulate(){ //creates world array
    for(var i = 0; i<16;i++){
        let row = Array.from({length:16}, () => Math.floor(Math.random()*20))
        world.push(row)
    }
    worldGen()
    getOffset(character.id)
    // getOffset(coins)
    // getOffset(fruits)
    // getOffset(walls)
    // getOffset(ghosts)
}
function worldGen(){ //uses the world array to generate the world
    output = ""
    for(var row=0; row<world.length;row++){
        output += "<div class = 'row'>"
        for (var z = 0; z<world[row].length;z++){
            output+= "<div class=" + worldKey[world[row][z]] + "></div>"
        }
        output+="</div>"
    }
    document.getElementById('world').innerHTML=output
}
// function drawplayer(){
    //      character.style.top = getOffset    character).top
    //      character.style.left = getOffset   character).left
    // }
    for(var i = 0; i < ghosts.length; i++){// GHOSTCOLORS
        let x = document.getElementById(ghosts[i].id)
        // console.log(x.id)
        x.style.backgroundImage=`url(assets/ghost${x.id}.gif)`
    }
    