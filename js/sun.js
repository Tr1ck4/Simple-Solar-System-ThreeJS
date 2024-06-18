import * as THREE from 'three';

export function createSun() {
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunTexture = new THREE.TextureLoader().load('../textures/sun_texture.jpg');
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture});
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    return sun;
}
