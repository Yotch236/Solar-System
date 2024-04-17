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
const sunTexture = new THREE.TextureLoader().load("Sun.png");

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(10,50,50),
    new THREE.MeshBasicMaterial({
        map: sunTexture,
    })
);

scene.add(sun);

sun.position.z = 50;

//MERCURY
const mercuryTexture = new THREE.TextureLoader().load("planets/Mercury.png");

const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(2,50,50),
    new THREE.MeshBasicMaterial({
        map: mercuryTexture,
    })
);

scene.add(mercury);
mercury.position.z = 30;

//VENUS
const venusTexture = new THREE.TextureLoader().load("planets/Venus.png");

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(4,50,50),
    new THREE.MeshBasicMaterial({
        map: venusTexture,
    })
);

scene.add(venus);
venus.position.z = 18;

//EARTH
const earthTexture = new THREE.TextureLoader().load("planets/Earth.jpg");

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshBasicMaterial({
        map: earthTexture,
    })
);

scene.add(earth);

earth.position.z = 0;

const controls = new OrbitControls(camera,renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    
    earth.rotation.y += 0.05;
    mercury.rotation.y += 0.05;
    venus.rotation.y += 0.05;
    controls.update();
    renderer.render(scene,camera);
}

animate();

