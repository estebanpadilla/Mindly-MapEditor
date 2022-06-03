import { DataManager } from './dataManager';
import { NetManager } from './netManager';
import { PathManager } from './pathManager';
import { Stats } from '../libs/stats';
import { div } from '../libs/html';
import Phaser from 'phaser';
import { MenuScene } from '../game/menuScene';
import { PlayScene } from '../game/playScene';
import { MikeScene } from '../game/mikeScene';
import { MapEditor } from '../game/mapEditor';
import { EndScene } from '../game/endScene';

export class GameManager {
    constructor() {
        if (GameManager.instance) {
            return GameManager.instance;
            // throw new Error("Singleton classes can't be instantiated more than once.")
        } else {
            GameManager.instance = this;
        }
        // ... your rest of the constructor code goes after this
        this.dataManager = new DataManager(this);
        this.netManager = new NetManager(this, this.dataManager);
        this.pathManager = new PathManager(this);
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;

        // this.netManager.loadInitialData(
        //     this.dataManager.receivedInitialData.bind(this.dataManager)
        // );
        // this.mapKey = '-McXBn0jztsv1bwyVW-j';
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.mapKey = urlParams.get('mapKey')
        // this.mapKey = '-McXJCcdy9Nj0KEGIzgn';//1 question map
        // this.mapKey = '-MiK3X8vFFBWeXjvCKwK';

        this.netManager.downloadMapByKey(this.mapKey, this.dataManager.receivedMapData.bind(this.dataManager));

        this.gameContainer = div({ 'className': 'gameManager_gameContainer' }, document.body);

        this.isSoundOn = true;
        this.isMusicOn = true;
        this.selectedPlayer = '';
        this.IS_DEBUG_BUILD = true;
        this.VERSION = 'v 0.0.5';
        this.BACKGROUND_R = 2;
        this.BACKGROUND_G = 7;
        this.BACKGROUND_B = 52;
        this.BACKGROUND_HEX = '#020734';

        if (localStorage.getItem('isSoundOn')) {
            var value = localStorage.getItem('isSoundOn')
            this.isSoundOn = (value === 'true');
        }

        if (localStorage.getItem('isMusicOn')) {
            var value = localStorage.getItem('isMusicOn')
            this.isMusicOn = (value === 'true');
        }
    }

    toogleMusic() {
        this.isMusicOn = !this.isMusicOn;
        localStorage.setItem('isMusicOn', this.isMusicOn);
    }

    toogleSound() {
        this.isSoundOn = !this.isSoundOn;
        localStorage.setItem('isSoundOn', this.isSoundOn);
    }

    createGame() {

        this.pathManager.start();

        var config = {
            type: Phaser.AUTO,
            width: this.screenWidth,
            height: this.screenHeight,
            backgroundColor: this.BACKGROUND_HEX,
            // physics: {
            //     default: 'arcade',
            //     arcade: {
            //         gravity: { y: 200 }
            //     }
            // },
            // scene: [MapEditor],
            scene: [MapEditor],
            parent: this.gameContainer,
            scale: {
                // Or set parent divId here
                // parent: this.gameContainer,
                mode: Phaser.Scale.NONE,
                autoCenter: Phaser.Scale.NO_CENTER,
                // Or put game size here
                // width: 1024,
                // height: 768,

                // Minimum size
                min: {
                    width: this.screenWidth,
                    height: this.screenHeight,
                },
                // Or set minimum size like these
                // minWidth: 800,
                // minHeight: 600,

                // Maximum size
                max: {
                    width: this.screenWidth,
                    height: this.screenHeight,
                },
                // Or set maximum size like these
                // maxWidth: 1600,
                // maxHeight: 1200,

                zoom: 1,  // Size of game canvas = game size * zoom
            }
        };

        if (this.IS_DEBUG_BUILD) {
            this.stats = new Stats();
            this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            this.gameContainer.appendChild(this.stats.dom);
        }

        this.game = new Phaser.Game(config);
        this.game.domContainer = this.gameContainer;

        if (this.IS_DEBUG_BUILD) {
            this.game.events.on('step', (time, delta) => {
                this.stats.begin();
            });

            this.game.events.on('poststep', (time, delta) => {
                this.stats.end();
            });
        }
    }

    clickOnAnswer(answerId) {
        if (this.dataManager.checkAnswer(answerId)) {
            this.game.scene.scenes[2].continueAfterAsnweringQuestion(answerId);
            this.dataManager.playerAnsweredCorrectly();
        } else {
            this.game.scene.scenes[2].clickOnWrongAnswer();
        }
    }

    getCurrentQuestion() {
        let question = this.dataManager.getCurrentQuestion();
        return question;
    }

    restart() {
        this.dataManager.restart();
    }

    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }

    createRamdonStar(scene) {
        return scene.add.sprite(Phaser.Math.Between(0, this.screenWidth), Phaser.Math.Between(0, this.screenHeight), this.getRamdonStar());
    }

    createRamdonAsteroidBGS(scene) {
        return scene.add.sprite(Phaser.Math.Between(0, this.screenWidth), Phaser.Math.Between(0, this.screenHeight), this.getRamdonAsteroidBGS());
    }

    createRamdonAsteroidBGM(scene) {
        return scene.add.sprite(Phaser.Math.Between(0, this.screenWidth), Phaser.Math.Between(0, this.screenHeight), this.getRamdonAsteroidBGM());
    }

    getRamdonAsteroidBGS() {
        var value = Phaser.Math.Between(1, 5);
        switch (value) {
            case 1:
                return "asteroidBGS1";
            case 2:
                return "asteroidBGS2";
            case 3:
                return "asteroidBGS3";
            case 4:
                return "asteroidBGS4";
            case 5:
                return "asteroidBGS5";
        }
    }

    getRamdonAsteroidBGM() {
        var value = Phaser.Math.Between(1, 5);
        switch (value) {
            case 1:
                return "asteroidBGM1";
            case 2:
                return "asteroidBGM2";
            case 3:
                return "asteroidBGM3";
            case 4:
                return "asteroidBGM4";
            case 5:
                return "asteroidBGM5";
        }
    }

    getRamdonStar() {
        var value = Phaser.Math.Between(1, 4);
        switch (value) {
            case 1:
                return "stars01";
            case 2:
                return "stars02";
            case 3:
                return "stars03";
            case 4:
                return "stars04";
        }
    }
}