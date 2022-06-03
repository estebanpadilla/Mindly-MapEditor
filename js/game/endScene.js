import { Scene } from 'phaser';
import { GameManager } from '../managers/gameManager';

export class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }

    preload() {
        this.load.image('spaceRaceLogo', 'assets/images/spaceRaceLogo.png');

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
    }

    create() {

        let btnWidth = 200;
        this.cameras.main.fadeFrom(2000, GameManager.instance.BACKGROUND_R, GameManager.instance.BACKGROUND_G, GameManager.instance.BACKGROUND_B);
        this.shapesL0 = new Array(10).fill(null).map(
            () => {
                return GameManager.instance.createRamdonStar(this)
            }
        );

        this.shapesL1 = new Array(5).fill(null).map(
            () => {
                return GameManager.instance.createRamdonAsteroidBGS(this);
            }
        );

        this.shapesL2 = new Array(10).fill(null).map(
            () => {
                return GameManager.instance.createRamdonAsteroidBGM(this);
            }
        );

        this.add.sprite(475, 200, 'spaceRaceLogo');

        this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
        this.rect.width += 600;
        var style = {
            strokeThickness: 8,
            stroke: '#54ffd4',
            fontStyle: 'bold',
            fontSize: '60px',
            fontFamily: 'Arial',
            color: '#ff7c54',
            align: 'center'
        };

        this.restartBtn = this.add.text(350, 410, 'RESTART', style);

        this.restartBtn.setInteractive({ useHandCursor: true })
        this.restartBtn.on('pointerdown', () => {
            this.cameras.main.fade(2000, GameManager.instance.BACKGROUND_R, GameManager.instance.BACKGROUND_G, GameManager.instance.BACKGROUND_B);
            GameManager.instance.restart();
            this.scene.start('PlayScene');
        })

        this.menuBtn = this.add.text(400, 500, 'MENU', style);

        this.menuBtn.setInteractive({ useHandCursor: true })
        this.menuBtn.on('pointerdown', () => {
            this.cameras.main.fade(2000, GameManager.instance.BACKGROUND_R, GameManager.instance.BACKGROUND_G, GameManager.instance.BACKGROUND_B);
            this.scene.start('MenuScene');
        });
    }

    update() {
        this.shapesL1.forEach(function (shape, i) {
            shape.x -= (1 + 0.1 * i);
        });

        this.shapesL2.forEach(function (shape, i) {
            shape.x -= (1 + 0.3 * i);
        });

        Phaser.Actions.WrapInRectangle(this.shapesL0, this.rect, 200);
        Phaser.Actions.WrapInRectangle(this.shapesL1, this.rect, 200);
        Phaser.Actions.WrapInRectangle(this.shapesL2, this.rect, 200);
    }

    render() {

    }
}