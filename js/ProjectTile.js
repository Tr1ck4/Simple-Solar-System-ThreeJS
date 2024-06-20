import * as THREE from 'three';

export class Tile {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.model = null;
        this.mesh = null;
        this.boundingBox = null;
        this.init();
    }

    init() {
        this.model = new THREE.BoxGeometry(0.2, 0.2, 0.5);
        let material = new THREE.MeshBasicMaterial({ color: 'red' });
        this.mesh = new THREE.Mesh(this.model, material);
        this.mesh.position.set(0, 0, 5);
        this.scene.add(this.mesh);
        this.boundingBox = new THREE.Box3().setFromObject(this.mesh);
    }

    update() {
        if (!this.mesh) return; // Return early if the mesh is null

        if (this.mesh.position.z < -10) {
            this.destroy();
        } else {
            this.mesh.position.z -= 0.1;
            this.boundingBox.setFromObject(this.mesh); // Update the bounding box
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
