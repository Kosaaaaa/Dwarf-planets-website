import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/js/OrbitControls.js';

//global Variables



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
let rotationSpeed = 0.001;
let isPlay = true;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const light = new THREE.AmbientLight(0xffffff); // soft white light
const controls = new OrbitControls(camera, renderer.domElement);
const planetTextures = {
    ceres: loadTexture('/textures/2k_ceres_fictional.jpg'),
    eris: loadTexture('/textures/2k_eris_fictional.jpg'),
    haumea: loadTexture('/textures/2k_haumea_fictional.jpg'),
    makemake: loadTexture('/textures/2k_makemake_fictional.jpg'),
    sun: loadTexture('/textures/2k_sun.jpg'),
    pluto: loadTexture('textures/pluto.jpg')
}



function loadTexture(src) {
    const texture = new THREE.TextureLoader().load(src);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    return material
}

function createPlanet(name, radius, texture, posX, posY, posZ) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const planet = new THREE.Mesh(geometry, texture);
    planet.position.set(posX, posY, posZ);
    planet.name = name;

    return planet
}

// function toggleVisibility(planet) {
//     const planets = ["ceres", "haumea", "makemake", "eris"];

//     // console.log(planets.indexOf(planet));

//     if (document.getElementById(planet).style.visibility == "visible") {
//         document.getElementById(planet).style.visibility = "hidden";
//         document.getElementById("planety").style.visibility = "visible";
//     } else {
//         document.getElementById(planet).style.visibility = "visible";
//         document.getElementById("planety").style.visibility = "hidden";
//         for (var i = 0; i < planets.length; i++) {
//             if (i == planets.indexOf(planet)) {
//                 continue;
//             } else {
//                 document.getElementById(planets[i]).style.visibility = "hidden"
//             }

//         }
//     }

// }
export function toggleVisibility(planet) {
    const planets = ["ceres", "haumea", "makemake", "eris", "pluto", "creds"];

    // console.log(planets.indexOf(planet));

    if (document.getElementById(planet).style.display == "block") {
        document.getElementById(planet).style.display = "none";
        document.getElementById("planety").style.display = "block";
    } else {
        document.getElementById(planet).style.display = "block";
        document.getElementById("planety").style.display = "none";
        for (var i = 0; i < planets.length; i++) {
            if (i == planets.indexOf(planet)) {
                continue;
            } else {
                document.getElementById(planets[i]).style.display = "none"
            }

        }
    }

}

function init() {

    camera.position.set(0, 0, 50);
    camera.rotation.set(0, 0, 0);
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    });





    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    renderer.domElement.id = "canvasMain";

    //Orbit Controls
    controls.minDistance = 10;
    controls.maxDistance = 20;
    controls.panSpeed = 0;
    controls.enableKeys = false;
    controls.keyPan = 0;
    // controls.enabled = false;
    //Light
    scene.add(light);

    ceresOrbit.add(ceres);
    haumeaOrbit.add(haumea);
    makemakeOrbit.add(makemake);
    erisOrbit.add(eris);
    plutoOrbit.add(pluto);

    scene.add(plutoOrbit);
    scene.add(ceresOrbit);
    scene.add(haumeaOrbit);
    scene.add(makemakeOrbit);
    scene.add(erisOrbit);
    scene.add(sun);

     ceresOrbit.rotation.y  = 0;
     plutoOrbit.rotation.y  = 20;
    haumeaOrbit.rotation.y  = 30;
    makemakeOrbit.rotation.y = 40;
    erisOrbit.rotation.y  = 50;
}

const render = function () {
    requestAnimationFrame(render);
    // if (isPlay) {
    //     rotationSpeed = 0.005;
    // } else {
    //     rotationSpeed = 0;
    // }

    renderer.render(scene, camera);
    
    ceresOrbit.rotation.y += rotationSpeed*0.9;
    plutoOrbit.rotation.y += rotationSpeed*0.8;
    haumeaOrbit.rotation.y += rotationSpeed*0.7;
    makemakeOrbit.rotation.y += rotationSpeed*0.6;
    erisOrbit.rotation.y += rotationSpeed*0.5;
    

    ceres.rotation.y -= rotationSpeed * 3;
    haumea.rotation.y -= rotationSpeed * 3;
    makemake.rotation.y -= rotationSpeed * 3;
    eris.rotation.y -= rotationSpeed * 3;
    pluto.rotation.y -= rotationSpeed * 3;
    controls.update();
}

//Solar Group
//const solarGroup = new THREE.Group();
const sun = createPlanet("sun", 2, planetTextures["sun"], 0, 0, 0);
const ceres = createPlanet("ceres", 0.5, planetTextures["ceres"], 5, 0, 0);
const pluto = createPlanet("eris", 0.5, planetTextures["pluto"], 8, 0, 0);
const haumea = createPlanet("haumea", 0.5, planetTextures["haumea"], 10, 0, 0);
const makemake = createPlanet("makemake", 0.5, planetTextures["makemake"], 12, 0, 0);
const eris = createPlanet("eris", 0.5, planetTextures["eris"], 14, 0, 0);

//Orbit Groups
const ceresOrbit = new THREE.Group();
const haumeaOrbit = new THREE.Group();
const makemakeOrbit = new THREE.Group();
const erisOrbit = new THREE.Group();
const plutoOrbit = new THREE.Group();

//Dom Events
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

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
domEvents.addEventListener(pluto, 'click', event => {
    toggleVisibility("pluto");
});


init();
render();