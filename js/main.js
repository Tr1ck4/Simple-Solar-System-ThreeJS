import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Room1 } from './Room1.js';
import { Room2 } from './Room2.js';

let scene, camera, renderer, room1, room2, controls;
let initialRotation1, initialPosition1;
let initialRotation2, initialPosition2;
let counter = 0;

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    
    camera.position.set(300, 300, 300);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls( camera, renderer.domElement );

    controls.update();

    // Room setup
    room1 = new Room1(scene, '../Object/room.glb', camera, renderer);
    room2 = new Room2(scene, '../Object/cafe.glb');

    // Load room models and initialize DragControls
    room1.loadRoomModel(() => {
        console.log('Room 1 loaded');
    });

    room2.loadRoomModel(() => {
        console.log('Room 2 loaded');
    });

    //lighting
    const direct_light = new THREE.DirectionalLight(0xffff00,2);
    const ambient_light = new THREE.AmbientLight(0xffffff,3)
    scene.add(direct_light,ambient_light);

    // Resize event
    window.addEventListener('resize', onWindowResize, false);

    const moveButton = document.getElementById('moveButton');
    moveButton.addEventListener('click',()=>{
        if (counter ==0){
            movetoLevel1();
            counter +=1;
        }
    });
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
    // room1.animate();
    renderer.render(scene, camera);
}

function rotateModelSmoothly(targetRotation,target) {
    const startRotation = target.model.rotation.y;
    const duration = 1000; // Duration in milliseconds

    let startTime = null;

    function updateRotation(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp between 0 and 1

        target.model.rotation.y = THREE.MathUtils.lerp(startRotation, targetRotation, progress);

        if (progress < 1) {
            requestAnimationFrame(updateRotation);
        }
    }

    requestAnimationFrame(updateRotation);
}

function shiftSmoothly(targetRotation, targetPosition, target) {
    const startRotation = target.model.rotation.y;
    const startPosition = target.model.position.clone();
    const duration = 1000; // Duration in milliseconds

    let startTime = null;

    function updateTransformation(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp between 0 and 1

        // Interpolate rotation
        target.model.rotation.y = THREE.MathUtils.lerp(startRotation, targetRotation, progress);

        // Interpolate position
        const newPosition = new THREE.Vector3();
        newPosition.lerpVectors(startPosition, targetPosition, progress);
        target.model.position.copy(newPosition);

        if (progress < 1) {
            requestAnimationFrame(updateTransformation);
        }
    }

    requestAnimationFrame(updateTransformation);
}



function movetoLevel1() {
    initialRotation1 = room1.model.rotation.y;
    initialPosition1 = room1.model.position.clone();
    initialRotation2 = room2.model.rotation.y;
    initialPosition2 = room2.model.position.clone();
    const targetPosition = new THREE.Vector3(300, 600, 300); // Example target position
    moveCameraSmoothly(targetPosition);

    // Rotate model smoothly by 90 degrees (pi/2 radians)
    if (room1) {
        const targetRotation = room1.model.rotation.y + Math.PI / 2; // 90 degrees in radians
        const targetRotation2 = room2.model.rotation.y + Math.PI / 2; // 90 degrees in radians
        const targetPosition =  new THREE.Vector3(-285,206,6);
        rotateModelSmoothly(targetRotation, room1);
        rotateModelSmoothly(targetRotation2, room2);
        shiftSmoothly(targetRotation2, targetPosition, room2);
    }
}

function moveCameraSmoothly(targetPosition) {
    const startPosition = camera.position.clone();
    const duration = 1000; // Duration in milliseconds

    let startTime = null;

    function updatePosition(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Clamp between 0 and 1

        const newPosition = new THREE.Vector3();
        newPosition.lerpVectors(startPosition, targetPosition, progress);

        camera.position.copy(newPosition);

        if (progress < 1) {
            requestAnimationFrame(updatePosition);
        }
    }

    requestAnimationFrame(updatePosition);
}

const undoButton = document.getElementById('undoButton');
undoButton.addEventListener('click', () => {
    if(counter ==1){
        undoTransformation();
        counter-=1;
    }
});

function undoTransformation() {
    // Move camera back to initial position
    const targetPosition = new THREE.Vector3(300, 300, 300); // Example target position
    moveCameraSmoothly(targetPosition);

    // Move and rotate rooms back to initial states
    if (room1 && room2) {
        shiftSmoothly(initialRotation1, initialPosition1, room1);
        shiftSmoothly(initialRotation2, initialPosition2, room2);
    }
}

