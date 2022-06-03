import { GameManager } from "../../managers/gameManager";

export class Ship {
    constructor(name, scene, type, position, tileSize, speed, fuel, startPosition, isPlayer, flyingSFX, idleSFX, completeGameCallback) {
        this.name = name;
        this.scene = scene;
        this.type = type;
        this.tileSize = tileSize;
        this.speed = speed;
        this.fuel = fuel;
        this.startPosition = startPosition;
        this.isPlayer = isPlayer;
        var pixelWidth = 5;
        var pixelHeight = 5;
        var shape = null;
        this.endPosition = null;
        this.tileCounter = this.startPosition.x;
        this.isStarted = false;
        this.isWaitingToAnswer = true;
        this.complete = false;
        this.didNotifyComplete = false;
        this.flyingSFX = flyingSFX;
        this.idleSFX = idleSFX;
        this.completeGameCallback = completeGameCallback;

        if (GameManager.instance.isSoundOn) {
            if (this.idleSFX !== null) {
                this.idleSFX.play();
            }
        }

        this.idle = `idle_${this.name}`;
        this.flying = `flying_${this.name}`;
        this.crash = `crash_${this.name}`;
        this.win = `win_${this.name}`;

        this.image = this.scene.add.sprite(position.x, position.y, this.name);
        var shipFramesData = this.scene.textures.get(this.name);

        // debugger;

        var frameName = '';
        var idleAnimation = {
            key: this.idle,
            frames: [],
            frameRate: 30,
            repeat: 0
        };

        for (let i = 1; i <= 9; i++) {

            if (i <= 9) {
                frameName = `${this.name}000${i}.png`
            } else {
                frameName = `${this.name}00${i}.png`
            }

            var frame = {
                key: this.name,
                frame: frameName
            }

            idleAnimation.frames.push(frame);
        }

        var flyingAnimation = {
            key: this.flying,
            frames: [],
            frameRate: 30,
            repeat: 0
        };

        for (let i = 10; i <= 17; i++) {

            if (i <= 9) {
                frameName = `${this.name}000${i}.png`
            } else {
                frameName = `${this.name}00${i}.png`
            }

            var frame = {
                key: this.name,
                frame: frameName
            }

            flyingAnimation.frames.push(frame);
        }


        var crashAnimation = {
            key: this.crash,
            frames: [],
            frameRate: 30,
            repeat: 0
        };

        for (let i = 18; i <= 29; i++) {

            frameName = `${this.name}00${i}.png`


            var frame = {
                key: this.name,
                frame: frameName
            }

            crashAnimation.frames.push(frame);
        }

        var winAnimation = {
            key: this.win,
            frames: [],
            frameRate: 15,
            repeat: 0
        };

        for (let i = 30; i <= 35; i++) {
            frameName = `${this.name}00${i}.png`
            var frame = {
                key: this.name,
                frame: frameName
            }
            winAnimation.frames.push(frame);
        }

        this.scene.anims.create(idleAnimation);
        this.scene.anims.create(flyingAnimation);
        this.scene.anims.create(crashAnimation);
        this.scene.anims.create(winAnimation);
        this.image.play(this.idle);
        // this.scene.textures.generate(this.name, { data: shape, pixelWidth: pixelWidth });
        // this.image = this.scene.add.image(position.x, position.y, this.name).
        // this.image.setOrigin(0, 0);
        this.image.setInteractive();
        this.image.setDepth(3);
        // this.image.on('pointerdown', this.findPath.bind(this));

        this.image.on('pointerdown', () => {
            // this.image.play('crash');
        })

        this.image.on('animationcomplete', (anim, frame) => {
            if (anim.key === this.flying) {
                if (!this.isWaitingToAnswer) {
                    this.image.play(this.flying);
                }

            } else if (anim.key === this.idle) {
                if (this.isWaitingToAnswer) {
                    this.image.play(this.idle);
                } else if (this.complete) {

                    if (!this.didNotifyComplete) {

                        //When it reaches the end.
                        this.image.play(this.idle);
                        this.didNotifyComplete = true;
                        this.timer = window.setTimeout(() => {
                            this.scene.notifyOnShipComplete(this.type, this.isPlayer);
                            window.clearTimeout(this.timer);
                        }, 1000);
                    } else {

                        this.image.play(this.idle);
                        if (GameManager.instance.isSoundOn) {
                            if (this.flyingSFX !== null) {
                                this.flyingSFX.stop();
                            }

                            if (this.idleSFX !== null) {
                                this.idleSFX.play();
                            }
                        }
                    }
                }
            } else if (anim.key === this.crash) {
                if (this.isWaitingToAnswer) {
                    this.image.play(this.idle);
                } else {
                    this.image.play(this.flying);
                }
            } else if (anim.key === this.win) {
                if (this.complete) {
                    this.image.play(this.win);
                }
            }
        }, this);
    }

