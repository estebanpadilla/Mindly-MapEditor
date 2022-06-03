import { Game, Scene } from 'phaser';
import { GameManager } from '../managers/gameManager';
import { Asteroid } from './objects/asteroid';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.clickSFX = null;
        this.menuMusicSFX = null;
        this.soundButton = null;
        this.musicButton = null;
    }

    preload() {
        this.load.audio('click', [
            'assets/sound/click.ogg',
            'assets/sound/click.mp3'
        ]);

        this.load.audio('menuMusic', [
            'assets/sound/music.ogg',
            'assets/sound/music.mp3'
        ]);

        this.load.image('spaceRaceLogo', 'assets/images/spaceRaceLogo.png');
        this.load.image('stars01', 'assets/images/stars01.png');
        this.load.image('stars02', 'assets/images/stars02.png');

        this.load.image('dogButton', 'assets/images/dogButton.png');
        this.load.image('chickenButton', 'assets/images/chickenButton.png');
        this.load.image('bulbyButton', 'assets/images/bulbyButton.png');
        this.load.image('dinosaurButton', 'assets/images/dinosaurButton.png');
        this.load.image('dogButtonSelected', 'assets/images/dogButtonSelected.png');
        this.load.image('chickenButtonSelected', 'assets/images/chickenButtonSelected.png');
        this.load.image('bulbyButtonSelected', 'assets/images/bulbyButtonSelected.png');
        this.load.image('dinosaurButtonSelected', 'assets/images/dinosaurButtonSelected.png');

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

        this.load.image('musicOn', 'assets/images/musicOn.png');
        this.load.image('musicOff', 'assets/images/musicOff.png');

        this.load.image('soundOn', 'assets/images/soundOn.png');
        this.load.image('soundOff', 'assets/images/soundOff.png');
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

        this.rect = Phaser.Geom.Rectangle.Clone(this.cameras.main);
        this.rect.width += 600;


        if (GameManager.instance.IS_DEBUG_BUILD) {
            this.mikeBtn = this.add.text(20, 20, 'MIKE SCENE', { backgroundColor: '#111', fontSize: 30, fixedWidth: btnWidth, align: 'center' });
            this.mikeBtn.setInteractive({ useHandCursor: true })
            this.mikeBtn.on('pointerdown', () => {
                this.scene.start('MikeScene');
            })

            this.mapEditorBtn = this.add.text(20, 60, 'MAP EDITOR', { backgroundColor: '#111', fontSize: 30, fixedWidth: btnWidth, align: 'center' });
            this.mapEditorBtn.setInteractive({ useHandCursor: true })
            this.mapEditorBtn.on('pointerdown', () => {

                this.scene.start('MapEditor');
            });
        }

        this.soundButton = this.add.sprite(40, GameManager.instance.screenHeight - 40, 'soundOn');
        this.musicButton = this.add.sprite(100, GameManager.instance.screenHeight - 40, 'musicOn');

        var logo = this.add.sprite(475, 200, 'spaceRaceLogo');
        var dogButton = this.add.sprite(120, 460, 'dogButton');
        var chickenButton = this.add.sprite(360, 460, 'chickenButton');
        var bulbyButton = this.add.sprite(580, 460, 'bulbyButton');
        var dinosaurButton = this.add.sprite(800, 460, 'dinosaurButton');

        this.soundButton.setInteractive({ useHandCursor: true });
        this.musicButton.setInteractive({ useHandCursor: true });

        this.soundButton.on('pointerdown', () => {
            GameManager.instance.toogleSound();
            this.updateSoundButton();
        });

        this.musicButton.on('pointerdown', () => {
            GameManager.instance.toogleMusic();
            this.updateMusicButton();
        });

        var playTimer = null;
        const BACKGROUND_R = GameManager.instance.BACKGROUND_R;
        const BACKGROUND_G = GameManager.instance.BACKGROUND_G;
        const BACKGROUND_B = GameManager.instance.BACKGROUND_B;

        dogButton.setInteractive({ useHandCursor: true });
        dogButton.on('pointerdown', () => {
            playTimer = window.setTimeout(() => {
                window.clearTimeout(playTimer);
                this.scene.start('PlayScene');
                this.cameras.main.fade(2000, BACKGROUND_R, BACKGROUND_G, BACKGROUND_B);
            }, 1000);
            GameManager.instance.selectedPlayer = 'dogShip';
            dogButton.setTexture('dogButtonSelected');
            dogButton.removeInteractive();
            chickenButton.removeInteractive();
            bulbyButton.removeInteractive();
            dinosaurButton.removeInteractive();

            this.playClickSFX();
        });

        chickenButton.setInteractive({ useHandCursor: true });
        chickenButton.on('pointerdown', () => {

            playTimer = window.setTimeout(() => {
                window.clearTimeout(playTimer);
                this.scene.start('PlayScene');
                this.cameras.main.fade(2000, BACKGROUND_R, BACKGROUND_G, BACKGROUND_B);
            }, 1000);
            GameManager.instance.selectedPlayer = 'chickenShip';
            chickenButton.setTexture('chickenButtonSelected');
            dogButton.removeInteractive();
            chickenButton.removeInteractive();
            bulbyButton.removeInteractive();
            dinosaurButton.removeInteractive();

            this.playClickSFX();
        });

        bulbyButton.setInteractive({ useHandCursor: true });
        bulbyButton.on('pointerdown', () => {

            playTimer = window.setTimeout(() => {
                window.clearTimeout(playTimer);
                this.scene.start('PlayScene');
                this.cameras.main.fade(2000, BACKGROUND_R, BACKGROUND_G, BACKGROUND_B);
            }, 1000);

            GameManager.instance.selectedPlayer = 'bulbShip';
            bulbyButton.setTexture('bulbyButtonSelected');
            dogButton.removeInteractive();
            chickenButton.removeInteractive();
            bulbyButton.removeInteractive();
            dinosaurButton.removeInteractive();

            this.playClickSFX();
        });

        dinosaurButton.setInteractive({ useHandCursor: true });
        dinosaurButton.on('pointerdown', () => {

            playTimer = window.setTimeout(() => {
                window.clearTimeout(playTimer);
                this.scene.start('PlayScene');
                this.cameras.main.fade(2000, BACKGROUND_R, BACKGROUND_G, BACKGROUND_B);
            }, 1000);

            GameManager.instance.selectedPlayer = 'dinoShip';
            dinosaurButton.setTexture('dinosaurButtonSelected');
            dogButton.removeInteractive();
            chickenButton.removeInteractive();
            bulbyButton.removeInteractive();
            dinosaurButton.removeInteractive();

            this.playClickSFX();
        });

        var instructions = this.add.text(((960 / 2) - 250), 580, 'CHOOSE YOUR RACER TO START', {
            strokeThickness: 10,
            stroke: '#3333cc',
            fontStyle: 'bold',
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#ffff00',
            fixedWidth: 500,
            align: 'center'
        });

        var version = this.add.text((GameManager.instance.screenWidth - 105), (GameManager.instance.screenHeight - 20), GameManager.instance.VERSION, {
            fontSize: '15px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fixedWidth: 100,
            align: 'right'
        });

        this.clickSFX = this.sound.add('click', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        if (this.menuMusicSFX === null) {
            this.menuMusicSFX = this.sound.add('menuMusic', {
                mute: false,
                volume: 0.5,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            });
        }

        this.updateSoundButton();
        this.updateMusicButton();
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

    playClickSFX() {
        if (GameManager.instance.isSoundOn) {
            this.clickSFX.play();
        }
    }

    updateSoundButton() {
        if (GameManager.instance.isSoundOn) {
            this.soundButton.setTexture('soundOn');
        } else {
            this.soundButton.setTexture('soundOff');
        }
    }

    updateMusicButton() {
        if (GameManager.instance.isMusicOn) {
            this.menuMusicSFX.play();
            this.musicButton.setTexture('musicOn');
        } else {
            this.menuMusicSFX.stop();
            this.musicButton.setTexture('musicOff');
        }
    }
}