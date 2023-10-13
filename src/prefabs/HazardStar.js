class HazardStar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.body.setImmovable(true);
        this.body.onOverlap = true;
        this.body.isCircle = true;
        this.body.drag = 0;
        this.scale = 2;
        this.alpha = 1;

        const hazardShake = this.scene.tweens.chain({
             targets: this,
            tweens: [
                {
                    angle: 45,
                    ease: 'Elastic.easeInOut',
                    duration: 1500
                },
                {
                    angle: 0,
                    ease: 'Elastic.easeInOut',
                    duration: 1500
                }
            ],
            repeat: -1
        });
        
    }

    update() {
        

    }
}
// while(Phaser.Math.Distance.Between(scene.walker.x, scene.walker.y, this.x, this.y) < 200 || 
//         Phaser.Math.Distance.Between(scene.endStar.x, scene.endStar.y, this.x, this.y) < 200){
//             this.setRandomPosition(
//             scene.spawnBorder + this.width/2,
//             scene.spawnBorder + this.height/2,
//             this.scene.playSpaceX - 2*(scene.spawnBorder + this.width/2), 
//             this.scene.playSpaceY - 2*(scene.spawnBorder + this.height/2));
//         }
