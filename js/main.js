// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSun } from './sun.js';
import { createPlanet } from './planet.js';
import { createOrbitLine } from './orbit.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );

// Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0); // Light source at the center (Sun)
scene.add(pointLight);

// Sun
const sun = createSun();
scene.add(sun);

// Planets
const planetsData = [
    { size: 0.035, distance: 1.3, texture: 'textures/mercury_texture.jpg',rotationSpeed: 0.02 },
    { size: .087, distance: 2.4, texture: 'textures/venus_texture.jpg',rotationSpeed: 0.015 },
    { size: .091, distance: 3.2, texture: 'textures/earth_texture.jpg',rotationSpeed: 0.01  },
    { size: .049, distance: 4.8, texture: 'textures/mars_texture.jpg',rotationSpeed: 0.008 },
    { size: 1, distance: 16.64, texture: 'textures/jupiter_texture.jpg',rotationSpeed: 0.005 },
    { size: .9, distance: 30.4, texture: 'textures/saturn_texture.jpg',rotationSpeed: 0.004 },
    { size: .4, distance: 63.6, texture: 'textures/uranus_texture.jpg',rotationSpeed: 0.003 },
    { size: .38, distance: 100, texture: 'textures/neptune_texture.jpg',rotationSpeed: 0.002 }
];

const planets = planetsData.map(data => {
    const planet = createPlanet(data.size, data.texture, data.distance);
    scene.add(planet);
    const orbit = createOrbitLine(data.distance);
    scene.add(orbit);
    return { planet, distance: data.distance, rotationSpeed: data.rotationSpeed };
});


// Camera Position
camera.position.z = 10;

// Animation
const animate = function () {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.0001;

    planets.forEach((planetData, index) => {
        planetData.planet.position.x = planetData.distance * Math.cos(time + index);
        planetData.planet.position.z = planetData.distance * Math.sin(time + index);
        planetData.planet.rotation.y += planetData.rotationSpeed;
    });

    sun.rotation.y += 0.002;

    renderer.render(scene, camera);
};

animate();
