import * as THREE from 'three';

export class Enemy {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.model = null;
        this.mesh = null;
        this.boundingBox = null;
        this.isHit = false;
        this.init();
    }

    init() {
        this.model = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ color: 'green' });
        this.mesh = new THREE.Mesh(this.model, material);
        this.scene.add(this.mesh);
        this.boundingBox = new THREE.Box3().setFromObject(this.mesh);
    }

    update(tileBoundingBox) {
        if (this.mesh && this.boundingBox) {
            if (tileBoundingBox && this.boundingBox.intersectsBox(tileBoundingBox)) {
                this.scene.remove(this.mesh);
                this.mesh = null;
                this.boundingBox = null;
                return;
            }
            if (this.isHit) {
                this.scene.remove(this.mesh);
                this.mesh = null;
                this.boundingBox = null;
                return;
            }
            this.boundingBox.setFromObject(this.mesh); // Update the bounding box
        }
    }

    hit() {
        this.isHit = true;
    }
}
