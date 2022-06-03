import { Scene } from "phaser";

export class WaveScene extends Phaser.Scene {
    constructor(){
        super("WaveScene");
    }

    preload() {
        this.load.atlas('dog', 'assets/animations/dog/dog.png', 'assets/animations/dog/dog.json')
        this.load.atlas('mike', 'assets/animations/mike/dog.png', 'assets/animations/mike/dog.json')
    }

    create() {
        // debugger;
        var dog = this.add.sprite(400, 300, 'dog');
        var framesData = this.textures.get('dog');

        var wave = {
            key: 'wave',
            frames: [],
            frameRate: 30,
            repeat: -1
        };

        var frameName = '';
        for (let i = 1; i < 60; i++) {

            if (i <= 9) {
                frameName = `dog000${i}.png`
            } else {
                frameName = `dog00${i}.png`
            }

            var frame = {
                key: 'dog',
                frame: frameName
            }

            wave.frames.push(frame);
        }

        this.anims.create(wave);

        dog.play('wave');
    }
}