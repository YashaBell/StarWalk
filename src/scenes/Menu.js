class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){

    }

    create(){
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
 
        //menu text configs
        let titleConfig = {
            fontFamily: 'hyper',
            fontStyle: 'bold',
            fontSize: '64px',
            color: '#5409d4',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }
        
        this.cameras.main.zoom = 1;
        this.cameras.main.midPoint.x = game.config.width/2;
        this.cameras.main.midPoint.y = game.config.height/2;
        this.add.tileSprite(0, 0, game.config.width *2, game.config.height*2,'bkg')
        titleConfig.fontSize = '128px'
        this.add.text(game.config.width/2, game.config.height/4, 'Star Walk', titleConfig).setOrigin(0.5);
        titleConfig.fontSize = '48px';
        this.add.text(game.config.width/2, game.config.height*3/4, 'Press (space) to start', titleConfig).setOrigin(0.5,0.5)
        this.input.mouse.disableContextMenu();
    }

    update() {
        if(keySpace.isDown){
            this.scene.start("playScene");
        }

    }
}
