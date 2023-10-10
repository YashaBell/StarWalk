class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {

    }
    create(){
        // Key inputs
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        
        //set play space
        this.playSpaceX = game.config.width * 2;
        this.playSpaceY = game.config.height * 2;
        this.spawnBorder = 100;
        this.physics.world.setBounds(0,0,this.playSpaceX, this.playSpaceY);

        //create bkg
        this.add.tileSprite(0, 0, this.playSpaceX * 2, this.playSpaceY * 2,'bkg')

        //cams
        this.cameras.main.setBounds(0,0,this.playSpaceX, this.playSpaceY);
        this.cameras.main.zoom = 0.5

        //gameobject creation
        this.endStar = new EndStar(this, this.playSpaceX - 100, 100, 'endStar');
        this.walker = new Walker(this, 0, 0, 'walker', 'starWalk1');

        this.hpositions = new Array(5);
        this.hazards = this.add.group({
            classType: HazardStar,
            runChildUpdate: true,
            maxSize: 5
        })
        for(let i = 0; i < 5; i++){
                this.hpositions[i] = new Array(2);
                var temp = (new HazardStar(this, 0, 0, 'hazard'));
                this.hpositions[i][0] = temp.x;
                this.hpositions[i][1] = temp.y;

                this.hazards.add( temp );
            }
        
    }

    update(){
        camControl(this.cameras.main);
        this.walker.update(this.endStar, this.hpositions);
    }
}

//function for cam control | reference:
//https://github.com/photonstorm/phaser3-examples/blob/master/public/src/camera/rotate%20camera.js

function camControl(cam){
    if(keyQ.isDown){
        cam.zoom -= .01
    }else{
        if(keyE.isDown){
            cam.zoom += .01
        }
    }
    if(cam.zoom < 0.5){
        cam.zoom = 0.5;
    }
    if(keyS.isDown){
        cam.scrollY += 5;
    }else{
        if(keyW.isDown){
            cam.scrollY -= 5;
        }
    }
    if(keyD.isDown){
        cam.scrollX += 5;
    }else{
        if(keyA.isDown){
            cam.scrollX -= 5;
        }
    }
}
