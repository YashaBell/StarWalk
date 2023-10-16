class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {

    }
    create() {
        // score
        this.scene.run('gameUIScene', { active: true });

        // Key inputs
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //set play space
        this.playSpaceX = game.config.width * 4;
        this.playSpaceY = game.config.height;
        this.spawnBorder = 100;
        this.physics.world.setBounds(0, 0, this.playSpaceX, this.playSpaceY);

        //create bkg
        this.bkg1 = this.add.tileSprite(0, 0, this.playSpaceX * 2, this.playSpaceY * 2, 'bkg')
        this.bkg2 = this.add.tileSprite(0, 0, this.playSpaceX * 2, this.playSpaceY * 2, 'bkg2')
        this.bkg2.flipX = true;

        //cams
        this.cameras.main.setBounds(0, 0, this.playSpaceX, this.playSpaceY);
        this.cameras.main.zoom = 1

        //gameobject creation

        // End Star
        this.endStar = new EndStar(this, 0, 0, 'endStar');

        // Walker
        this.walker = new Walker(this, 0, 0, 'walker', 'starWalk1');

        // Follow Cam
        this.cameras.main.startFollow(this.walker);

        //Reticle for selection
        this.reticle = this.add.sprite(-32, -32, 'reticle');
        console.log(this.reticle);

        this.hpositions = new Array(5);
        this.hazards = this.add.group({
            classType: HazardStar,
            runChildUpdate: true,
            maxSize: 5
        })
        for (let i = 0; i < 5; i++) {
            this.hpositions[i] = new Array(2);
            var temp = (new HazardStar(this, 0, 0, 'hazard'));
            if (i == 0) {
                temp.setPosition(832, this.playSpaceY / 2);
            } else {
                temp.setRandomPosition(
                    i * 864 + temp.width / 2,
                    this.walker.height+10+(temp.height / 2),
                    864,
                    this.playSpaceY - (temp.height + this.walker.height + 10));
            }
            this.hpositions[i][0] = temp.x;
            this.hpositions[i][1] = temp.y;
            this.hazards.add(temp);
        }
        this.connect = new Array(25);
        for (let i = 0; i < 25; i++) {
            this.connect[i] = (new ConnectStar(this, 0, 0, 'connect'));
            this.connect[i].setRandomPosition(
                (i - (i % 5)) / 5 * 864 + this.connect[i].width / 2,
                this.walker.height+10+(this.connect[i].height / 2),
                864,
                this.playSpaceY - (this.connect[i].height + this.walker.height + 10));
        }
        this.linesTotal = 0;
        this.lines = this.add.group({
            classType: SuperLine,
            runChildUpdate: true,
            maxSize: 10
        });
        this.firstLine = false;

        this.gameOver = false;
    }

    update() {
        this.walker.update();
        if (!this.gameOver) {
            //camControl(this.cameras.main);
            this.walker.update(this.endStar, this.hpositions);
            //interactions

            // End Star Collide
            this.physics.add.collider(this.walker, this.endStar, () => {
                this.hazards.clear(true,true);
                this.bkg1.destroy(true);
                this.bkg2.destroy(true);
                this.reticle.destroy(true);
                for (let i = 0; i < 25; i++) {
                    this.connect[i].destroy(true);
                }
                this.lines.destroy(true);
                this.walker.destroy(true);
                score ++;
                this.scene.start('playScene');

        });

            // Hazard star collide
            this.physics.add.collider(this.walker, this.hazards, () => {
                this.gameOver = true;
                this.hazards.clear(true,true);
                this.bkg1.destroy(true);
                this.bkg2.destroy(true);
                this.reticle.destroy(true);
                this.endStar.destroy(true);
                for (let i = 0; i < 25; i++) {
                    this.connect[i].destroy(true);
                }
                this.lines.destroy(true);
                this.walker.setVelocity(0, 0);
                this.walker.anims.stop('walkLOOP');
                this.walker.setFrame('starWalk0');
                this.walkerIMAGE = this.add.image(this.walker.x, this.walker.y, 'walker', 'starWalk3').setAlpha(0);
                this.tweens.add({
                    targets: this.cameras.main,
                    zoom : 3,
                    duration: 2000
                })
                this.tweens.add({
                    targets: this.walker,
                            alpha: 0,
                            duration: 2000,     
                    repeat:0,
                    onComplete: () => {
                        this.tweens.add({
                            targets: this.walkerIMAGE,
                                    alpha: 1,
                                    duration: 2000,     
                            repeat:0,
                            onComplete: () => {
        
                                this.scene.stop('gameUIScene', { active: true })
                                this.scene.start('gameOverScene');
                            }
                        });
                    }
                });
            });

            // line create
            const pointer = this.input.activePointer.positionToCamera(this.cameras.main)
            if (Phaser.Input.Keyboard.JustDown(keySpace)) {
                var temp;
                for (let i = 0; i < this.connect.length; i++) {
                    if (this.connect[i].x + 32 > pointer.x && pointer.x > this.connect[i].x - 32 && this.connect[i].y + 32 > pointer.y && pointer.y > this.connect[i].y - 32) {
                        temp = this.connect[i];
                        i = this.connect.length;
                    } else {
                        if (i == this.connect.length - 1) {
                            temp = 1;
                        }
                    }
                }
                if (temp != 1) {
                    if (this.reticle.x == -32) {
                        this.reticle.setPosition(temp.x, temp.y);
                    } else {
                        var Xdist = this.reticle.x - temp.x;
                        var Ydist = this.reticle.y - temp.y;
                        var newLine;
                        this.firstLine = true;
                        if ((Xdist * Ydist) > 0) {
                            this.lines.add(new SuperLine(this,
                                this.reticle.x - Xdist / 2,
                                this.reticle.y - Ydist / 2,
                                0,
                                0,
                                Math.abs(Xdist),
                                Math.abs(Ydist),
                                '0x5fcde4', 1));
                            this.linesTotal++;
                        } else {
                            this.lines.add(new SuperLine(this,
                                this.reticle.x - Xdist / 2,
                                this.reticle.y - Ydist / 2,
                                0,
                                Math.abs(Ydist),
                                Math.abs(Xdist),
                                0,
                                '0x5fcde4', 1));
                            this.linesTotal++;
                        }
                        this.reticle.setPosition(-32, -32);
                    }
                }
            }
        }
    }
}

//function for cam control | reference:
//https://github.com/photonstorm/phaser3-examples/blob/master/public/src/camera/rotate%20camera.js

function camControl(cam) {
    var scrollSpeed = 10;
    if (keyQ.isDown) {
        cam.zoom -= .01
    } else {
        if (keyE.isDown) {
            cam.zoom += .01
        }
    }
    if (cam.zoom < 0.5) {
        cam.zoom = 0.5;
    }
    if (keyS.isDown) {
        cam.scrollY += scrollSpeed;
    } else {
        if (keyW.isDown) {
            cam.scrollY -= scrollSpeed;
        }
    }
    if (keyD.isDown) {
        cam.scrollX += scrollSpeed;
    } else {
        if (keyA.isDown) {
            cam.scrollX -= scrollSpeed;
        }
    }
}
