export class DataManager {
    constructor(gm) {
        this.gm = gm;
        this.map = null;
        this.levels = null;
        this.currentLevel = 0;
        this.currentQuestion = 0;
    }

    receivedMapData(map) {
        console.log(map);
        this.map = map;
        this.gm.netManager.loadLevelsData(this.receivedLevelsData.bind(this), this.map.key);
    }

    //Remove later
    receivedInitialData(data) {
        // this.data = data;
        // this.gm.netManager.loadLevelsData(this.receivedLevelsData.bind(this));
    }

    //Remove later
    receivedLevelsData(data) {

        data.data.levels.forEach(level => {
            if (level.map === this.map.key) {
                console.log(level);
                this.levels = [level]
            }
        });

        // this.levels = data.data.levels;
        // console.log(this.levels);
        this.gm.createGame();
    }

    getLevelByName(name) {
        for (let i = 0; i < this.levels.length; i++) {
            const level = this.levels[i];
            if (level.name === name) {
                return level;
            }
        }
        return null;
    }

    getCurrentQuestion() {
        return this.levels[this.currentLevel].questions[this.currentQuestion];
    }

    getNextLevel() {
        // this.currentLevel++;
        // return this.levels[this.currentLevel];
    }

    playerAnsweredCorrectly() {
        this.currentQuestion++;
    }

    checkAnswer(value) {
        if (this.levels[this.currentLevel].questions[this.currentQuestion].correctAnswer === value) {
            return true;
        }

        return false;
    }

    restart() {
        this.currentLevel = 0;
        this.currentQuestion = 0;
    }
}