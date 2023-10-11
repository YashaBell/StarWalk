class Walker extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.frameName = texture;
        this.scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.scene.physics.add.existing(this);
        this.scene = scene;
        this.body.onOverlap = true;
        this.body.onCollide = true;
        this.body.isSquare = true;
        this.body.drag = 0;
        this.alpha = 1;
        this.anims.play('walkLOOP');
        this.scale = 1;
        this.x = 100 + this.width/2;
        this.y = scene.playSpaceY/2; //- 100 - this.height/2;
        this.setCollideWorldBounds(true);
        this.setVelocity(250,0);
        // this.addToVel;
        // this.currentPress = keyW;
        // this.VEL = 500;
    }

    update(goal, hazards) {

        // if (Phaser.Input.Keyboard.JustDown(keyW)) {
        //     this.body.setVelocity(0, -this.VEL);
        //     this.currentPress = keyW;
        // }
        // if (Phaser.Input.Keyboard.JustDown(keyS)) {
        //     this.body.setVelocity(0, this.VEL);
        //     this.currentPress = keyS;

        // }
        // if (Phaser.Input.Keyboard.JustDown(keyA)) {
        //     this.body.setVelocity(-this.VEL, 0);
        //     this.currentPress = keyA;

        // }
        // if (Phaser.Input.Keyboard.JustDown(keyD)) {
        //     this.body.setVelocity(this.VEL, 0);
        //     this.currentPress = keyD;

        // }
        // if (this.currentPress.isUp) {
        //     this.anims.stopAfterRepeat(0);
        //     this.body.setVelocity(0, 0);
        // }
        
        // this.distX = goal.x - this.x;
        // this.distY = goal.y - this.y;
        // this.dist = Phaser.Math.Between(this.x, this.y, goal.x, goal.y)
        // this.accelTemp = .001;
        // this.addToVel= (this.body.velocity.x + this.accelTemp * this.distX, this.body.velocity.y + this.accelTemp * this.distY);

        // for(let i = 0; i < hazards.length; i++){
        //     this.distX = hazards[i][0] - this.x;
        //     this.distY = hazards[i][1] - this.y;
        //     this.dist = Phaser.Math.Between(this.body.x,this.body.y, hazards[i][0], hazards[i][1]);
        //     this.accelTemp = 50/Math.pow(this.dist, 2);
        //     this.addToVel = (this.body.velocity.x + this.accelTemp * this.distX, this.body.velocity.y + this.accelTemp * this.distY);
        // }
    }
}