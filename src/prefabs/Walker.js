class Walker extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.frameName = texture;
        scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        scene.physics.add.existing(this);
        this.body.onOverlap = true;
        this.body.isSquare = true;
        this.body.drag = 0;
        this.alpha = 1;
        this.anims.play('walkLOOP');
        this.scale = 1;
        this.x = 100 + this.width/2;
        this.y = scene.playSpaceY - 100 - this.height/2;
        this.setCollideWorldBounds(true);


    }

    update() {
    }
}