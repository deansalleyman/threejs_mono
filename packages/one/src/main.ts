import * as THREE from 'three';

if (typeof window !== 'undefined') {

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );




camera.position.set(2,2,2);

camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//----
// EULER 
// -----
//  An imnstance of Euler
const euler = new THREE.Euler(Math.PI /180 * 45,  0, 0);

// mesh

const meshA = new  THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshNormalMaterial()

)

// clone mesh
const box1 = meshA.clone();
const box2 = meshA.clone();
const box3 = meshA.clone();

// use the instance of euler to set the state of the new cloned instances
box2.rotation.copy(euler);
box3.rotation.copy(euler);

// set postions
box2.position.set(-1,0,0);
box3.position.set(1,0,0);

// add mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);

// renderer

renderer.render(scene, camera);

}