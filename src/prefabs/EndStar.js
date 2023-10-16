class EndStar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.frameName = texture;
        this.scene = scene
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scale = 2 
        this.setPosition(this.scene.playSpaceX - (scene.spawnBorder + this.width/2), scene.playSpaceY/2);
        this.scale = 1.5;

        const endVibe = this.scene.tweens.chain({
            targets: this,
           tweens: [
                {
                    scale: 2,
                    ease: 'Linear',
                    duration: 1000
                },
               {
                   angle: -15,
                   ease: 'Linear',
                   duration: 1000
                },
               {
                   angle: 15,
                   ease: 'Linear',
                   duration: 1000
                },
                {
                    angle: 0,
                    ease: 'Linear',
                    duration: 1000
                 },
               {
                    scale: 1.5,
                    ease: 'Linear',
                    duration: 1000
                }
           ],
           repeat: -1
       });
    }

    update() {
        
    }
}