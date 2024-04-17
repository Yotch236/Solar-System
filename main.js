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

const size = 900;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size,divisions);
scene.add(gridHelper);
//SUN
const sunTexture = new THREE.TextureLoader().load("Sun.png");

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(13,50,50),
    new THREE.MeshBasicMaterial({
        map: sunTexture,
    })
);

scene.add(sun);

sun.position.z = 0;

//MERCURY
const mercuryTexture = new THREE.TextureLoader().load("planets/Mercury.png");

const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(2,50,50),
    new THREE.MeshBasicMaterial({
        map: mercuryTexture,
    })
);

scene.add(mercury);
mercury.position.z = 35;

//VENUS
const venusTexture = new THREE.TextureLoader().load("planets/Venus.png");

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(4,50,50),
    new THREE.MeshBasicMaterial({
        map: venusTexture,
    })
);

scene.add(venus);
venus.position.z = 55;

//EARTH
const earthTexture = new THREE.TextureLoader().load("planets/Earth.jpg");

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshBasicMaterial({
        map: earthTexture,
    })
);

scene.add(earth);

earth.position.z = 75;

//MARS
const marsTexture = new THREE.TextureLoader().load("planets/Mars.png");

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(4,50,50),
    new THREE.MeshBasicMaterial({
        map: marsTexture,
    })
);

scene.add(mars);

mars.position.z = 90;

//JUPITER
const jupiterTexture = new THREE.TextureLoader().load("planets/Jupiter.jpg");

const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(10,50,50),
    new THREE.MeshBasicMaterial({
        map: jupiterTexture,
    })
);

scene.add(jupiter);

jupiter.position.z = 110;

//SATURN
const saturnTexture = new THREE.TextureLoader().load("planets/Saturn.png");

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(7,50,50),
    new THREE.MeshBasicMaterial({
        map: saturnTexture,
    })
);

scene.add(saturn);

saturn.position.z = 135;

//URANUS
const uranusTexture = new THREE.TextureLoader().load("planets/Uranus.jpg");

const uranus = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshBasicMaterial({
        map: uranusTexture,
    })
);

scene.add(uranus);

uranus.position.z = 155;

//NEPTUNE
const neptuneTexture = new THREE.TextureLoader().load("planets/Neptune.jpg");

const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(4,50,50),
    new THREE.MeshBasicMaterial({
        map: neptuneTexture,
    })
);

scene.add(neptune);

neptune.position.z = 170;

//PLUTO(DWARF PLANET BA NAMAN HAYS KAWAWA)

const plutoTexture = new THREE.TextureLoader().load("planets/Pluto.png");

const pluto = new THREE.Mesh(
    new THREE.SphereGeometry(2,50,50),
    new THREE.MeshBasicMaterial({
        map: plutoTexture,
    })
);

scene.add(pluto);

pluto.position.z = 190;

const controls = new OrbitControls(camera,renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    //Earth Rotation
    earth.rotation.y += 0.05;
    //Mercury Rotation
    mercury.rotation.y += 0.05;
    //Venus Rotation
    venus.rotation.y += 0.05;
    //Mars Rotation
    mars.rotation.y += 0.05;
    //Jupiter Rotation
    jupiter.rotation.y += 0.05;
    //Saturn Rotation
    saturn.rotation.y += 0.05;
    //Uranus Rotation
    uranus.rotation.y +=0.05;
    //Neptune Rotation
    neptune.rotation.y += 0.05;
    controls.update();
    renderer.render(scene,camera);
}

animate();

