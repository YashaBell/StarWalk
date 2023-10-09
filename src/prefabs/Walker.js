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
        this.body.isSquare = true;
        this.body.drag = 0;
        this.alpha = 1;
        this.anims.play('walkLOOP');
        this.scale = 1;
        this.x = 100 + this.width/2;
        this.y = scene.playSpaceY - 100 - this.height/2;
        this.setCollideWorldBounds(true);
        this.goal = this.scene.endStar;
        this.MaxY = 10
        this.maxX = 10
    }

    update(goal, hazards) {
        this.distX = goal.body.x - this.x;
        this.distY = goal.body.y - this.y;
        this.dist = Phaser.Math.Between(this.body.x,this.body.y,goal.body.x,goal.body.y)
        this.accelTemp = 10000/Math.pow(this.dist, 2);
        this.body.setVelocity(this.body.velocity.x + this.accelTemp * (this.distX/this.dist), this.body.velocity.y + this.accelTemp * (this.distY/this.dist));
        for(let i = 0; i < hazards.countActive(); i++){
            this.distX = hazards.body.x - this.x;
            this.distY = hazards[i].body.y - this.y;
            this.dist = Phaser.Math.Between(this.body.x,this.body.y,hazards[i].body.x,hazards[i].body.y);
            this.accelTemp = 1000/Math.pow(this.dist, 2);
            this.body.setVelocity(this.body.velocity.x + this.accelTemp * (this.distX/this.dist), this.body.velocity.y + this.accelTemp * (this.distY/this.dist));
        }
    }
}