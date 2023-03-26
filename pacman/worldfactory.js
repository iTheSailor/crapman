var character = document.getElementById('pacman'),coins = document.getElementsByClassName('coin'),walls = document.getElementsByClassName('wall'),fruits = document.getElementsByClassName('fruit'),ghosts = document.getElementsByClassName('ghost'), keys=['KeyS', 'KeyA', 'KeyW', 'KeyD', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Space', 'Escape'], overworld = document.getElementById('world'),ghostteam={yellow : [9,8],red : [6,8],blue: [7,8],green: [8,8]}
characterx= 0, charactery= 0
score=0
life=3
const world = []
var worldKey={
    0 : 'class = wall',
    1 : 'class = wall',
    2 : 'class = coin',
    3 : 'class = coin',
    4 : 'class = coin',
    5 : 'class = coin',
    11: 'class = empty',
    20 : 'class = ghost id = yellow name = yellow',
    21 : 'class = ghost id = red name = red',
    22 : 'class = ghost id = blue name = blue',
    23 : 'class = ghost id = green name = green',
    24 : 'class = space',
    99 : 'id = pacman',
    88 : 'class = fruit',
}
function worldCreate(){
    worldPopulate()
    setrules()
    worldGen()
    ghostcolor()
    setInterval(worldUpdate,1000)
    // getOffset(character)
    
}
function worldPopulate(){ //creates world array
    for(var i = 0; i<16;i++){
        world.push({ i : Array.from({length:16}, () => Math.floor(Math.random()*6))})    
    }
}
function setrules(){
    world[6].i[4]=5,world[6].i[5]=5, world[6].i[6]=5,world[6].i[7]=5,world[6].i[8]=5,world[6].i[9]=5,world[6].i[10]=5,world[6].i[11]=5
    world[7].i[4]=5,world[7].i[5]=1, world[7].i[6]=1,world[7].i[7]=24,world[7].i[8]=24,world[7].i[9]=1,world[7].i[10]=1,world[7].i[11]=5
    world[8].i[4]=5,world[8].i[5]=5, world[8].i[6]=21,world[8].i[7]=22,world[8].i[8]=23,world[8].i[9]=20,world[8].i[10]=5,world[8].i[11]=3
    world[9].i[4]=5,world[9].i[5]=1, world[9].i[6]=1,world[9].i[7]=24,world[9].i[8]=24,world[9].i[9]=1,world[9].i[10]=1,world[9].i[11]=5
    world[10].i[4]=5,world[10].i[5]=5, world[10].i[6]=5,world[10].i[7]=5,world[10].i[8]=5,world[10].i[9]=3,world[10].i[10]=5,world[10].i[11]=5
    world[3].i[3]=88
    world[3].i[12]=88
    world[12].i[3]=88
    world[12].i[12]=88
    for(j = 0; j <16; j++){
        world[j].i[0] = 2
        world[15].i[j] = 2
        world[j].i[15]=2
        world[0].i[j]=2
    }
    world[0].i[0]=99
}
function worldGen(){ //uses the world array to generate the world
    output = ""
    for(var o=0; o<world.length;o++){
        output += "<div class = 'row'>"
        for (var u = 0; u<world[o].i.length;u++){
            output+= "<div " + worldKey[world[o].i[u]] + "></div>"
            }output+="</div>"
        }
    document.getElementById('world').innerHTML=output
}
function worldUpdate(){
    yellowlife()
    redlife()
    bluelife()
    greenlife()
}
function ghostcolor(){
    for(var i = 0; i < ghosts.length; i++){// GHOSTCOLORS
        let x = document.getElementById(ghosts[i].id)
        x.style.backgroundImage=`url(assets/ghost${x.id}.gif)`
    }
}
function ghostrecolor(){
    for(var i = 0; i < ghosts.length; i++){// GHOSTCOLORS
        let x = document.getElementById(ghosts[i].id)
        console.log(x.attributes['name'].value,x.id)
        x.id = x.attributes['name'].value
        x.style.backgroundImage=`url(assets/ghost${x.id}.gif)`
    }
}
function fruitpower(){
    for(var i = 0; i < ghosts.length; i++){// GHOSTCOLORS
        let x = document.getElementById(ghosts[i].id)
        x.id='scared'
        x.style.backgroundImage=`url(assets/ghost${x.id}.gif)`
    }
}
document.onkeydown = function movement(e) {
    character = document.getElementById('pacman')
    if((e.code =='KeyS'|| e.code == 'ArrowDown') && charactery<15 && (world[charactery+1].i[characterx]> 1)){
        charactery+=1
        character.style.top=charactery*40+'px'
        character.style.transform='rotate(90deg)'
        }
    if((e.code =='KeyW'|| e.code =='ArrowUp') &&charactery>0 && (world[charactery-1].i[characterx]>1)){
        charactery-=1
        character.style.top = charactery*40+'px'
        character.style.transform='rotate(-90deg)'
    }
    if((e.code =='KeyA'|| e.code =='ArrowLeft')&&characterx>0 && (world[charactery].i[characterx-1]>1)){
        characterx-=1
        character.style.left = characterx*40+'px'
        character.style.transform='rotate(180deg)'
        }
    if((e.code =='KeyD'|| e.code =='ArrowRight')&&characterx<15 && (world[charactery].i[characterx+1]>1)){
        console.log(characterx)
        characterx+=1
        character.style.left = characterx*40+'px'
        character.style.transform='rotate(0deg)'
        }
    console.log(characterx,charactery)
    interaction(characterx,charactery)
    return characterx,charactery
}
function interaction(x,y){
    if(overworld.childNodes[y].childNodes[x].className == 'coin'){
        score +=100
        console.log('+100')
        console.log(x,y)
        overworld.childNodes[y].childNodes[x].className = 'empty'
        console.log(score)}
    if(overworld.childNodes[y].childNodes[x].className == 'fruit'){
        score +=1000
        console.log('+1000')
        console.log(score)
        overworld.childNodes[y].childNodes[x].className = 'empty'
        fruitpower()
        setTimeout(() => {
            ghostrecolor()
        },5000);}
    if((overworld.childNodes[y].childNodes[x].className =='ghost')&&(overworld.childNodes[y].childNodes[x].id =='scared')){
        score +=2000
        console.log('+2000')
        console.log(score)
    }
    if((overworld.childNodes[y].childNodes[x].className =='ghost')&&(overworld.childNodes[y].childNodes[x].id !='scared')){
        life -= 1
        console.log('-1 life')
    }
        return score,life
}

        
function ghostsoul(){
    const getRandomNumber = (min, max) =>{
        return Math.floor(Math.random() *(max- min +1)) + min
    }
    const rollDice = getRandomNumber(1,4);
    return rollDice
}
yghostx = 9
ygx = yghostx -9
yghosty = 8
ygy = yghosty -8
function yellowlife(){
    el = ghostsoul()
    console.log(el)
    zoul = document.getElementById('yellow')
    if((el == 1) && yghosty<8){
        if (world[yghosty+1].i[yghostx]> 1){
        yghosty+=1
        ygy+=1
        zoul.style.top=ygy*40+'px'
        }else{
            yellowlife()}}
    if((el == 2) &&yghosty>-9){
        if(world[yghosty-1].i[yghostx]>1){
        yghosty-=1
        ygy-=1
        zoul.style.top = ygy*40+'px'
        }else{
            yellowlife()}}
    if((el == 3) &&yghostx >-10){
        if (world[yghosty].i[yghostx-1]>1){
        yghostx-=1
        ygx-=1
        zoul.style.left = ygx*40+'px'
        zoul.style.transform= 'scaleX(-1)'
        }else{
            yellowlife()}}
    if((el == 4 )&&yghostx<7){
        if(world[yghosty].i[yghostx+1]>1){
        yghostx+=1
        ygx+=1
        zoul.style.left = ygx*40+'px'
        zoul.style.transform='scaleX(1)'
        }else{
            yellowlife()}}
    console.log(ygx,ygy,yghostx,yghosty)
    return(ygx,ygy,yghostx,yghosty)
}
gghostx = ghostteam.green[0]
ggx = ghostteam.green[0]-8
gghosty = ghostteam.green[1]
ggy = ghostteam.green[1]-8
function greenlife(){
    el = ghostsoul()
    console.log(el)
    ghost = document.getElementById('green')
    if((el == 1) && gghosty<8){
        if (world[gghosty+1].i[gghostx]> 1){
        gghosty+=1
        ggy+=1
        ghost.style.top=ggy*40+'px'
        }else{
            greenlife()}}
    if((el == 2) &&gghosty>-9){
        if(world[gghosty-1].i[gghostx]>1){
        gghosty-=1
        ggy-=1
        ghost.style.top = ggy*40+'px'
        }else{
            greenlife()}}
    if((el == 3) &&gghostx >-10){
        if (world[gghosty].i[gghostx-1]>1){
        gghostx-=1
        ggx-=1
        ghost.style.left = ggx*40+'px'
        ghost.style.transform= 'scaleX(-1)'
        }else{
            greenlife()}}
    if((el == 4 )&&gghostx<7){
        if(world[gghosty].i[gghostx+1]>1){
        gghostx+=1
        ggx+=1
        ghost.style.left = ggx*40+'px'
        ghost.style.transform='scaleX(1)'
        }else{
            greenlife()}}
    console.log(ggx,ggy,gghostx,gghosty)
    return(ggx,ggy,gghostx,gghosty)
}
bghostx = ghostteam.blue[0]
bgx = bghostx -7
bghosty = ghostteam.blue[1]
bgy = bghosty-8
function bluelife(){
    el = ghostsoul()
    console.log(el)
    ghost = document.getElementById('blue')
    if((el == 1) && bghosty<8){
        if (world[bghosty+1].i[bghostx]> 1){
        bghosty+=1
        bgy+=1
        ghost.style.top=bgy*40+'px'
        }else{
            bluelife()}}
    if((el == 2) &&bghosty>-9){
        if(world[bghosty-1].i[bghostx]>1){
        bghosty-=1
        bgy-=1
        ghost.style.top = bgy*40+'px'
        }else{
            bluelife()}}
    if((el == 3) &&bghostx >-10){
        if (world[bghosty].i[bghostx-1]>1){
        bghostx-=1
        bgx-=1
        ghost.style.left = bgx*40+'px'
        ghost.style.transform= 'scaleX(-1)'
        }else{
            bluelife()}}
    if((el == 4 )&&bghostx<7){
        if(world[bghosty].i[bghostx+1]>1){
        bghostx+=1
        bgx+=1
        ghost.style.left = bgx*40+'px'
        ghost.style.transform='scaleX(1)'
        }else{
            bluelife()}}
    console.log(bgx,bgy,bghostx,bghosty)
    return(bgx,bgy,bghostx,bghosty)
}
rghostx = ghostteam.red[0]
rgx = rghostx -6
rghosty = ghostteam.red[1]
rgy = rghosty-8
function redlife(){
    el = ghostsoul()
    console.log(el)
    ghost = document.getElementById('red')
    if((el == 1) && rghosty<8){
        if (world[rghosty+1].i[rghostx]> 1){
        rghosty+=1
        rgy+=1
        ghost.style.top=rgy*40+'px'
        }else{
            redlife()}}
    if((el == 2) &&rghosty>-9){
        if(world[rghosty-1].i[rghostx]>1){
        rghosty-=1
        rgy-=1
        ghost.style.top = rgy*40+'px'
        }else{
            redlife()}}
    if((el == 3) &&rghostx >-10){
        if (world[rghosty].i[rghostx-1]>1){
        rghostx-=1
        rgx-=1
        ghost.style.left = rgx*40+'px'
        ghost.style.transform= 'scaleX(-1)'
        }else{
            redlife()}}
    if((el == 4 )&&rghostx<7){
        if(world[rghosty].i[rghostx+1]>1){
        rghostx+=1
        rgx+=1
        ghost.style.left = rgx*40+'px'
        ghost.style.transform='scaleX(1)'
        }else{
            redlife()}}
    console.log(rgx,rgy,rghostx,rghosty)
    return(rgx,rgy,rghostx,rghosty)
}