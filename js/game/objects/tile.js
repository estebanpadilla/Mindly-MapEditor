export class Tile {
    constructor(scene, data, callback) {
        this.scene = scene;
        this.data = data;
        this.callback = callback;
        // this.scene.textures.generate('tile', { data: ['E'], pixelWidth: 20 });
        this.image = this.scene.add.image(this.data.xpos, this.data.ypos, 'tile').setOrigin(0, 0);
        this.image.setInteractive();
        // this.image.setDepth(1);
        this.image.on('pointerdown', this.clickOnTile.bind(this));

        this.scene.add.text(this.data.xpos, this.data.ypos, ('x:' + (this.data.x)), { color: 'red', fontSize: 12 });
        this.scene.add.text(this.data.xpos, (this.data.ypos + 10), ('y:' + (this.data.y)), { color: 'black', fontSize: 12 });

        if (this.data.value === 0) {
            this.image.setTint(0xffffff);
        } else if (this.data.value === 1) {
            this.image.setTint(0xCCCCCC);
        } else if (this.data.value === 2) {
            this.image.setTint(0xff0000);
        }
    }

    clickOnTile(tile, value) {
        this.callback(this);
    }

    updateColor() {
        if (this.data.value === 1) {
            // this.data.value = 1;
            this.image.setTint(0xCCCCCC);
        } else if (this.data.value === 2) {
            // this.data.value = 2;
            this.image.setTint(0xff0000);
        } else {
            // this.data.value = 0;
            this.image.setTint(0xffffff);
        }
    }
}