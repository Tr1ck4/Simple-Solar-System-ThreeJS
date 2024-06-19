import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

export class ModelLoader {
    constructor() {
        this.loader = new OBJLoader();
    }

    loadModel(path, onLoad, onError) {
        this.loader.load(
            path,
            function (obj) {
                onLoad(obj);
            },
            undefined,
            function (error) {
                onError(error);
            }
        );
    }
}
