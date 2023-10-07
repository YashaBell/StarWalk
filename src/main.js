let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    fps:{target: 30,},
    scene: [ Load , Menu , Play ],
    physics: {default: 'arcade', arcade: {

        //DEBUG//

        debug: true

        //DEBUG//
        }},
        type: Phaser.WEBGL,
        pixalArt: true,
    };

let game = new Phaser.Game(config);
let keyW, keyA, keyS, keyD, keyE, keyQ;
let scoreConfig = {
    fontFamily: 'MS Gothic',
    fontSize: '24px',
    color: '#00ff00',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 100
}    
function MouseInTextBox(pointerX, pointerY, textBox){
    let x1 = textBox.x - textBox.width/2;
    let x2 = textBox.x + textBox.width/2;
    let y1 = textBox.y - textBox.height/2;
    let y2 = textBox.y + textBox.height/2;
    if(pointerX >= x1 && pointerX <= x2 && pointerY >= y1 && pointerY <= y2){
        return(true);
    }else {
        return(false);
    }
}
function randomLoc(){
    let x = Math.random()*game.config.width;
    let y = Math.random()*game.config.height;
    return(x,y);
}
