import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Room2 {
    constructor(scene, roomPath) {
        this.scene = scene;
        this.objects = [];
        this.loader = new GLTFLoader();
        this.roomPath = roomPath;
        this.controls = null;
    }

    loadRoomModel(onLoad, onError) {
        this.loader.load(
            this.roomPath,
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(150,150,150);
                this.model.position.set(6,206,-276);
                this.model.rotateY(44);
                this.scene.add(this.model);
                this.extractObjects();
                if (onLoad) onLoad(this.model);
            },
            undefined,
            (error) => {
                console.error(`Error loading room model from ${this.roomPath}:`, error);
                if (onError) onError(error);
            }
        );
    }

    extractObjects() {
        this.model.traverse((child) => {
            if (child.isMesh) {
                this.objects.push(child);
            }
        });
    }
}
