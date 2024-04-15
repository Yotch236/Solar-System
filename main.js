import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera  = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);

renderer.render( scene, camera);
//GRID HELPER

const size =500;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size,divisions);
scene.add(gridHelper);

//SUN
const sungeometry = new THREE.SphereGeometry(10,100,90);
const material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
const sun = new THREE.Mesh( sungeometry, material);

scene.add(sun);
sun.position.z = 0;
sun.position.setX(-10);

//MOON
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
    })
);

scene.add(moon);

moon.position.z = 18;
moon.position.setX(-10);
//EARTH
const earthTexture = new THREE.TextureLoader().load('Earth.jpg');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshBasicMaterial({
        map: earthTexture,
    })
);

scene.add(earth);

earth.position.z = 30;
earth.position.setX(-10);

const controls = new OrbitControls(camera,renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    
    sun.rotation.x += 0.05;
    sun.rotation.y += 0.05;

    moon.rotation.x += 0.01;
    moon.rotation.y += 0.01;

    earth.rotation.x += 0.01;
    earth.rotation.y += 0.075;

    controls.update();
    renderer.render(scene,camera);
}

animate();

