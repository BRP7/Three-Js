import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const geometry = new THREE.SphereGeometry( 1, 10, 10 );
// const geometry = new THREE.SphereGeometry( 1, 5, 5 ,2,1.2);
const geometry = new THREE.CylinderGeometry( 2, 2, 2 ,10,10,true);
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 , wireframe : true } );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 , side: THREE.DoubleSide } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
controls.autoRotateSpeed = 12 ;
controls.enableZoom = false;
controls.dampingFactor = 0.5;//small DF -> time to stop ⬆️

function animate() {
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    controls.update();
}

animate()