class ConnectStar extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame ) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.scale = 1;
        this.alpha = 1;
         
    }

    update() {
        

    }
}
// while(Phaser.Math.Distance.Between(scene.walker.x, scene.walker.y, this.x, this.y) < 200){
//             this.setRandomPosition(
//             scene.spawnBorder + this.width/2,
//             scene.spawnBorder + this.height/2,
//             this.scene.playSpaceX - this.width/2, 
//             this.scene.playSpaceY - this.height/2);
//         }