import { GameManager } from '../managers/gameManager';
import { EasyStar } from '../libs/easystar-0.4.3';

export class PathManager {
    constructor(gm) {
        this.gm = gm;
        this.easystar = new EasyStar.js();
        this.worldWidth = 0;
        this.worldHeight = 0;
        this.tileSize = 80;

        // this.grid = [
        //     [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        //     [0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
        //     [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        //     [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
        //     [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1]
        // ];

        // console.log('Path cols:', this.grid[0].length);

        // this.easystar.setGrid(this.grid);
        // this.easystar.setAcceptableTiles([0]);
        // this.easystar.enableDiagonals();
        // this.easystar.enableCornerCutting();
    }

    start() {
        // console.log('PathManager', this.gm.dataManager.map);
        this.grid = this.gm.dataManager.map.grid;
        this.worldHeight = this.grid.length * this.tileSize;
        this.worldWidth = this.grid[0].length * this.tileSize;

        // console.log('Path cols:', this.grid[0].length);
        this.easystar.setGrid(this.grid);
        this.easystar.setAcceptableTiles([0]);
        this.easystar.enableDiagonals();
        this.easystar.enableCornerCutting();
    }

    findPath(startPosition, endPosition, callback) {
        this.easystar.findPath(startPosition.x, startPosition.y, endPosition.x, endPosition.y, (path) => {
            if (path === null) {
                console.log("Path was not found.");
            } else {
                // this.path = path;
                callback(path);
                // this.moveShip(path);
                // this.createGridPath();
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
            }
        });

        this.easystar.calculate();
    }
}