import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/addons/libs/stats.module.js";
import { VertexNormalsHelper } from "three/addons/helpers/VertexNormalsHelper.js";

import { GUI } from "dat.gui";

import vertexShader from "webgl-shader/src/shaders/gradient/vertexShader.glsl";
import fragmentShader from "webgl-shader/src/shaders/gradient/fragmentShader.glsl";

if (typeof window !== "undefined") {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const gridHelper = new THREE.GridHelper();
  gridHelper.position.set(1, -0.1, 1);
  scene.add(gridHelper);

 
  const dataLight = { color: 0x00ff00, lightColor: 0xffffff };
  // #region AmbientLight

  const ambientLight = new THREE.AmbientLight(dataLight.lightColor, Math.PI);
  ambientLight.visible = false;
  scene.add(ambientLight);

  // #region DirectionalLight

  const directionalLight = new THREE.DirectionalLight(dataLight.lightColor, Math.PI);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight
  );
  directionalLightHelper.visible = false;
  scene.add(directionalLightHelper);

  camera.position.set(10, 10, 10);

  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  /**
   * Geometry
   */

  const materialShader = new THREE.ShaderMaterial({
    uniforms: {
      uBigWavesElevation: { value: 0.2 },
      // 	time: { value: 1.0 },
      // 	resolution: { value: new THREE.Vector2() }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  

  //-------- ----------
  // VERTEX HELPERS
  //-------- ----------

  // const vertHelpermesh1 = new VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
  // scene.add(vertHelpermesh1);

  // const vertHelper1 = new VertexNormalsHelper(meshTri, 0.5, 0x00ff00);
  // scene.add(vertHelper1);

  // const vertHelpermeshTet = new VertexNormalsHelper(meshTet, 0.5, 0x00ff00);
  // scene.add(vertHelpermeshTet);

 //-------- ----------
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.ConeGeometry(0.5, 0.3, 30, 30);
// USING BUFFER GEOMERTY ROTATEX METHOD TO ADJUST THE CONE TO WORK WELL
// WITH THE LOOKAT METHOD OF THE Object3d class
geometry.rotateX(Math.PI * 0.5);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(7, 7));
const cone = new THREE.Mesh(
     geometry,
     new THREE.MeshNormalMaterial()); 
cone.add(new THREE.BoxHelper(cone)); // adding a box helper
scene.add(cone); // add custom to the scene
// adding a cube to have the cone point to
const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
cube.position.set(3, 0, 3);
scene.add(cube)
cone.lookAt(cube.position); // using Object3d (base class of Mesh) lookAt







  const controls = new OrbitControls(camera, renderer.domElement);
  const loader = new GLTFLoader();
  controls.update();

  const data ={
    t: 0// Math.PI / 2
  }

  const gui = new GUI();



//   const meshFolder = gui.addFolder("Cube");
//   meshFolder.add(mesh.rotation, "x", 0, Math.PI * 2);
//   meshFolder.add(mesh.rotation, "y", 0, Math.PI * 2);
//   meshFolder.add(mesh.rotation, "z", 0, Math.PI * 2);
//   meshFolder.open();

//   const dataTet = {
//     x: 1,
//   };

//   const meshTetGui = gui.addFolder("Tetrahedon");
//   meshTetGui.add(dataTet, "x", -5, -1, 0.01).onChange(() => {
//     geometryTet.attributes.position.array[3] = dataTet.x;
//     geometryTet.attributes.position.needsUpdate = true;
//   });
//   meshTetGui.open();

//   const twistGUI = gui.addFolder("Twist");
//   twistGUI.add(data, 't', -Math.PI, Math.PI, 0.01).onChange((t) => {
//     twistedCube.geometry.dispose()
//     geometryTwist = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10)
//     twist(geometryTwist, t)
//     twistedCube.geometry = geometryTwist;
// })
  const clock = new THREE.Clock();
  let time = 0;
  const radius = 2;

  function animate() {

    time = clock.getElapsedTime() * 0.1 * Math.PI;

    cube.position.set(
      Math.cos(time + Math.PI * 0.5 * 1) * radius,
      0,
        Math.sin(time + Math.PI * 0.5 * 1) * radius,
      
      
      )
  
  
    //cube.position.x += 0.01;




    cone.geometry.rotateY(Math.PI * -0.0021);

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    //stats.update()
    renderer.render(scene, camera);
  }

  animate();
}
