
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Car } from './car.js'

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );


// Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);
// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0); // Light source at the center (Sun)
scene.add(pointLight);

//set background
scene.background = new THREE.Color(0xEEA733);

//loader
const car = new Car(scene,camera);

// Camera Position
camera.position.set(0, 0.5, 11.5);

// Animation
const animate = function () {
    requestAnimationFrame(animate);
    //car.updateCamera(); 
    car.update();
    renderer.render(scene, camera);
};

animate();
