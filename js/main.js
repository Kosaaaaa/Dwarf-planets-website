import * as THREE from '/three/build/three.module.js';

function loadTexture(src){
    const texture = new THREE.TextureLoader().load( src );
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    return material
}
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

// function animate() {
// 	requestAnimationFrame( animate );
//     renderer.render( scene, camera );
//     //sphere.rotation.x += 0.01;
//     ceres.rotation.y += 0.005;
// }


function createPlanet(name, radius, texture, posX, posY, posZ){
    const geometry = new THREE.SphereGeometry(radius, 32, 32 );
    const planet = new THREE.Mesh( geometry, texture );
    planet.position.set(posX, posY, posZ);
    planet.name = name;
    return planet
}

