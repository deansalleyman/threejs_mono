import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import vertexShader from "./shaders/gradient/vertexShader.glsl";
import fragmentShader from "./shaders/gradient/fragmentShader.glsl";

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

  const geometry = new THREE.BufferGeometry();

  // Define the vertices of the cube
  const vertices = new Float32Array([
    -1,
    -1,
    -1, // 0
    1,
    -1,
    -1, // 1
    1,
    1,
    -1, // 2
    -1,
    1,
    -1, // 3
    -1,
    -1,
    1, // 4
    1,
    -1,
    1, // 5
    1,
    1,
    1, // 6
    -1,
    1,
    1, // 7
  ]);

  // Define the indices for the triangles
  const indices = new Uint16Array([
    0,
    1,
    2,
    0,
    2,
    3, // back
    4,
    5,
    6,
    4,
    6,
    7, // front
    0,
    3,
    7,
    0,
    7,
    4, // left
    1,
    2,
    6,
    1,
    6,
    5, // right
    0,
    1,
    5,
    0,
    5,
    4, // bottom
    3,
    2,
    6,
    3,
    6,
    7, // top
  ]);

  // itemSize = 3 because there are 3 values (components) per vertex

  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  // const material = new THREE.MeshBasicMaterial( { color: 0xccccFF } );

  const materialShader = new THREE.ShaderMaterial({
    uniforms: {
        uBigWavesElevation:{ value: 0.2 },
    // 	time: { value: 1.0 },
    // 	resolution: { value: new THREE.Vector2() }
    },

    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    //side: THREE.DoubleSide,
   // vertexColors: true,
  });
  const mesh = new THREE.Mesh(geometry, materialShader);
  mesh.position.set(1, 1, 1);
  //scene.add(mesh);
  /**
   * Line
   */

  const pointsLine = [];
  pointsLine.push(new THREE.Vector3(-5, 0, 0));
  pointsLine.push(new THREE.Vector3(5, 0, 0));
  const geometryLine = new THREE.BufferGeometry().setFromPoints(pointsLine);
  const line = new THREE.Line(
    geometryLine,
    new THREE.LineBasicMaterial({ color: 0x888888 })
  );
  scene.add(line);

  /**
   * E Line
   */

  /**
   * Buffer Plane
   */
  const geometryPlane = new THREE.BufferGeometry();

  const indicesPlane = [];

  const verticesPlane = [];
  const normals = [];
  const colors = [];

  const size = 20;
  const segments = 10;

  const halfSize = size / 2;
  const segmentSize = size / segments;

  const _color = new THREE.Color();

  // generate vertices, normals and color data for a simple grid geometry

  for (let i = 0; i <= segments; i++) {
    const y = i * segmentSize - halfSize;

    for (let j = 0; j <= segments; j++) {
      const x = j * segmentSize - halfSize;

      verticesPlane.push(x, -y, 0);
      normals.push(0, 0, 1);

      const r = x / size + 0.5;
      const g = y / size + 0.5;

      _color.setRGB(r, g, 1, THREE.SRGBColorSpace);

      colors.push(_color.r, _color.g, _color.b);
    }
  }

  // generate indices (data for element array buffer)

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * (segments + 1) + (j + 1);
      const b = i * (segments + 1) + j;
      const c = (i + 1) * (segments + 1) + j;
      const d = (i + 1) * (segments + 1) + (j + 1);

      // generate two faces (triangles) per iteration

      indicesPlane.push(a, b, d); // face one
      indicesPlane.push(b, c, d); // face two
    }
  }

  //

  geometryPlane.setIndex(indicesPlane);
  geometryPlane.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(verticesPlane, 3)
  );
  geometryPlane.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(normals, 3)
  );
  geometryPlane.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  // itemSize = 3 because there are 3 values (components) per vertex
  //geometryPlane.setAttribute( 'position', new THREE.BufferAttribute( verticesPlane, 3 ) );

  const plane = new THREE.Mesh(geometryPlane, materialShader);
  plane.rotation.x = -Math.PI / 2;

  plane.position.set(1, 0.1, 1);
  //scene.add(plane);

  /**
   * E Buffer Plane
   */

  /**
   * Test Plane
   */
  const geometryTest = new THREE.PlaneGeometry( 10, 10,100,100 );
  const planeTest = new THREE.Mesh( geometryTest, materialShader );
  planeTest.rotation.x = -Math.PI / 2;

scene.add( planeTest );

  const controls = new OrbitControls(camera, renderer.domElement);
  //const loader = new GLTFLoader();
  controls.update();

  function animate() {
    // mesh.rotation.y += 0.01
    requestAnimationFrame(animate);
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);
  }

  animate();
}
