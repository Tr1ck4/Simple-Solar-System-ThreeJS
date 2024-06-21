import * as THREE from 'three';

export class Tile {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.model = null;
        this.mesh = null;
        this.boundingBox = null;
        this.direction = new THREE.Vector3();
        this.init();
    }

    init() {
        this.model = new THREE.BoxGeometry(0.2, 0.2, 0.5);
        let material = new THREE.MeshBasicMaterial({ color: 'red' });
        this.mesh = new THREE.Mesh(this.model, material);
        const vector = new THREE.Vector3(0, 0, -5).applyMatrix4(this.camera.matrixWorld);
        this.mesh.position.set(vector.x, vector.y, vector.z);


        this.mesh.quaternion.copy(this.camera.quaternion);
        this.scene.add(this.mesh);
        this.boundingBox = new THREE.Box3().setFromObject(this.mesh);
    }

    update() {
        if (!this.mesh) return; 

        if (this.mesh.position.z < -10) {
            this.destroy();
        } else {
            this.mesh.position.z -= 0.1;
            this.boundingBox.setFromObject(this.mesh);
        }
    }

    destroy() {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.mesh.geometry.dispose();
            this.mesh.material.dispose();
            this.mesh = null;
        }
        this.boundingBox = null;
    }
}
