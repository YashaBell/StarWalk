class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    // loading bar code adapted from paddle parkour loading bar
    preload() {
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5);
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });
        // image files
        this.load.path = "./assets/";
        // the walking animation
        this.load.aseprite('walker', 'starWalk.png', 'starWalk.json');
        this.load.image('endStar', 'endStar.png');
        this.load.image('hazard', 'hazardStar.png');
        this.load.image('bkg', 'void.png');
        this.load.image('bkg2', 'voidOverlay.png');
        this.load.image('connect', 'connectStars.png');
        this.load.image('reticle', 'reticle.png');

        // ||| REFERENCES FROM PREIVIOUS WORK |||
        // this.load.image('bgd', 'bgd.png');
        // this.load.spritesheet('rotatingOrbs', 'rotating_orbs.png', { frameWidth: 32, frameHeight: 32 });
        // this.load.path = "./assets/audio/"
        // this.load.audio('warning', 'warning.wav');


    }

    create() {
        //anims factory
        this.anims.create({
            key: 'walkLOOP',
            defaultTextureKey: 'walker',
            frames: this.anims.generateFrameNames('walker', {
                prefix: 'starWalk',
                suffix: '',
                start: 1,
                end: 2,
                zeroPad: 0,
            }),
            duration: 800,
            repeat: -1
        });

        this.scene.start('menuScene');
    }
}