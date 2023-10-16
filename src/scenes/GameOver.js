class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }
    preload(){}
    create(){
        
        this.add.rectangle(0,0,game.config.width,game.config.height);
        titleConfig.fontSize = '64px';
        this.add.text(game.config.width/2, game.config.height/6, 'Game Over', titleConfig).setOrigin(0.5);
        titleConfig.fontSize = '24px';
        this.add.text(game.config.width/2, (game.config.height* 9) / 10, 'press (space) to return to menu', titleConfig).setOrigin(.5,.5);
        this.walkerIMAGE = this.add.image(game.config.width/2, game.config.height/2, 'walker', 'starWalk3').setScale(3);
        titleConfig.fontSize = '64px';
        this.add.text(game.config.width/2, game.config.height *4 /5, `Walker colected ${score} stars`, titleConfig).setOrigin(0.5,0.5);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if(keySpace.isDown){
            this.scene.start('menuScene');
        }
    }
}
 