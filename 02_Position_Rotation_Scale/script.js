/* 
| Axis | Positive Value | Negative Value |
|------|----------------|----------------|
| X    | Right          | Left           |
| Y    | Up             | Down           |
| Z    | Forward        | Backward       |

*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 5;
scene.add(camera);

const box = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( box, material );

// cube.position.x = 2;//If the camera is at `z = 5` and the cube is at `x = 10`, the cube won't be visible because it's outside the camera's frustum.
cube.position.x = -2;//the last position set on an axis will take effect.
cube.position.y = 1;
cube.position.y = -1;
cube.position.z = 1;
scene.add( cube );


let canvas = document.querySelector('#draw');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene,camera);

window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})


