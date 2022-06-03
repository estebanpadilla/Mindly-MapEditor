import { Scene } from 'phaser';
import { GameManager } from '../managers/gameManager';
import { Asteroid } from './objects/asteroid';
import { Ship } from './objects/ship';
import { randomBetween } from '../libs/utils';

export class PlayScene extends Scene {
    constructor() {
        super('PlayScene');
        // console.log(GameManager.instance.dataManager.getCurrentLevel());
        // this.worldWidth = 3840;
        // this.worldHeight = null;
        // this.blockSize = 80;
        this.speed = 1000;
        this.questionMarks = [];
        this.playerCompletedRunCounter = 0;
        this.playerCompletedOrder = [];

        this.shapesL1 = [];
        this.shapesL2 = [];
        this.tileSize = 0;

        this.crashSFX = null;
        this.correctSFX = null;
        this.flyingSFX = null;
        this.idleSFX = null;

        this.shipsForSelection = [{ name: 'bulbShip', isSelected: false },
        { name: 'dogShip', isSelected: false },
        { name: 'chickenShip', isSelected: false },
        { name: 'dinoShip', isSelected: false }];

        this.ships = [];
        this.stands = null;
        this.finishLine = null;
    }

    preload() {

        this.load.audio('crash', [
            'assets/sound/crash.ogg',
            'assets/sound/crash.mp3'
        ]);

        this.load.audio('correct', [
            'assets/sound/correct.ogg',
            'assets/sound/correct.mp3'
        ]);

        this.load.audio('flying', [
            'assets/sound/flying.ogg',
            'assets/sound/flying.mp3'
        ]);

        this.load.audio('idle', [
            'assets/sound/idle.ogg',
            'assets/sound/idle.mp3'
        ]);

        // this.load.image('ship1', 'assets/images/ships/ship1.png');
        // this.load.image('ship2', 'assets/images/ships/ship2.png');
        // this.load.image('ship3', 'assets/images/ships/ship3.png');
        // this.load.atlas('dogShip', 'assets/animations/ships/bulbShip.png', 'assets/animations/ships/bulbShip.json');
        this.load.atlas('dogShip', 'assets/animations/ships/dogShip.png', 'assets/animations/ships/dogShip.json');
        this.load.atlas('bulbShip', 'assets/animations/ships/bulbShip.png', 'assets/animations/ships/bulbShip.json');
        this.load.atlas('chickenShip', 'assets/animations/ships/chickenShip.png', 'assets/animations/ships/chickenShip.json');
        this.load.atlas('dinoShip', 'assets/animations/ships/dinoShip.png', 'assets/animations/ships/dinoShip.json');
        this.load.atlas('asteroid1', 'assets/animations/asteroids/asteroid1.png', 'assets/animations/asteroids/asteroid1.json');
        this.load.atlas('asteroid2', 'assets/animations/asteroids/asteroid2.png', 'assets/animations/asteroids/asteroid2.json');
        this.load.atlas('asteroid3', 'assets/animations/asteroids/asteroid3.png', 'assets/animations/asteroids/asteroid3.json');

        this.load.image('blueAsteroid', 'assets/images/blueAsteroid.png');
        this.load.image('greenPlanet', 'assets/images/greenPlanet.png');
        this.load.image('largeAsteroid', 'assets/images/largeAsteroid.png');
        this.load.image('mediumAsteroid', 'assets/images/mediumAsteroid.png');
        this.load.image('orangePlanet', 'assets/images/orangePlanet.png');
        this.load.image('ringPlanet', 'assets/images/ringPlanet.png');

        this.load.image('asteroidBGM1', 'assets/images/asteroidBGM1.png');
        this.load.image('asteroidBGM2', 'assets/images/asteroidBGM2.png');
        this.load.image('asteroidBGM3', 'assets/images/asteroidBGM3.png');
        this.load.image('asteroidBGM4', 'assets/images/asteroidBGM4.png');
        this.load.image('asteroidBGM5', 'assets/images/asteroidBGM5.png');

        this.load.image('asteroidBGS1', 'assets/images/asteroidBGS1.png');
        this.load.image('asteroidBGS2', 'assets/images/asteroidBGS2.png');
        this.load.image('asteroidBGS3', 'assets/images/asteroidBGS3.png');
        this.load.image('asteroidBGS4', 'assets/images/asteroidBGS4.png');
        this.load.image('asteroidBGS5', 'assets/images/asteroidBGS5.png');

        this.load.image('stars01', 'assets/images/stars01.png');
        this.load.image('stars02', 'assets/images/stars02.png');
        this.load.image('stars03', 'assets/images/stars03.png');
        this.load.image('stars04', 'assets/images/stars04.png');

        this.load.image('one', 'assets/images/one.png');
        this.load.image('two', 'assets/images/two.png');
        this.load.image('three', 'assets/images/three.png');
        this.load.image('go', 'assets/images/go.png');

        this.load.image('stands', 'assets/images/stands.png');
        this.load.image('finishLine', 'assets/images/finishLine.png');

        this.load.image('circle', 'assets/images/shapes/circle.png');
        this.load.image('donut', 'assets/images/shapes/donut.png');
        this.load.image('polygone', 'assets/images/shapes/polygone.png');
        this.load.image('square', 'assets/images/shapes/square.png');
        this.load.image('star', 'assets/images/shapes/star.png');
        this.load.image('triangle', 'assets/images/shapes/triangle.png');
    }

