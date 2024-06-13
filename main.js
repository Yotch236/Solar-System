import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

function createPlanet(texturePath, size) {
    const texture = textureLoader.load(texturePath);
    const geometry = new THREE.SphereGeometry(size, 50, 50);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    return new THREE.Mesh(geometry, material);
}

const sun = createPlanet("Sun.png", 13);
scene.add(sun);

const planets = [
    { name: 'mercury', texture: 'planets/Mercury.png', size: 2, distance: 35, speed: 1.5 },
    { name: 'venus', texture: 'planets/Venus.png', size: 4, distance: 55, speed: 1.2 },
    { name: 'earth', texture: 'planets/Earth.jpg', size: 5, distance: 75, speed: 1 },
    { name: 'mars', texture: 'planets/Mars.png', size: 4, distance: 90, speed: 0.3 },
    { name: 'jupiter', texture: 'planets/Jupiter.jpg', size: 10, distance: 110, speed: 0.5 },
    { name: 'saturn', texture: 'planets/Saturn.png', size: 7, distance: 135, speed: 0.4 },
    { name: 'uranus', texture: 'planets/Uranus.jpg', size: 5, distance: 155, speed: 0.3 },
    { name: 'neptune', texture: 'planets/Neptune.jpg', size: 4, distance: 170, speed: 0.25 },
    { name: 'pluto', texture: 'planets/Pluto.png', size: 2, distance: 190, speed: 0.2 }
];

planets.forEach(planet => {
    planet.mesh = createPlanet(planet.texture, planet.size);
    scene.add(planet.mesh);
});

const moonTexture = textureLoader.load("Moon.png");
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshBasicMaterial({ map: moonTexture })
);
scene.add(moon);

const saturnRingsTexture = textureLoader.load("planets/SaturnRing.png");
const saturnRingsGeometry = new THREE.RingGeometry(8.5, 12, 50);
const saturnRingsMaterial = new THREE.MeshBasicMaterial({
    map: saturnRingsTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
});
const saturnRings = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial);
saturnRings.rotation.x = Math.PI / 2;
planets.find(p => p.name === 'saturn').mesh.add(saturnRings);

const uranusRingsTexture = textureLoader.load("planets/UranusRing.png");
const uranusRingsGeometry = new THREE.RingGeometry(6.5, 9, 50);
const uranusRingsMaterial = new THREE.MeshBasicMaterial({
    map: uranusRingsTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
});
const uranusRings = new THREE.Mesh(uranusRingsGeometry, uranusRingsMaterial);
uranusRings.rotation.z = Math.PI / 2;
planets.find(p => p.name === 'uranus').mesh.add(uranusRings);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.24, 50, 50);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(900));
    star.position.set(x, y, z);
    scene.add(star);
}
Array(1500).fill().forEach(addStar);

function updateMoonPosition() {
    const earthPosition = planets.find(p => p.name === 'earth').mesh.position.clone();
    const distanceFromEarth = 9;
    moon.position.x = earthPosition.x + Math.cos(Date.now() * 0.0012) * distanceFromEarth;
    moon.position.z = earthPosition.z + Math.sin(Date.now() * 0.0012) * distanceFromEarth;
}

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0005;
    const orbitRadiusScale = 1;
    const rotationSpeedScale = 0.01;

    planets.forEach(planet => {
        planet.mesh.position.x = Math.cos(time * planet.speed) * planet.distance * orbitRadiusScale;
        planet.mesh.position.z = Math.sin(time * planet.speed) * planet.distance * orbitRadiusScale;
        planet.mesh.rotation.y += 0.01 * rotationSpeedScale;
    });

    moon.rotation.y += 0.05 * rotationSpeedScale;
    updateMoonPosition();

    controls.update();
    renderer.render(scene, camera);
}

animate();
