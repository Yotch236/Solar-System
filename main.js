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
/*GRID HELPER

const size = 900;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size,divisions);
scene.add(gridHelper);*/
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

//VENUS
const venusTexture = new THREE.TextureLoader().load("planets/Venus.png");

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(4,50,50),
    new THREE.MeshBasicMaterial({
        map: venusTexture,
    })
);

scene.add(venus);


//EARTH
const earthTexture = new THREE.TextureLoader().load("planets/Earth.jpg");

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshBasicMaterial({
        map: earthTexture,
    })
);

scene.add(earth);


//MARS
const marsTexture = new THREE.TextureLoader().load("planets/Mars.png");

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(4,50,50),
    new THREE.MeshBasicMaterial({
        map: marsTexture,
    })
);

scene.add(mars);

//JUPITER
const jupiterTexture = new THREE.TextureLoader().load("planets/Jupiter.jpg");

const jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(10,50,50),
    new THREE.MeshBasicMaterial({
        map: jupiterTexture,
    })
);

scene.add(jupiter);


//SATURN
const saturnTexture = new THREE.TextureLoader().load("planets/Saturn.png");

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(7,50,50),
    new THREE.MeshBasicMaterial({
        map: saturnTexture,
    })
);

scene.add(saturn);


//SATURN RINGS
const saturnRingTexture = new THREE.TextureLoader().load("planets/SaturnRing.png");
const saturnRingGeometry = new THREE.RingGeometry(8.5, 12,50);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
});

const saturnRings = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRings.rotation.x = Math.PI /2;
scene.add(saturnRings);
saturn.add(saturnRings);

//URANUS
const uranusTexture = new THREE.TextureLoader().load("planets/Uranus.jpg");

const uranus = new THREE.Mesh(
    new THREE.SphereGeometry(5,50,50),
    new THREE.MeshBasicMaterial({
        map: uranusTexture,
    })
);

scene.add(uranus);

//URANUS RING

const uranusRingTexture = new THREE.TextureLoader().load("planets/UranusRing.png");
const uranusRingGeometry = new THREE.RingGeometry(6.5,9,50);
const uranusRingMaterial = new THREE.MeshBasicMaterial({
    map: uranusRingTexture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
});

const UranusRings = new THREE.Mesh(uranusRingGeometry,uranusRingMaterial);
UranusRings.rotation.z = Math.PI/2;
scene.add(UranusRings);
uranus.add(UranusRings);
//NEPTUNE
const neptuneTexture = new THREE.TextureLoader().load("planets/Neptune.jpg");

const neptune = new THREE.Mesh(
    new THREE.SphereGeometry(4,50,50),
    new THREE.MeshBasicMaterial({
        map: neptuneTexture,
    })
);

scene.add(neptune);

//PLUTO(DWARF PLANET BA NAMAN HAYS KAWAWA)

const plutoTexture = new THREE.TextureLoader().load("planets/Pluto.png");

const pluto = new THREE.Mesh(
    new THREE.SphereGeometry(2,50,50),
    new THREE.MeshBasicMaterial({
        map: plutoTexture,
    })
);

scene.add(pluto);

const controls = new OrbitControls(camera,renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const [x , y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 450 ));
    star.position.set(x,y,z);
    scene.add(star);
}

Array(900).fill().forEach(addStar)

function animate() {
    requestAnimationFrame(animate);
    //Update planet positions
    const time = Date.now() * 0.0005; //Value of speed of revolution (Can adjust)
    const orbitRadiusScale = 1; //Scale factor for the orbit radius
    const rotationSpeedScale = 0.01; //Scale factor for the rotation speed

    //Mercury Position
    mercury.position.x = Math.cos(time * 1.5) * 35 * orbitRadiusScale;
    mercury.position.z = Math.sin(time * 1.5) * 35 * orbitRadiusScale;

    //Venus Position
    venus.position.z = Math.sin(time * 1.2) * 55 *orbitRadiusScale;
    venus.position.x = Math.cos(time * 1.2) * 55 * orbitRadiusScale;

    //Earth Position
    earth.position.z = Math.sin(time) * 75 * orbitRadiusScale;
    earth.position.x = Math.cos(time) * 75 * orbitRadiusScale;

    //Mars Position
    mars.position.x = Math.cos(time * 0.3) * 90 * orbitRadiusScale;
    mars.position.z = Math.sin(time *0.3) * 90 * orbitRadiusScale;

    //Jupiter Position
    jupiter.position.x = Math.cos(time * 0.5) * 110 * orbitRadiusScale;
    jupiter.position.z = Math.sin(time * 0.5) * 110 * orbitRadiusScale;

     // Saturn
     saturn.position.x = Math.cos(time * 0.4) * 135 * orbitRadiusScale;
     saturn.position.z = Math.sin(time * 0.4) * 135 * orbitRadiusScale;
 
     // Uranus
     uranus.position.x = Math.cos(time * 0.3) * 155 * orbitRadiusScale;
     uranus.position.z = Math.sin(time * 0.3) * 155 * orbitRadiusScale;
 
     // Neptune
     neptune.position.x = Math.cos(time * 0.25) * 170 * orbitRadiusScale;
     neptune.position.z = Math.sin(time * 0.25) * 170 * orbitRadiusScale;
 
     // Pluto
     pluto.position.x = Math.cos(time * 0.2) * 190 * orbitRadiusScale;
     pluto.position.z = Math.sin(time * 0.2) * 190 * orbitRadiusScale;
 

    //Earth Rotation
    earth.rotation.y += 0.02 * rotationSpeedScale;
    //Mercury Rotation
    mercury.rotation.y += 0.03 * rotationSpeedScale;
    //Venus Rotation
    venus.rotation.y += 0.02 * rotationSpeedScale;
    //Mars Rotation
    mars.rotation.y += 0.02 * rotationSpeedScale;
    //Jupiter Rotation
    jupiter.rotation.y += 0.01 * rotationSpeedScale;
    //Saturn Rotation
    saturn.rotation.y += 0.01 * rotationSpeedScale;
    //Uranus Rotation
    uranus.rotation.y +=0.01 * rotationSpeedScale;
    //Neptune Rotation
    neptune.rotation.y += 0.01 * rotationSpeedScale;
    //Pluto Rotation
    pluto.rotation.y += 0.01 * rotationSpeedScale;

    controls.update();
    
    renderer.render(scene,camera);
}

animate();

