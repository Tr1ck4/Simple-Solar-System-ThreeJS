import * as THREE from 'three';

export function createOrbitLine(radius) {
    const orbitGeometry = new THREE.BufferGeometry();
    const points = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    orbitGeometry.setFromPoints(points);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    return new THREE.Line(orbitGeometry, orbitMaterial);
}
