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

//SUN
const sungeometry = new THREE.SphereGeometry(10,100,50);
const material = new THREE.MeshBasicMaterial({color: 0xFFFF00});
const sun = new THREE.Mesh( sungeometry, material);

scene.add(sun);



const controls = new OrbitControls(camera,renderer.domElement);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(5,35,35),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
    })
);

scene.add(moon);

moon.position.z = 10;
moon.position.setX(-10);

function animate() {
    requestAnimationFrame(animate);

    
    sun.rotation.x += 0.01;
    sun.rotation.y += 0.01;

    controls.update();
    renderer.render(scene,camera);
}

animate();

