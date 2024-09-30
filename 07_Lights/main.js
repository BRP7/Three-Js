import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui'; // Import lil-gui

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

const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 1 ); // Size of the helper
scene.add( directionalLightHelper );

// Add a point light for dynamic lighting
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 ); // Red light 
pointLight.position.set(0, 0, 1.2); // Position the light
scene.add( pointLight );
// Color: Light's color (e.g., 0xffffff for white).
// Intensity: Brightness of the light.
// Distance: How far the light affects (e.g., 100 means effective up to 100 units). Beyond that, it has no effect.

const pointLightHelper = new THREE.PointLightHelper( pointLight, 0.2 ); // Size of the helper
scene.add( pointLightHelper );

// Set up the GUI
const gui = new GUI();

// Ambient light controls
const ambientFolder = gui.addFolder('Ambient Light');
ambientFolder.add(ambientLight, 'intensity', 0, 1).name('Intensity');
ambientFolder.close();

// Directional light controls
const directionalFolder = gui.addFolder('Directional Light');
directionalFolder.add(directionalLight, 'intensity', 0, 2).name('Intensity');
directionalFolder.add(directionalLight.position, 'x', -10, 10).name('Position X');
directionalFolder.add(directionalLight.position, 'y', -10, 10).name('Position Y');
directionalFolder.add(directionalLight.position, 'z', -10, 10).name('Position Z');
directionalFolder.close();

// Point light controls
const pointFolder = gui.addFolder('Point Light');
pointFolder.add(pointLight, 'intensity', 0, 2).name('Intensity');
pointFolder.add(pointLight.position, 'x', -10, 10).name('Position X');
pointFolder.add(pointLight.position, 'y', 0, 10).name('Position Y');
pointFolder.add(pointLight.position, 'z', -10, 10).name('Position Z');
pointFolder.close();

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
