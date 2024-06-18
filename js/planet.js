import * as THREE from 'three';

export function createPlanet(size, texturePath, distance) {
    const planetGeometry = new THREE.SphereGeometry(size, 32, 32);
    const planetTexture = new THREE.TextureLoader().load(texturePath);
    const planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(distance, 0, 0);
    return planet;
}
