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
        this.playSpaceX = game.config.width * 4;
        this.playSpaceY = game.config.height;
        this.spawnBorder = 100;
        this.physics.world.setBounds(0,0,this.playSpaceX, this.playSpaceY);

        //create bkg
        this.bkg1 = this.add.tileSprite(0, 0, this.playSpaceX * 2, this.playSpaceY * 2,'bkg')
        this.bkg2 = this.add.tileSprite(0, 0, this.playSpaceX * 2, this.playSpaceY * 2,'bkg2')
        this.bkg2.flipX=true;

        //cams
        this.cameras.main.setBounds(0,0,this.playSpaceX, this.playSpaceY);
        this.cameras.main.zoom = 1

        //gameobject creation
        this.endStar = new EndStar(this, 0, 0, 'endStar');
        this.walker = new Walker(this, 0, 0, 'walker', 'starWalk1');
        this.cameras.main.startFollow(this.walker);
        this.reticle = this.add.sprite(-32, -32, 'reticle')
        console.log(this.reticle);


        this.hpositions = new Array(5);
        this.hazards = this.add.group({
            classType: HazardStar,
            runChildUpdate: true,
            maxSize: 5
        })
        for(let i = 0; i < 5; i++){
            this.hpositions[i] = new Array(2);
            var temp = (new HazardStar(this, 0, 0, 'hazard'));
            if(i == 0){
                temp.setPosition(832, this.playSpaceY/2);
            }else{
                temp.setRandomPosition(
                    i * 864 + temp.width/2,
                    temp.height/2,
                    864, 
                    this.playSpaceY - temp.height);
            }
            this.hpositions[i][0] = temp.x;
            this.hpositions[i][1] = temp.y;
            this.hazards.add( temp );
        }
        this.connect = new Array(20);
        for(let i = 0; i < 25; i++){
            this.connect[i] = (new ConnectStar(this, 0, 0, 'connect'));
            this.connect[i].setRandomPosition(
            (i - (i % 5))/5 * 864 + this.connect[i].width/2,
            this.connect[i].height/2,
            864, 
            this.playSpaceY - this.connect[i].height);
        }
    }

    update(){
        
        //camControl(this.cameras.main);
        this.walker.update(this.endStar, this.hpositions);
        const pointer = this.input.activePointer.positionToCamera(this.cameras.main);
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            var temp;
            for(let i = 0; i < this.connect.length; i++){
                if(this.connect[i].x + 32 >  pointer.x && pointer.x > this.connect[i].x - 32 && this.connect[i].y + 32 > pointer.y && pointer.y > this.connect[i].y - 32){
                    temp = this.connect[i];
                    i = this.connect.length;
                }else{
                    if( i == this.connect.length - 1){
                        temp = 1;
                    }
                }
            }
            if(temp != 1){
                if(this.reticle.x == -32){
                    this.reticle.setPosition(temp.x, temp.y);
                }else{
                    var Xdist = this.reticle.x-temp.x;
                    var Ydist = this.reticle.y-temp.y;
                    console.log(this.reticle.x, this.reticle.y,temp.x,temp.y);
                    if((Xdist * Ydist) > 0){
                        this.add.line(
                            this.reticle.x - Xdist/2,
                            this.reticle.y - Ydist/2,
                            0,
                            0,
                            Math.abs(Xdist),
                            Math.abs(Ydist),
                            '0xff0000',5);
                    }else{
                        this.add.line(
                            this.reticle.x - Xdist/2,
                            this.reticle.y - Ydist/2,
                            0,
                            Math.abs(Ydist),
                            Math.abs(Xdist),
                            0,
                            '0xff0000',5);
                    }

                    this.reticle.setPosition(-32,-32);
                    console.log('line created');
                }
            }
        }
    }
}

//function for cam control | reference:
//https://github.com/photonstorm/phaser3-examples/blob/master/public/src/camera/rotate%20camera.js

function camControl(cam){
    var scrollSpeed = 10;
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
        cam.scrollY += scrollSpeed;
    }else{
        if(keyW.isDown){
            cam.scrollY -= scrollSpeed;
        }
    }
    if(keyD.isDown){
        cam.scrollX += scrollSpeed;
    }else{
        if(keyA.isDown){
            cam.scrollX -= scrollSpeed;
        }
    }
}
