import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Cube geometry and material
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00, roughness: 0.8, metalness: 0.3 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Add ambient light for general illumination
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 ); // soft white light
scene.add( ambientLight );

// Add the first directional light (studio light)
const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 1 ); // bright white light
directionalLight1.position.set(5, 5, 5); // position the light
scene.add( directionalLight1 );

// Add a helper for the first directional light
const directionalLightHelper1 = new THREE.DirectionalLightHelper( directionalLight1, 1 ); // size of the helper
scene.add( directionalLightHelper1 );

// Add the second directional light (artificial light)
// const directionalLight2 = new THREE.DirectionalLight( 0xff0000, 0.5 ); // red light for contrast
// directionalLight2.position.set(-5, -5, -5); // position the light/
const directionalLight2 = new THREE.DirectionalLight( 0xff0000, 3 ); // red light for contrast
directionalLight2.position.set(5, 2, 35); // position the light
scene.add( directionalLight2 );

// Add a helper for the second directional light
const directionalLightHelper2 = new THREE.DirectionalLightHelper( directionalLight2, 1 ); // size of the helper
scene.add( directionalLightHelper2 );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
}

animate();
