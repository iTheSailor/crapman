var sql = require('./sql');
sql.worldGen();
y=0
x=0
document.onkeydown = function movement(e) {
    character = document.getElementById('pacman')
    if((e.code =='KeyS'|| e.code == 'ArrowDown') && y<15){
        y+=1
        character.style.top=y*40+'px'
        character.style.transform='rotate(90deg)'
        console.log(y)
    }
    else if((e.code =='KeyW'|| e.code =='ArrowUp')&&y>0){
        y-=1
        character.style.top = y*40+'px'
        character.style.transform='rotate(270deg)'
        console.log(y)
    }
    else if((e.code =='KeyA'|| e.code =='ArrowLeft')&&x>0){
        x-=1
        character.style.left = x*40+'px'
        character.style.transform='rotate(180deg)'
        console.log(x)
    }
    else if((e.code =='KeyD'|| e.code =='ArrowRight')&&x<15){
        x+=1
        character.style.left = x*40+'px'
        character.style.transform='rotate(0deg)'
        console.log(x)
    }
    if(world[character.y][character.x] <1 && world[character.y][character.x] > 9){
        world[character.y][character.x] = 11
        worldGen()
    // character.style.left='40px';
    return x,y// drawplayer()
}
}