    move(path) {
        if (GameManager.instance.isSoundOn) {
            if (this.flyingSFX !== null) {
                this.flyingSFX.play();
            }

            if (this.idleSFX !== null) {
                this.idleSFX.stop();
            }
        }

        if (path === null) return;

        var tweens = [];
        for (var i = 0; i < path.length - 1; i++) {
            var ex = path[i + 1].x;
            var ey = path[i + 1].y;
            tweens.push({
                targets: this.image,
                ease: 'Linear',
                onComplete: this.onComplete.bind(this),
                x: { value: ex * this.tileSize, duration: this.speed },
                y: { value: ey * this.tileSize, duration: this.speed }
            });

        }

        //Add and extra tween to move to over the stand
        tweens.push(this.addExtraTweenForStandPosition());

        this.timeline = this.scene.tweens.timeline({
            tweens: tweens,
            onComplete: this.onCompleteTimeLine.bind(this)
        });

        this.isStarted = true;
    }

    addExtraTweenForStandPosition() {
        var tween = null;
        if (this.type === 1) {
            tween = {
                targets: this.image,
                ease: 'Linear',
                onComplete: this.onComplete.bind(this),
                x: { value: GameManager.instance.pathManager.worldWidth + 250, duration: 900 },
                y: { value: 200, duration: 900 }
            };
        } else if (this.type === 2) {
            tween = {
                targets: this.image,
                ease: 'Linear',
                onComplete: this.onComplete.bind(this),
                x: { value: GameManager.instance.pathManager.worldWidth + 550, duration: 1650 },
                y: { value: 200, duration: 1650 }
            };
        } else if (this.type === 3) {
            tween = {
                targets: this.image,
                ease: 'Linear',
                onComplete: this.onComplete.bind(this),
                x: { value: GameManager.instance.pathManager.worldWidth + 0, duration: 300 },
                y: { value: 200, duration: 300 }
            };
        }
        return tween;
    }

    moveToStand(position) {
        if (GameManager.instance.isSoundOn) {
            if (this.flyingSFX !== null) {
                this.flyingSFX.play();
            }

            if (this.idleSFX !== null) {
                this.idleSFX.stop();
            }
        }

        var tweens = [];
        tweens.push({
            targets: this.image,
            ease: 'Linear',
            x: { value: position.x, duration: 1000 },
            y: { value: position.y, duration: 1000 }
        });

        this.timeline = this.scene.tweens.timeline({
            tweens: tweens,
            onComplete: this.onCompleteMovingToStand.bind(this)
        });

        this.timeline.resume();
        this.image.play(this.flying);
        this.isStarted = true;
    }

    onCompleteTimeLine(value) {
        this.complete = true;
        this.image.play(this.idle);
        if (this.isPlayer) {
            this.scene.notifyShipsToHurry();
            console.log('REQUEST OTHER PLAYER TO HURRY')
        }
    }

    onComplete(value) {
        this.tileCounter++;
        if (this.isPlayer) {
            if (this.scene.isOnQuestionMark(this.tileCounter)) {

                if (GameManager.instance.isSoundOn) {
                    if (this.flyingSFX !== null) {
                        this.flyingSFX.stop();
                    }

                    if (this.idleSFX !== null) {
                        this.idleSFX.play();
                    }
                }

                this.scene.moveCameraForQuestion(this);
                this.timeline.pause();
                console.dir(this.timeline);
                this.image.play(this.idle);
                this.isWaitingToAnswer = true;
            }
        } else {

        }
    }

    onCompleteMovingToStand(value) {
        this.image.play(this.win);

        if (GameManager.instance.isSoundOn) {
            if (this.flyingSFX !== null) {
                this.flyingSFX.stop();
            }

            if (this.idleSFX !== null) {
                this.idleSFX.stop();
            }
        }

        if (this.isPlayer) {
            this.completeGameCallback();
        }
    }

    findPath(pointer) {
        if (!this.isStarted) {
            GameManager.instance.pathManager.findPath(this.startPosition, this.endPosition, this.receivedPath.bind(this));
            this.isWaitingToAnswer = false;
            this.image.play(this.flying);
        } else {
            // this.fuel += 10;
            // this.scene.tweens.resumeAll();
            // if (this.isPlayer) {
            // this.scene.continueAfterAsnweringQuestion();
            // this.timeline.resume();
            // }
        }
    }

    continueAfterAsnweringQuestion() {
        if (GameManager.instance.isSoundOn) {
            if (this.flyingSFX !== null) {
                this.flyingSFX.play();
            }

            if (this.idleSFX !== null) {
                this.idleSFX.stop();
            }
        }

        if (this.isPlayer) {
            this.timeline.resume();
            this.image.play(this.flying);
            this.isWaitingToAnswer = false;
        }
    }

    receivedPath(path) {
        this.move(path);
    }

    clickOnWrongAnswer() {
        this.image.play(this.crash);
    }

    moveToLastPosition(position) {
        this.timeline.stop();
        if (GameManager.instance.isSoundOn) {
            if (this.flyingSFX !== null) {
                this.flyingSFX.play();
            }

            if (this.idleSFX !== null) {
                this.idleSFX.stop();
            }
        }

        var tweens = [];
        tweens.push({
            targets: this.image,
            ease: 'Linear',
            x: { value: position.x, duration: 1000 },
            y: { value: position.y, duration: 1000 }
        });

        tweens.push(this.addExtraTweenForStandPosition());

        this.timeline = this.scene.tweens.timeline({
            tweens: tweens,
            onComplete: this.onCompleteMovingToLastPosition.bind(this)
        });

        this.timeline.resume();
        this.image.play(this.flying);
        this.isStarted = true;
    }

    onCompleteMovingToLastPosition() {
        this.scene.notifyOnShipComplete(this.type, this.isPlayer);
    }
}