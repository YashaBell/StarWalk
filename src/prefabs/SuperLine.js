class SuperLine extends Phaser.GameObjects.Line {
    constructor(scene, x, y, x1, y1, x2, y2, color, alpha) {
        super(scene, x, y, x1, y1, x2, y2, color, alpha, );
        this.setOrigin(0.5,0.5);
        this.scene = scene
        this.scene.add.existing(this);
        this
        this.alpha = 1;
        this.Xtot = x2;
        this.Ytot = y1 + y2;
        this.length = Math.sqrt((this.Xtot * this.Xtot)+(this.Ytot * this.Ytot));
        this.totalBodies = Phaser.Math.RoundTo(this.length/16,0);
        this.xChange = this.Xtot/this.totalBodies;
        this.yChange = this.Ytot/this.totalBodies;
        this.xStart = x - this.Xtot/2;
        console.log(y1);    
        if(y1 == 0){
            this.yStart = y - this.Ytot/2;
            this.slope = 1;
        }else{
            this.yStart = y + this.Ytot/2;
            this.slope = -1;
        }

        this.supLine = new Array(this.totalBodies);
        for(let i = 0; i < this.totalBodies; i++){
            this.supLine[i] = scene.physics.add.sprite( 
                this.xStart + this.xChange * i, 
                this.yStart  + this.slope*this.yChange * i, 
                'superLine');
                this.supLine[i].body.isCircle = true;
                this.supLine[i].body.OnCollide = true;
        }   
    }

    update() {
        // for(let i = 0; i < this.totalBodies; i++){
        //     this.scene.physics.add.collider(this.scene.walker, this.supLine[i]);
        //     //, () => {
        //       //  this.scene.walker.setVelocity(this.xChange *100, this.slope*this.ychange*100);        
        // }
    }
}

// while(Phaser.Math.Distance.Between(scene.walker.x, scene.walker.y, this.x, this.y) < 200){
//             this.setRandomPosition(
//             scene.spawnBorder + this.width/2,
//             scene.spawnBorder + this.height/2,
//             this.scene.playSpaceX - this.width/2, 
//             this.scene.playSpaceY - this.height/2);