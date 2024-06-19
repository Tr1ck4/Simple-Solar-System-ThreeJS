// ModelLoader.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ModelLoader {
    loadModel(path, onLoad, onError) {
        const loader = new GLTFLoader();

        loader.load(path, onLoad, undefined, (error) => {
            console.error(`Error loading model from ${path}:`, error);
            if (onError) onError(error);
        });
    }
}
