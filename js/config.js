
import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/js/OrbitControls.js';

let isPlay = true;

function loadTexture(src) {
    const texture = new THREE.TextureLoader().load(src);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    return material
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});
const planetTextures = {
    ceres : loadTexture('/textures/2k_ceres_fictional.jpg'),
    eris: loadTexture('/textures/2k_eris_fictional.jpg'),
    haumea: loadTexture('/textures/2k_haumea_fictional.jpg'),
    makemake: loadTexture('/textures/2k_makemake_fictional.jpg'),
    sun: loadTexture('/textures/2k_sun.jpg')
}
function createPlanet(name, radius, texture, posX, posY, posZ) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const planet = new THREE.Mesh(geometry, texture);
    planet.position.set(posX, posY, posZ);
    planet.name = name;

    return planet
}

let rotationSpeed = 0.005;

//Scene
const scene = new THREE.Scene();


//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 50);
camera.rotation.set(0, 0, 0);


//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0xffffff, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild( renderer.domElement );
document.getElementById('container').appendChild(renderer.domElement)
renderer.domElement.id = "canvasMain"

const render = function () {
    requestAnimationFrame(render);
    if (isPlay) {
        rotationSpeed = 0.005;
    } else {
        rotationSpeed = 0;
    }

    renderer.render(scene, camera);

    ceresOrbit.rotation.y += rotationSpeed;
    haumeaOrbit.rotation.y += rotationSpeed / 2;
    makemakeOrbit.rotation.y += rotationSpeed / 3;
    erisOrbit.rotation.y += rotationSpeed / 4;

    ceres.rotation.y -= rotationSpeed * 3;
    haumea.rotation.y -= rotationSpeed * 3;
    makemake.rotation.y -= rotationSpeed * 3;
    eris.rotation.y -= rotationSpeed * 3;
    //console.log(rotationSpeed);
    controls.update();
}

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 20;
controls.panSpeed = 0;
controls.enableKeys = false;
controls.keyPan = 0;


//Light
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);


//Solar Group
//const solarGroup = new THREE.Group();
const sun = createPlanet("sun", 2, planetTextures["sun"], 0, 0, 0);
const ceres = createPlanet("ceres", 0.5, planetTextures["ceres"], 5, 0, 0);
const haumea = createPlanet("haumea", 0.5, planetTextures["haumea"], 8, 0, 0);
const makemake = createPlanet("makemake", 0.5, planetTextures["makemake"], 10, 0, 0);
const eris = createPlanet("eris", 0.5, planetTextures["eris"], 12, 0, 0);
//Orbit Groups
const ceresOrbit = new THREE.Group();
const haumeaOrbit = new THREE.Group();
const makemakeOrbit = new THREE.Group();
const erisOrbit = new THREE.Group();


//Dom Events
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

function toggleVisibility(planet) {
    const planets = ["ceres", "haumea", "makemake", "eris"];

    console.log(planets.indexOf(planet));

    if (document.getElementById(planet).style.visibility == "visible") {
        document.getElementById(planet).style.visibility = "hidden";
    } else {
        document.getElementById(planet).style.visibility = "visible";
        for (var i = 0; i < planets.length; i++) {
            if (i == planets.indexOf(planet)) {
                continue;
            } else {
                document.getElementById(planets[i]).style.visibility = "hidden"
            }

        }
    }

}


// domEvents.addEventListener(sun, 'mousedown', event => {
//     isPlay = false;
// })
// domEvents.addEventListener(sun, 'mouseup', event => {
//     isPlay = true;
// })

domEvents.addEventListener(ceres, 'click', event => {
    toggleVisibility("ceres");

});
domEvents.addEventListener(haumea, 'click', event => {
    toggleVisibility("haumea");
});
domEvents.addEventListener(makemake, 'click', event => {
    toggleVisibility("makemake");
});
domEvents.addEventListener(eris, 'click', event => {
    toggleVisibility("eris");
});
let slowerBtn = document.getElementById('slowerBtn');
let stopBtn = document.getElementById('stopBtn');
let fasterBtn = document.getElementById('fasterBtn');
// slowerBtn.addEventListener('click', () => {
//     rotationSpeed -= 0.001;
    
//     render();
//     console.log(rotationSpeed);
// })

stopBtn.addEventListener('click', () => {
    if (isPlay){
        isPlay = false;
    }else{
        isPlay = true;
    };
})

// fasterBtn.addEventListener('click', () => {
//     rotationSpeed += 0.001;
    
//     render();
//     console.log(rotationSpeed);
    
// })

ceresOrbit.add(ceres);
haumeaOrbit.add(haumea);
makemakeOrbit.add(makemake);
erisOrbit.add(eris);

scene.add(ceresOrbit);
scene.add(haumeaOrbit);
scene.add(makemakeOrbit);
scene.add(erisOrbit);
scene.add(sun);



render();