export class NetManager {
    constructor(gm, dm) {
        this.gm = gm;
        this.dm = dm;
        this.url = 'https://mindlyracergame-default-rtdb.firebaseio.com/data';
    }

    loadInitialData(callback) {
        fetch('../data/data.json')
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => {
                console.error(error);
            });
    }

    loadLevelsData(callback, key) {
        fetch('../data/levels.json')
            .then((response) => response.json())
            .then((data) => callback(data))
            .catch((error) => {
                console.error(error);
            });
    }

    downloadMapByKey(key, callback) {
        let request = new XMLHttpRequest();
        request.open('GET', this.url + '/' + key + '.json');
        request.onreadystatechange = (e) => {
            if (e.target.readyState === 4) {
                var data = e.target.responseText;
                var map = JSON.parse(data);
                callback(map);
            }
        }
        request.send();
    }
}