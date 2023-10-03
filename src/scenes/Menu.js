class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){

    }

    create(){
        //menu text configs
        let titleConfig = {
            fontFamily: 'hyper',
            fontStyle: 'bold',
            fontSize: '128px',
            backgroundColor: '#000000',
            color: '#0E0920',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }
        

        this.add.text(game.config.width/2, game.config.height/2, 'Star Walk', titleConfig).setOrigin(0.5);

        this.input.mouse.disableContextMenu();
    }

    update() {
        

    }
}
