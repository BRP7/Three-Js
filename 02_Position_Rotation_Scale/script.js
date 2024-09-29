const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 5;
scene.add(camera);

const box = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( box, material );

scene.position.x = 1;
// scene.position.x = -2;
// scene.position.y = 1;
// scene.position.y = -1;
scene.add( cube );


let canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// function animate() {
//     window.requestAnimationFrame(animate)
// 	renderer.render( scene, camera );
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
// }
// animate();