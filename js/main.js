import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Enemy } from './Enemy.js'
import { Tile } from './ProjectTile.js'

let scene, camera, renderer, controls;
let tile,enemy1;
let enemy = [];

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    const helper  = new THREE.CameraHelper(camera);
    scene.add(helper);
    camera.position.z = 5;
    camera.position.y = 2;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    for (let i = 0; i < 20; i++) {
        const e = new Enemy(scene, camera, renderer.domElement);
        e.mesh.position.x = (Math.random() - 0.5) * 10;
        e.mesh.position.y = (Math.random() - 0.5) * 10;
        e.mesh.position.z = (Math.random() - 0.5) * 10;
        enemy.push(tile);
    }

    enemy1 = new Enemy( scene, camera, renderer.domElement);
    tile = new Tile( scene, camera, renderer.domElement);

    //lighting
    const direct_light = new THREE.DirectionalLight(0xffff00,2);
    const ambient_light = new THREE.AmbientLight(0xffffff,3)
    scene.add(direct_light,ambient_light);

    // Resize event
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    tile.update();
    enemy1.update(tile.boundingBox);
    renderer.render(scene, camera);
}


