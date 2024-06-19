import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class Room1 {
    constructor(scene, roomPath) {
        this.scene = scene;
        this.objects = [];
        this.loader = new GLTFLoader();
        this.roomPath = roomPath;
    }

    loadRoomModel(onLoad, onError) {
        this.loader.load(
            this.roomPath,
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(30,30,30);
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


    // animate(){
    //     this.objects.forEach((child) => {
    //         if (child.name == 'Object_7'){
    //             let value = 0;
    //             while (value < 0.1){
    //                 child.rotation.y += 0.01;
    //                 value += 0.01;
    //                 console.log(value);
    //             }
    //             if (value >= 0.1){
    //                 return;
    //             }
    //         }
    //     })
    // }
    
}
