class GameUI extends Phaser.Scene {
    // code developed from https://youtu.be/HSP7xwacX7c
    constructor()
    {
        super("gameUIScene");
    }
    preload(){
    }
    create(){
        let scoreConfig = {
            fontFamily: 'MS Gothic',
            fontSize: '24px',
            color: '#5fcde4',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }    
        this.score = this.add.text(0,0,' 0 ', scoreConfig);
        
        
    }
    update(){
        this.score.text = ` ${score} `;
    }
}