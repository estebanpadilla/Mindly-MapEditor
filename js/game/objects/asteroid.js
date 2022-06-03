import { GameManager } from "../../managers/gameManager";

export class Asteroid {
    constructor(name, scene, type, position, tileSize, startPosition, answerId) {
        this.name = name;
        this.scene = scene;
        this.tileSize = tileSize;
        this.startPosition = startPosition;
        this.answerId = answerId;
        var pixelWidth = 5;
        var pixelHeight = 5;
        var shape = null;
        this.endPosition = null;
        this.tileCounter = this.startPosition.x;
        this.isStarted = false;
        this.isWaitingToAnswer = false;
        this.complete = false;

        this.idle = `idle_${this.name}`;
        this.exploting = `exploting_${this.name}`;

        this.image = this.scene.add.sprite(380, 317, this.name);
        var framesData = this.scene.textures.get(this.name);

        var frameName = '';
        var idleAnimation = {
            key: this.idle,
            frames: [],
            frameRate: 15,
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

        var explotingAnimation = {
            key: this.exploting,
            frames: [],
            frameRate: 15,
            repeat: 0
        };

        for (let i = 10; i <= 17; i++) {
            frameName = `${this.name}00${i}.png`
            var frame = {
                key: this.name,
                frame: frameName
            }
            explotingAnimation.frames.push(frame);
        }

        this.scene.anims.create(idleAnimation);
        this.scene.anims.create(explotingAnimation);
        this.image.play(this.idle);
        this.image.setInteractive();
        this.image.setDepth(1);

        this.image.on('pointerdown', () => {
            GameManager.instance.clickOnAnswer(this.answerId);
        })

        this.image.on('animationcomplete', (anim, frame) => {
            if (anim.key === this.exploting) {
                this.image.play(this.idle);
                this.image.visible = false;
            }
        }, this);

        this.text = this.scene.add.text(Math.floor(this.image.x + 10), Math.floor(this.image.y + 10), '', {
            strokeThickness: 10,
            stroke: 'red',
            fontStyle: 'bold',
            fontSize: '80px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            shadow: { color: '#484848', blur: 5, offsetX: 2, offsetY: 2, stroke: true }
        });

        this.text.setDepth(2);
        this.text.setOrigin(0.5);
        this.images = [];
    }

    //Pass the tile position to update it's image
    updatePositionByTile(x, y) {
        this.text.setText('');
        this.text.visible = true;
        this.image.x = x * this.tileSize;
        this.image.y = y * this.tileSize;
        this.text.x = Math.floor(this.image.x + 10);
        this.text.y = Math.floor(this.image.y + 5);
    }

    updateText(type, value) {
        switch (type) {
            case 'text':
                this.text.visible = true;
                this.text.setText(value);
                break;
            case 'images':
                this.text.visible = false;
                this.addImages(value.image, value.quantity);
                break;
            default:
                break;
        }
    }

    playExplotion() {
        this.image.play(this.exploting);
        this.text.visible = false;
        this.cleanImages();
    }

    addImages(imageName, quantity) {
        if (quantity === 1) {
            var position = { x: this.getXposStartPosition(quantity), y: Math.floor(this.image.y + 5) };
            var scale = { scaleX: 0.25, scaleY: 0.25 }
            this.addSingleImage(imageName, position, scale);
        } else if (quantity > 1 && quantity < 6) {
            this.addR1Images(imageName, quantity);
        } else if (quantity > 5 && quantity < 11) {
            this.addR1R2Images(imageName, 5, quantity - 5)
        } else if (quantity > 10 && quantity < 16) {
            this.addR1R2R3Images(imageName, 5, 5, quantity - 10);
        } else {
            console.log('addR1R2R3R4Images');
            this.addR1R2R3R4Images(imageName, 5, 5, 5, quantity - 15);
        }
    }

    addSingleImage(imageName, position, scale) {
        var img = this.scene.add.sprite(position.x, position.y, imageName);
        img.setOrigin(0.5);
        img.setDepth(2);
        img.scaleX = scale.scaleX;
        img.scaleY = scale.scaleY;
        img.visible = true;
        this.images.push(img);
    }

    addR1Images(imageName, quantity) {
        var position = { x: this.getXposStartPosition(quantity), y: this.getYposForRowPosition(1) };
        var scale = { scaleX: 0.1, scaleY: 0.1 }

        for (let i = 0; i < quantity; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }
    }

    addR1R2Images(imageName, quantity1, quantity2) {
        var ypos = this.getYposForRowPosition(2);
        var position = { x: this.getXposStartPosition(quantity1), y: ypos.y1 };
        var scale = { scaleX: 0.1, scaleY: 0.1 };

        for (let i = 0; i < quantity1; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }

        position = { x: this.getXposStartPosition(quantity2), y: ypos.y2 };
        for (let i = 0; i < quantity2; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }
    }

    addR1R2R3Images(imageName, quantity1, quantity2, quantity3) {
        var ypos = this.getYposForRowPosition(3);
        var position = { x: this.getXposStartPosition(quantity1), y: ypos.y1 };
        var scale = { scaleX: 0.1, scaleY: 0.1 };

        for (let i = 0; i < quantity1; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }

        position = { x: this.getXposStartPosition(quantity2), y: ypos.y2 };
        for (let i = 0; i < quantity2; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }

        position = { x: this.getXposStartPosition(quantity3), y: ypos.y3 };
        for (let i = 0; i < quantity3; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }
    }

    addR1R2R3R4Images(imageName, quantity1, quantity2, quantity3, quantity4) {
        var ypos = this.getYposForRowPosition(4);
        var position = { x: this.getXposStartPosition(quantity1), y: ypos.y1 };
        var scale = { scaleX: 0.1, scaleY: 0.1 };

        for (let i = 0; i < quantity1; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }

        position = { x: this.getXposStartPosition(quantity2), y: ypos.y2 };
        for (let i = 0; i < quantity2; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }

        position = { x: this.getXposStartPosition(quantity3), y: ypos.y3 };
        for (let i = 0; i < quantity3; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }

        position = { x: this.getXposStartPosition(quantity4), y: ypos.y4 };
        for (let i = 0; i < quantity4; i++) {
            this.addSingleImage(imageName, position, scale);
            position.x += 45;
        }
    }

    getXposStartPosition(quantity) {
        switch (quantity) {
            case 1:
                return Math.floor(this.image.x + 15);
            case 2:
                return Math.floor(this.image.x - 10);
            case 3:
                return Math.floor(this.image.x - 25);
            case 4:
                return Math.floor(this.image.x - 50);
            case 5:
                return Math.floor(this.image.x - 75);
        }
    }

    getYposForRowPosition(row) {
        switch (row) {
            case 1:
                return Math.floor(this.image.y);
            case 2:
                return { y1: Math.floor(this.image.y - 20), y2: Math.floor(this.image.y + 25) };
            case 3:
                return { y1: Math.floor(this.image.y - 55), y2: Math.floor(this.image.y - 5), y3: Math.floor(this.image.y + 45) };
            case 4:
                return { y1: Math.floor(this.image.y - 70), y2: Math.floor(this.image.y - 25), y3: Math.floor(this.image.y + 20), y4: Math.floor(this.image.y + 65) };
        }
    }

    getSingleImagePosition() {
        return { x: Math.floor(this.image.x + 10), y: Math.floor(this.image.y + 5) }
    }

    cleanImages() {
        this.images.forEach(img => {
            img.destroy();
        })
        this.images = [];
    }
}