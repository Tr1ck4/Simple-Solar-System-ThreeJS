import { ModelLoader } from './Loader.js';
import * as THREE from 'three';
export class Car {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.model = null;
        this.loader = new ModelLoader();
        this.velocity = new THREE.Vector3(0, 0, 0);
        this.acceleration = 0.01;
        this.maxSpeed = 0.1;
        this.friction = 0.98;
        this.turningSpeed = 0.03;
        this.direction = 0; // Angle in radians
        this.loadCarModel();
        this.initMovement();
    }

    loadCarModel() {
        this.loader.loadModel('../GT/GT.obj', (obj) => {
            this.model = obj;
            this.model.traverse((child) => {
                console.log(child.name)
                if (child.isMesh) {
                    //step window
                    if (child.name == 'part 000' || child.name == 'part 001'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //fly wing
                    if (child.name == 'part 002'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //glass
                    if (child.name == 'part 003'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //tire
                    if (child.name == 'part 028' || child.name == 'part 025' || child.name == 'part 026' || child.name == 'part 027'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xffff00 }); 
                    }
                    //headlight
                    if (child.name == 'part 014'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //capo
                    if (child.name == 'part 015'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //interior
                    if (child.name == 'part 011'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //door
                    if (child.name == 'part 012' || child.name == 'part 033'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //back front panel
                    if (child.name == 'part 013'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //brake
                    if (child.name == 'part 021' || child.name == 'part 022' || child.name == 'part 023' || child.name == 'part 024'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                    //roof + windshield
                    if (child.name == 'part 031'){
                        child.material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); 
                    }
                }
            });
            this.scene.add(this.model);
        }, (error) => {
            console.error(error);
        });
    }

    initMovement() {
        window.addEventListener('keydown', (event) => {
            if (this.model) {
                switch (event.key) {
                    case 'w':
                        this.velocity.z = Math.max(this.velocity.z - this.acceleration, -this.maxSpeed);
                        break;
                    case 's':
                        this.velocity.z = Math.min(this.velocity.z + this.acceleration, this.maxSpeed);
                        break;
                    case 'a':
                        this.direction += this.turningSpeed;
                        break;
                    case 'd':
                        this.direction -= this.turningSpeed;
                        break;
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (this.model) {
                switch (event.key) {
                    case 'w':
                    case 's':
                        this.velocity.z *= this.friction; // Apply friction when key is released
                        break;
                    case 'a':
                    case 'd':
                        // No friction for turning in this simple model
                        break;
                }
            }
        });
    }

    update() {
        if (this.model) {
            // Apply friction to the velocity
            this.velocity.multiplyScalar(this.friction);

            // Update the car's position based on its velocity and direction
            const forward = new THREE.Vector3(Math.sin(this.direction), 0, Math.cos(this.direction));
            this.model.position.add(forward.multiplyScalar(this.velocity.z));

            // Rotate the car model
            this.model.rotation.y = this.direction;

            // Update the camera
            //this.updateCamera();
        }
    }

    updateCamera() {
        if (this.model) {
            const offset = new THREE.Vector3(0, 5, 10); // Adjust the offset as needed
            const carPosition = this.model.position.clone();
            this.camera.position.copy(carPosition.add(offset));
            this.camera.lookAt(this.model.position);
        }
    }
}
