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
const directionalLight2 = new THREE.DirectionalLight( 0xff0000, 0.5 ); // red light for contrast
directionalLight2.position.set(-5, 2, -5); // position the light
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

// Set up the GUI
const gui = new GUI();

// Material controls
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'metalness', 0, 1).name('Metalness');
materialFolder.add(material, 'roughness', 0, 1).name('Roughness');
materialFolder.addColor({ color: 0x00ff00 }, 'color').onChange((value) => {
  material.color.set(value);
}).name('Color Picker');

materialFolder.close();

// Light controls
const lightFolder = gui.addFolder('Lights');
lightFolder.add(directionalLight1, 'intensity', 0, 2).name('Light 1 Intensity');
lightFolder.add(directionalLight2, 'intensity', 0, 2).name('Light 2 Intensity');
lightFolder.close();


const transformFolder = gui.addFolder('Transform');
transformFolder.add(cube.position, 'x', -5, 5).name('Position X');
transformFolder.add(cube.position, 'y', -5, 5).name('Position Y');
transformFolder.add(cube.position, 'z', -5, 5).name('Position Z');
transformFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('Rotate X');
transformFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Rotate Y');
transformFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Rotate Z');
transformFolder.add(cube.scale, 'x', 0.1, 3).name('Scale X');
transformFolder.add(cube.scale, 'y', 0.1, 3).name('Scale Y');
transformFolder.add(cube.scale, 'z', 0.1, 3).name('Scale Z');
transformFolder.close();


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
}

animate();
