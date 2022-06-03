import { Scene } from "phaser";

export class MikeScene extends Phaser.Scene {
    constructor() {
        super('MikeScene');
        this.mike = null;
    }

    preload() {
        this.load.atlas('mike', 'assets/animations/mike/dog.png', 'assets/animations/mike/dog.json');
    }

    create() {
        // debugger;
        this.mike = this.add.sprite(300, 300, 'mike');
        var framesData = this.textures.get('mike');

        var wave = {
            key: 'wave',
            frames: [],
            frameRate: 30,
            repeat: 0
        };
        var frameName = '';

        for (let i = 1; i < 60; i++) {

            if (i <= 9) {
                frameName = `dog000${i}`
            } else {
                frameName = `dog00${i}`
            }

            var frame = {
                key: 'mike',
                frame: frameName
            }

            wave.frames.push(frame);
        }

        var idle = {
            key: 'idle',
            frames: [],
            frameRate: 30,
            repeat: 0
        };

        for (let i = 62; i <= 98; i++) {

            if (i <= 9) {
                frameName = `dog000${i}`
            } else {
                frameName = `dog00${i}`
            }

            var frame = {
                key: 'mike',
                frame: frameName
            }

            idle.frames.push(frame);
        }

        var jump = {
            key: 'jump',
            frames: [],
            frameRate: 30,
            repeat: 0
        };

        for (let i = 99; i <= 126; i++) {

            if (i < 100) {
                frameName = `dog00${i}`
            } else {
                frameName = `dog0${i}`
            }

            var frame = {
                key: 'mike',
                frame: frameName
            }

            jump.frames.push(frame);
        }

        this.anims.create(wave);
        this.anims.create(idle);
        this.anims.create(jump);
        this.mike.play('idle');

        this.idleBtn = this.add.text(20, 20, 'IDLE', { backgroundColor: '#111', fontSize: 30, fixedWidth: 150, align: 'center' });
        this.idleBtn.setInteractive({ useHandCursor: true })
        this.idleBtn.on('pointerdown', () => {
            this.mike.play('idle');
        })

        this.jumpBtn = this.add.text(20, 60, 'JUMP', { backgroundColor: '#111', fontSize: 30, fixedWidth: 150, align: 'center' });
        this.jumpBtn.setInteractive({ useHandCursor: true })
        this.jumpBtn.on('pointerdown', () => {
            this.mike.play('jump');
        });

        this.waveBtn = this.add.text(20, 100, 'WAVE', { backgroundColor: '#111', fontSize: 30, fixedWidth: 150, align: 'center' });
        this.waveBtn.setInteractive({ useHandCursor: true });
        this.waveBtn.on('pointerdown', () => {
            this.mike.play('wave');
        });

        this.backBtn = this.add.text(20, 140, 'BACK', { backgroundColor: '#111', fontSize: 30, fixedWidth: 150, align: 'center' });
        this.backBtn.setInteractive({ useHandCursor: true });
        this.backBtn.on('pointerdown', () => {
            this.scene.start("MenuScene");
        });
    }
}