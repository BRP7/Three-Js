import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Load texture
const textureLoader = new THREE.TextureLoader();
const color = textureLoader.load('./text/color.png');
const roughness = textureLoader.load('./text/roughness.png');
const normal = textureLoader.load('./text/normal_map.png');

// Cube geometry and textured material
const geometry = new THREE.BoxGeometry( 1.5, 1, 1 );
const material = new THREE.MeshStandardMaterial({ 
    map: color, 
    roughnessMap: roughness, 
    metalness: 0.3, 
    normalMap: normal 
});
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Add ambient light for general illumination
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 ); // Soft white light
scene.add( ambientLight );

// Add the first directional light (studio light)
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 ); // Bright white light
directionalLight.position.set(5, 5, 5); // Position the light
scene.add( directionalLight );

// Add a helper for the directional light
const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 1 ); // Size of the helper
scene.add( directionalLightHelper );

// // Add a point light for dynamic lighting
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 ); // Red light
pointLight.position.set(1, 2, -3); // Position the light
scene.add( pointLight );

// Add a helper for the point light
const pointLightHelper = new THREE.PointLightHelper( pointLight, 1 ); // Size of the helper
scene.add( pointLightHelper );

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
