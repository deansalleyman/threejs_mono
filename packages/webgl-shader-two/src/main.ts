import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import vertexShader from "./shaders/three/vertexShader.glsl";
import fragmentShader from "./shaders/three/fragmentShader.glsl";

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

  const data = { color: 0x00ff00, lightColor: 0xffffff };
  // #region AmbientLight

  const ambientLight = new THREE.AmbientLight(data.lightColor, Math.PI);
  ambientLight.visible = false;
  scene.add(ambientLight);

  // #region DirectionalLight

  const directionalLight = new THREE.DirectionalLight(data.lightColor, Math.PI);
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

  const w = window.innerWidth;
  const h = window.innerHeight;

  const colorUniform = { value: new THREE.Color(0,1,1) } ;
  const uniforms = { uColor: colorUniform ,
    time : {
      value : 0
  },
  resolation : {
  type : "v2",
      value : new THREE.Vector2(w,h)
  }
  } ;

  const materialShader = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,

  });

 
	const planeGeometry = new THREE.PlaneGeometry(2,2,1,1);

				const material = new THREE.MeshBasicMaterial()
				const plane = new THREE.Mesh(planeGeometry, materialShader)

				scene.add(plane);


   const geometry = new THREE.BufferGeometry();
   const positionArray = new Float32Array([
    0,0,0,
    1,0,0,
    0,1,0
    ])
    const positionAttribute = new THREE.BufferAttribute(
      positionArray, // array: the actual data we are wrapping
      3,             // itemSize: size of an element
      false          // normalized: this should be true for color
    )
    geometry.setAttribute('position', positionAttribute);

    const triangle = new THREE.Mesh(geometry, materialShader)
triangle.position.x =2
    scene.add(triangle);

  const controls = new OrbitControls(camera, renderer.domElement);
  //const loader = new GLTFLoader();
  controls.update();

  function animate() {

    triangle.material.uniforms.time.value += 1;
    // mesh.rotation.y += 0.01
    requestAnimationFrame(animate);
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
