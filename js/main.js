import * as THREE from 'three';
import { Enemy } from './Enemy.js'
import { Tile } from './ProjectTile.js'

let scene, camera, renderer;
let counter = 0,level =0;
let enemy = [];
let pitch = 0;
let yaw = 0;
let shoot = [];

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    const helper  = new THREE.CameraHelper(camera);
    scene.add(helper);
    camera.position.set(0,0,10);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const direct_light = new THREE.DirectionalLight(0xffff00,2);
    const ambient_light = new THREE.AmbientLight(0xffffff,3)
    scene.add(direct_light,ambient_light);

    window.addEventListener('resize', onWindowResize, false);
}

function generate(){
    for (let i = 0; i < 10; i++) {
        const e = new Enemy(scene, camera, renderer.domElement);
        e.mesh.position.x = (Math.random() - 0.5) * 5;
        e.mesh.position.y = (Math.random() - 0.5) * 5;
        e.mesh.position.z = (Math.random() - 0.5) * 5;
        enemy.push(e);
    }
}

function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

document.addEventListener('click', () => {
  document.body.requestPointerLock();
}, false);

document.addEventListener('click', (event) => {
    if (document.pointerLockElement === document.body) {
        const tile = new Tile( scene, camera, renderer.domElement);
        shoot.push(tile);
    }
}, false);


document.addEventListener('mousemove', (event) => {
  if (document.pointerLockElement === document.body) {
    const sensitivity = 0.002;
    yaw -= event.movementX * sensitivity;
    pitch -= event.movementY * sensitivity;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  }
}, false);

function updateTextDisplay() {
    const counterElement = document.getElementById('counterValue');
    const levelElement = document.getElementById('levelValue');
  
    counterElement.textContent = counter.toString();
    levelElement.textContent = level.toString();
}


function animate() {
    requestAnimationFrame(animate);
    shoot.forEach((item => item.update()));
    enemy.forEach((item, index) => {
    if (item.isHit) {
        counter +=100;
        updateTextDisplay();
        enemy.splice(index, 1);
    } else {
        shoot.forEach((shooter) => {
            item.update(shooter.boundingBox);
        });
    }
});
    if (enemy.length < 1){
        level +=1;
        updateTextDisplay();
        generate();
    }
    camera.rotation.set(pitch, yaw, 0);
    renderer.render(scene, camera);
}


