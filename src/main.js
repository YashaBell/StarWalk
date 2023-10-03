let config = {
    type: Phaser.CANVAS,
    width: 1080,
    height: 720,
    fps:{target: 30,},
    scene: [ Menu , Play ]

}
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, mouseLEFT;
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