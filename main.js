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


//MOON

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
    
    earth.rotation.y +=0.05;

    controls.update();
    renderer.render(scene,camera);
}

animate();