    create() {
        //clean All scene object before play
        this.unSelectAllShips();
        this.questionMarks = [];
        this.playerCompletedRunCounter = 0;
        this.playerCompletedOrder = [];
        this.ships = []; //I may need to clean each ship, check memory
        this.cameras.main.fadeFrom(2000, GameManager.instance.BACKGROUND_R, GameManager.instance.BACKGROUND_G, GameManager.instance.BACKGROUND_B);

        // this.add.image(400, 300, 'rick').setScale(0.7);

        // this.cameras.main.on('camerafadeoutcomplete', function () {

        //     // this.scene.restart();

        // }, this);

        this.crashSFX = this.sound.add('crash', {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        this.correctSFX = this.sound.add('correct', {
            mute: false,
            volume: 0.25,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });


        this.flyingSFX = this.sound.add('flying', {
            mute: false,
            volume: 0.5,
            rate: 1.5,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        this.idleSFX = this.sound.add('idle', {
            mute: false,
            volume: 0.25,
            rate: 0.5,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });

        // this.worldHeight = this.renderer.height;
        this.createEasyStartGrid();
        this.tileSize = GameManager.instance.pathManager.tileSize;
        var worldWidth = GameManager.instance.pathManager.worldWidth;
        var worldHeight = GameManager.instance.pathManager.worldHeight;
        var screenWidth = GameManager.instance.screenWidth;
        var screenHeight = GameManager.instance.screenHeight;

        this.shapesL0 = new Array(10).fill(null).map(
            () => {
                return GameManager.instance.createRamdonStar(this)
            }
        );

        this.shapesL1 = new Array(10).fill(null).map(
            () => {
                return GameManager.instance.createRamdonAsteroidBGS(this);
            }
        );

        this.shapesL2 = new Array(10).fill(null).map(
            () => {
                return GameManager.instance.createRamdonAsteroidBGM(this);
            }
        );

        this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
        this.rect.width += 600;

        this.astroid1 = new Asteroid('asteroid1', this, 1, { x: 80, y: 160 }, this.tileSize, { x: 1, y: 1 }, 1);
        this.astroid2 = new Asteroid('asteroid2', this, 1, { x: 80, y: 160 }, this.tileSize, { x: 1, y: 1 }, 2);
        this.astroid3 = new Asteroid('asteroid3', this, 1, { x: 80, y: 160 }, this.tileSize, { x: 1, y: 1 }, 3);

        this.setShipSelected(GameManager.instance.selectedPlayer);

        this.ship1 = new Ship(GameManager.instance.selectedPlayer, this, 1, { x: 80, y: 140 }, this.tileSize, 50, 0, { x: 1, y: 2 }, true, this.flyingSFX, this.idleSFX, this.completeGameCallback.bind(this));
        this.ship1.image.setDepth(5);
        this.ship2 = new Ship(this.getUnselectedShip(), this, 2, { x: 80, y: 360 }, this.tileSize, 300, 0, { x: 1, y: 4 }, false, null, null, this.completeGameCallback.bind(this));
        this.ship3 = new Ship(this.getUnselectedShip(), this, 3, { x: 80, y: 530 }, this.tileSize, 400, 0, { x: 1, y: 6 }, false, null, null, this.completeGameCallback.bind(this));

        this.ships.push(this.ship1);
        this.ships.push(this.ship2);
        this.ships.push(this.ship3);

        this.astroid1.image.visible = false;
        this.astroid2.image.visible = false;
        this.astroid3.image.visible = false;

        this.stands = this.add.sprite(worldWidth + 250, worldHeight, 'stands');
        // this.finishLine = this.add.sprite(worldWidth - screenWidth, 350, 'finishLine');
        // this.finishLine.setDepth(10);

        this.ship1.endPosition = {
            x: (GameManager.instance.pathManager.grid[0].length - 1),
            y: 3
        };

        this.ship2.endPosition = {
            x: (GameManager.instance.pathManager.grid[0].length - 1),
            y: 3
        };

        this.ship3.endPosition = {
            x: (GameManager.instance.pathManager.grid[0].length - 1),
            y: 3
        };

        this.cameras.main.setBounds(0, 0, worldWidth + 960, worldHeight);
        this.cameras.main.startFollow(this.ship1.image, true, 0.2, 0.2);

        this.cursors = this.input.keyboard.createCursorKeys();

        if (GameManager.instance.dataManager.map.gameObjects) {
            GameManager.instance.dataManager.map.gameObjects.forEach(sprite => {
                var image = this.add.sprite(100, 100, sprite.name);
                image.x = sprite.x;
                image.y = sprite.y;
                if (sprite.name === 'finishLine') {
                    image.setDepth(10);
                }
            });
        }

        this.questionText = this.add.text(0, 40, '', {
            strokeThickness: 8,
            stroke: '#5ACF31',
            fontStyle: 'bold',
            fontSize: '50px',
            fontFamily: 'Arial',
            color: '#ffff00',
            align: 'center'
        });

        this.questionText.setDepth(2);
        this.questionText.setOrigin(0.5);
        this.questionText.visible = false;

        // this.startGame();

        var xpos = (screenWidth / 2);
        var ypos = (screenHeight / 2);

        this.one = this.add.sprite((screenWidth / 2), 200, "one");
        this.one.setOrigin(0.5);
        this.one.x = xpos;
        this.one.y = ypos;
        this.one.scaleX = 0.25;
        this.one.scaleY = 0.25;
        this.one.visible = false;

        this.two = this.add.sprite(200, 200, "two");
        this.two.setOrigin(0.5);
        this.two.x = xpos;
        this.two.y = ypos;
        this.two.scaleX = 0.25;
        this.two.scaleY = 0.25;
        this.two.visible = false;

        this.three = this.add.sprite(200, 200, "three");
        this.three.setOrigin(0.5);
        this.three.x = xpos;
        this.three.y = ypos;
        this.three.scaleX = 0.25;
        this.three.scaleY = 0.25;
        // this.three.visible = false;

        this.go = this.add.sprite(200, 200, "go");
        this.go.setOrigin(0.5);
        this.go.x = xpos;
        this.go.y = ypos;
        this.go.scaleX = 0.25;
        this.go.scaleY = 0.25;
        this.go.visible = false;

        this.tweens.add({
            targets: this.three,
            scaleX: 1,
            scaleY: 1,
            ease: 'Power1',
            duration: 1000,
            onComplete: this.onCompleteTree.bind(this)
        });

        this.startCount();
    }

    update() {

        this.rect.x = (this.ship1.image.x - 600);

        if (this.cursors.left.isDown) {
            this.ship1.image.x -= 5;
        } else if (this.cursors.right.isDown) {
            this.ship1.image.x += 5;
        }

        if (this.cursors.up.isDown) {
            this.ship1.image.y -= 5;
        } else if (this.cursors.down.isDown) {
            this.ship1.image.y += 5;
        }

        if (!this.ship1.isWaitingToAnswer) {
            this.shapesL1.forEach(function (shape, i) {
                shape.x -= (1 + 0.1 * i);
                //shape.y += (1 + 0.1 * i);
            });

            this.shapesL2.forEach(function (shape, i) {
                shape.x -= (1 + 0.5 * i);
                //shape.y += (1 + 0.1 * i);
            });

        } else {
            this.shapesL1.forEach(function (shape, i) {
                shape.x -= (1 + 0.01 * i);
                // shape.y += (1 + 0.1 * i);
            });

            this.shapesL2.forEach(function (shape, i) {
                shape.x -= (1 + 0.5 * i);
                // shape.y += (1 + 0.1 * i);
            });
        }

        Phaser.Actions.WrapInRectangle(this.shapesL0, this.rect, 200);
        Phaser.Actions.WrapInRectangle(this.shapesL1, this.rect, 200);
        Phaser.Actions.WrapInRectangle(this.shapesL2, this.rect, 200);

        // this.draw();
    }

    render() {

    }

    createEasyStartGrid() {

        var xpos = 0
        var x = xpos;
        var y = 0;

        var tileSize = GameManager.instance.pathManager.tileSize;

        for (let i = 0; i < GameManager.instance.pathManager.grid.length; i++) {
            const row = GameManager.instance.pathManager.grid[i];
            for (let j = 0; j < row.length; j++) {
                const type = row[j];
                if (GameManager.instance.IS_DEBUG_BUILD) {
                    this.createGridBlock(x, y, tileSize, type, type === 1 ? 0xcccccc : 0xff0000);
                }
                x += tileSize;
                if (i === 0) {
                    if (type === 2) {
                        this.questionMarks.push(j);
                    }
                }
            }

            x = xpos;
            y += tileSize;
        }
    }

    createGridBlock(x, y, size, type, fillColor) {
        if (type === 1 || type === 2) {
            const context = this.add.graphics();

            // if (type === 1) {
            context.lineStyle(1, fillColor, 1);
            // } else if (type === 2) {
            // context.lineStyle(1, 0xff0000, 1);
            // }

            context.fillStyle(fillColor, 1);
            context.beginPath();

            context.moveTo(x, y);
            context.lineTo(x + size, y);
            context.lineTo(x + size, y + size);
            context.lineTo(x, y + size);
            context.closePath();

            this.add.text(x, y, ('x:' + (x / size)), {
                color: 'red',
                fontSize: 12
            });
            this.add.text(x, (y + 10), ('y:' + (y / size)), {
                color: 'black',
                fontSize: 12
            });

            context.fill();

            context.strokePath();
        }
    }

    createGridPath() {
        var tileSize = GameManager.instance.pathManager.tileSize;
        if (this.path !== null) {
            this.path.forEach(point => {
                this.createGridBlock(((point.x * 80) + 0), ((point.y * 80) + 0), tileSize, false, 0xF3F3F3);
            });
        }
    }

    // createGrid() {
    //     //  Draw a random 'landscape'
    //     const context = this.add.graphics();
    //     const width = this.renderer.width;
    //     const height = this.renderer.height;

    //     context.lineStyle(1, 0xbbbbbb, 1);
    //     context.beginPath();

    //     for (let i = this.blockSize; i < height; i += this.blockSize) {
    //         context.moveTo(0, i);
    //         context.lineTo(this.worldWidth, i);
    //         context.closePath();
    //     }

    //     for (let i = this.blockSize; i < this.worldWidth; i += this.blockSize) {
    //         context.moveTo(i, 0);
    //         context.lineTo(i, height);
    //         context.closePath();
    //     }

    //     context.strokePath();
    // }

    isOnQuestionMark(tile) {
        for (let i = 0; i < this.questionMarks.length; i++) {
            const position = this.questionMarks[i];
            if (tile === position) {
                this.astroid1.image.visible = true;
                this.astroid2.image.visible = true;
                this.astroid3.image.visible = true;
                this.astroid1.updatePositionByTile((position + 8.4), 1.25);
                this.astroid2.updatePositionByTile((position + 8.4), 4);
                this.astroid3.updatePositionByTile((position + 8.4), 6.75);
                // this.questionText.x =  position * this.tileSize;

                return true;
            }
        }

        return false;
    }

    moveCameraForQuestion(ship) {

        this.cameras.main.stopFollow();

        this.cameras.main.pan(ship.image.x + 320, 0, 1000, 'Linear', false, (camera, progress, scrollX, scrollY) => {
            if (progress >= 1) {
                var question = GameManager.instance.getCurrentQuestion();
                console.log(question);
                this.astroid1.updateText(question.type, question.answers[0]);
                this.astroid2.updateText(question.type, question.answers[1]);
                this.astroid3.updateText(question.type, question.answers[2]);
                // switch (question.type) {
                //     case 'text':
                //         this.astroid1.updateText(question.type, question.answers[0]);
                //         this.astroid2.updateText(question.type, question.answers[1]);
                //         this.astroid3.updateText(question.type, question.answers[2]);
                //         break;
                //     case 'shape':
                //         this.astroid1.updateText(question.type, question.answers[0]);
                //         this.astroid2.updateText(question.type, question.answers[1]);
                //         this.astroid3.updateText(question.type, question.answers[2]);
                //         break;
                //     case 'images':
                //         this.astroid1.updateText('images');
                //         this.astroid2.updateText('images');
                //         this.astroid3.updateText('images');
                //         break;
                //     default:
                //         break;
                // }

                // this.astroid1.image.visible = true;
                // this.astroid2.image.visible = true;
                // this.astroid3.image.visible = true;
                // this.astroid1.updatePositionByTile((position + 8.5), 1.25);
                // this.astroid2.updatePositionByTile((position + 8.5), 4);
                // this.astroid3.updatePositionByTile((position + 8.5), 6.75);
                let fontSize = 40
                this.questionText.setFontSize(fontSize)
                this.questionText.setText(question.text);
                this.questionText.x = (this.cameras.main.scrollX + (960 / 2) - 125);// this.questionText.width;
                this.questionText.visible = true;

                //TODO: it does not support word wrap
                while (this.questionText.width > 750) {
                    fontSize = Math.floor(fontSize * .9)
                    this.questionText.setFontSize(fontSize)
                }


                // this.image.x =  x * this.tileSize;
                // this.image.y =  y * this.tileSize;
                // this.text.x = Math.floor(this.image.x + 10);
                // this.text.y = Math.floor(this.image.y + 10);
            }
        });

    }

    continueAfterAsnweringQuestion(answerId) {

        if (GameManager.instance.isSoundOn) {
            this.correctSFX.play();
        }

        var worldWidth = GameManager.instance.pathManager.worldWidth;
        var worldHeight = GameManager.instance.pathManager.worldHeight;
        this.cameras.main.removeBounds();
        this.cameras.main.setBounds(this.ship1.image.x - 160, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.ship1.image, false, 0.2, 0.2);
        this.ship1.continueAfterAsnweringQuestion();
        this.questionText.visible = false;
        // switch (answerId) {
        //     case 1:
        this.astroid1.playExplotion();
        // break;
        // case 2:
        this.astroid2.playExplotion();
        // break;
        // case 3:
        this.astroid3.playExplotion();
    }

    clickOnWrongAnswer() {
        if (GameManager.instance.isSoundOn) {
            this.crashSFX.play();
        }
        this.cameras.main.shake(1000, 0.005);
        this.ship1.clickOnWrongAnswer();
    }

    startGame() {
        GameManager.instance.restart();
        this.ship1.findPath();
        this.ship2.findPath();
        this.ship3.findPath();
    }

    notifyOnShipComplete(type, isPlayer) {

        this.playerCompletedOrder.push(type);
        this.playerCompletedRunCounter += 1;

        console.log('notifyOnShipComplete type:', type);
        console.log('notifyOnShipComplete isPlayer:', isPlayer);

        this.ships.forEach(ship => {
            if (!ship.complete) {

                console.log(ship);
            }
        });

        if (this.playerCompletedRunCounter === 3) {
            this.movePlayersToStand();
        }
    }

    notifyShipsToHurry() {
        this.ships.forEach(ship => {
            if (!ship.complete) {
                ship.moveToLastPosition({ x: GameManager.instance.pathManager.worldWidth - 350, y: 200 })
            }
        });
    }

    movePlayersToStand() {

        this.cameras.main.stopFollow();
        this.playerCompletedOrder.forEach((item, index) => {

            var position = {};
            switch (index) {
                case 0:
                    position = { x: GameManager.instance.pathManager.worldWidth + 250, y: 325 };
                    break;
                case 1:
                    position = { x: GameManager.instance.pathManager.worldWidth - 50, y: 450 };
                    break;
                case 2:
                    position = { x: GameManager.instance.pathManager.worldWidth + 525, y: 450 };
                    break;
                default:
                    break;
            }

            switch (item) {
                case 1:
                    this.ship1.moveToStand(position)
                    break;
                case 2:
                    this.ship2.moveToStand(position)
                    break;
                case 3:
                    this.ship3.moveToStand(position)
                    break;
                default:
                    break;
            }
        });
    }

    startCount() {

    }

    onCompleteOne() {
        this.one.visible = false;
        this.go.visible = true;
        this.tweens.add({
            targets: this.go,
            scaleX: 1,
            scaleY: 1,
            ease: 'Power1',
            duration: 1000,
            onComplete: this.onCompleteGo.bind(this)
        });
    }

    onCompleteTwo() {
        this.two.visible = false;
        this.one.visible = true;
        this.tweens.add({
            targets: this.one,
            scaleX: 1,
            scaleY: 1,
            ease: 'Power1',
            duration: 1000,
            onComplete: this.onCompleteOne.bind(this)
        });
    }

    onCompleteTree() {
        this.three.visible = false;
        this.two.visible = true;

        this.tweens.add({
            targets: this.two,
            scaleX: 1,
            scaleY: 1,
            ease: 'Power1',
            duration: 1000,
            onComplete: this.onCompleteTwo.bind(this)
        });
    }

    onCompleteGo() {
        this.go.visible = false;
        this.startGame();
    }

    setShipSelected(shipName) {
        this.shipsForSelection.forEach(ship => {
            if (ship.name === shipName) {
                ship.isSelected = true;
            }
        })
    }

    unSelectAllShips() {
        this.shipsForSelection.forEach(ship => {
            ship.isSelected = false;
        });
    }

    getUnselectedShip() {
        var index = randomBetween(0, (this.shipsForSelection.length - 1));
        var ship = this.shipsForSelection[index]
        if (!ship.isSelected) {
            ship.isSelected = true;
            return ship.name;
        } else {
            return this.getUnselectedShip();
        }
    }

    completeGameCallback() {
        var completeTimer = window.setTimeout(() => {
            window.clearTimeout(completeTimer);
            this.cameras.main.fade(2000, GameManager.instance.BACKGROUND_R, GameManager.instance.BACKGROUND_G, GameManager.instance.BACKGROUND_B);
            this.scene.start('EndScene');
        }, 3000);
    }
}