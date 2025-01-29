import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'

if (typeof window !== 'undefined') {

    

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const gridHelper = new THREE.GridHelper();
gridHelper.position.set(1,-0.1,1)
scene.add(gridHelper);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshStandardMaterial())
plane.rotation.x = -Math.PI / 2;

plane.position.set(1,-0.1,1)
scene.add(plane);

const data = { color: 0x00ff00, lightColor: 0xffffff }
// #region AmbientLight

const ambientLight = new THREE.AmbientLight(data.lightColor, Math.PI)
ambientLight.visible = false
scene.add(ambientLight);

// #region DirectionalLight

const directionalLight = new THREE.DirectionalLight(data.lightColor, Math.PI)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
directionalLightHelper.visible = false
scene.add(directionalLightHelper);




camera.position.set(10,10,10);

camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BufferGeometry();

    // Define the vertices of the cube
    const vertices = new Float32Array([
        -1, -1, -1,  // 0
         1, -1, -1,  // 1 
         1,  1, -1,  // 2
        -1,  1, -1,  // 3
        -1, -1,  1,  // 4 
         1, -1,  1,  // 5
         1,  1,  1,  // 6 
        -1,  1,  1   // 7
    ]);

    // Define the indices for the triangles
    const indices = new Uint16Array([
        0, 1, 2,  0, 2, 3, // back
        4, 5, 6,  4, 6, 7, // front
        0, 3, 7,  0, 7, 4, // left
        1, 2, 6,  1, 6, 5, // right 
        0, 1, 5,  0, 5, 4, // bottom
        3, 2, 6,  3, 6, 7  // top
    ]);



// itemSize = 3 because there are 3 values (components) per vertex

geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

geometry.setIndex(new THREE.BufferAttribute(indices, 1));



const material = new THREE.MeshBasicMaterial( { color: 0xccccFF } );
const mesh = new THREE.Mesh( geometry, material );

scene.add(mesh);
/**
 * Line
 */


const pointsLine = []
pointsLine.push(new THREE.Vector3(-5, 0, 0))
pointsLine.push(new THREE.Vector3(5, 0, 0))
const geometryLine = new THREE.BufferGeometry().setFromPoints(pointsLine)
const line = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: 0x888888 }))
scene.add(line)


/**
 * Tetrahedon
 */

const materialTet = new THREE.MeshNormalMaterial()
const geometryTet = new THREE.BufferGeometry()
const pointsTet = [
    new THREE.Vector3(-1, 1, -1), //c
    new THREE.Vector3(-1, -1, 1), //b
    new THREE.Vector3(1, 1, 1), //a

    new THREE.Vector3(1, 1, 1), //a
    new THREE.Vector3(1, -1, -1), //d
    new THREE.Vector3(-1, 1, -1), //c

    new THREE.Vector3(-1, -1, 1), //b
    new THREE.Vector3(1, -1, -1), //d
    new THREE.Vector3(1, 1, 1), //a

    new THREE.Vector3(-1, 1, -1), //c
    new THREE.Vector3(1, -1, -1), //d
    new THREE.Vector3(-1, -1, 1), //b
]

geometryTet.setFromPoints(pointsTet);
geometryTet.computeVertexNormals();

const meshTet = new THREE.Mesh(geometryTet, materialTet);

meshTet.position.z=5;
meshTet.position.y=1;
meshTet.rotation.x = -Math.PI / 2;
scene.add(meshTet)



const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();
controls.update();


const gui = new GUI();

const meshFolder = gui.addFolder('Cube')
meshFolder.add(mesh.rotation, 'x', 0, Math.PI * 2)
meshFolder.add(mesh.rotation, 'y', 0, Math.PI * 2)
meshFolder.add(mesh.rotation, 'z', 0, Math.PI * 2)
meshFolder.open();

const dataTet = {
    x: 1
}

const meshTetGui= gui.addFolder('Tetrahedon')
meshTetGui.add(dataTet, 'x', -5, -1, 0.01).onChange(() => {
    geometryTet.attributes.position.array[3] = dataTet.x
    geometryTet.attributes.position.needsUpdate = true
})
meshTetGui.open()


function animate() {

    // mesh.rotation.y += 0.01

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();
    //stats.update()
    renderer.render(scene, camera);

}



animate(); 

}