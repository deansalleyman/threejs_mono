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

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
  );
  plane.rotation.x = 90 * -(Math.PI/180) //-Math.PI / 2;

  /**!SECTIONEquiviant
   * 
   * 90 * -(Math.PI/180)
   * -Math.PI / 2
   */

  plane.position.set(1, -0.1, 1);
  scene.add(plane);

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

  const material = new THREE.MeshBasicMaterial({ color: 0xccccff, side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
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
   * Tetrahedon
   */

  const materialTet = new THREE.MeshNormalMaterial();
  const geometryTet = new THREE.BufferGeometry();
  // const pointsTet = [
  //     new THREE.Vector3(-1, 1, -1), //c
  //     new THREE.Vector3(-1, -1, 1), //b
  //     new THREE.Vector3(1, 1, 1), //a

  //     new THREE.Vector3(1, 1, 1), //a
  //     new THREE.Vector3(1, -1, -1), //d
  //     new THREE.Vector3(-1, 1, -1), //c

  //     new THREE.Vector3(-1, -1, 1), //b
  //     new THREE.Vector3(1, -1, -1), //d
  //     new THREE.Vector3(1, 1, 1), //a

  //     new THREE.Vector3(-1, 1, -1), //c
  //     new THREE.Vector3(1, -1, -1), //d
  //     new THREE.Vector3(-1, -1, 1), //b
  // ]
  const pointsTet = new Float32Array([
    -1,
    1,
    -1, //c
    -1,
    -1,
    1, //b
    1,
    1,
    1, //a

    1,
    1,
    1, //a
    1,
    -1,
    -1, //d
    -1,
    1,
    -1, //c

    -1,
    -1,
    1, //b
    1,
    -1,
    -1, //d
    1,
    1,
    1, //a

    -1,
    1,
    -1, //c
    1,
    -1,
    -1, //d
    -1,
    -1,
    1, //b
  ]);

  // const indicesTet = new Uint16Array([
  //     0, 1, 2,  0, 2, 3, // back
  //     4, 5, 6,  4, 6, 7, // front
  //     0, 3, 7,  0, 7, 4, // left
  //     1, 2, 6,  1, 6, 5, // right
  //     0, 1, 5,  0, 5, 4, // bottom
  //     3, 2, 6,  3, 6, 7  // top
  // ]);

  //geometryTet.setFromPoints(pointsTet);

  geometryTet.setAttribute("position", new THREE.BufferAttribute(pointsTet, 3));
  //geometryTet.setIndex(new THREE.BufferAttribute(indicesTet, 1));
  geometryTet.computeVertexNormals();

  const meshTet = new THREE.Mesh(geometryTet, materialTet);

  meshTet.position.z = 5;
  meshTet.position.y = 1;
  meshTet.rotation.x = -Math.PI / 2;
  scene.add(meshTet);

  /**
   * Triangle test
   */

  const geometryTri = new THREE.BufferGeometry();
  //set vertex postions
  const data_pos = new Float32Array([-1, 0, 0, 1, 0, 0, 1, 1, 0]);
  geometryTri.setAttribute("position", new THREE.BufferAttribute(data_pos, 3));

  //set normals
  const data_normal = new Float32Array([0, -0, 1, 0, -0, 1, 0, -0, 1]);
  geometryTri.setAttribute("normal", new THREE.BufferAttribute(data_normal, 3));

  // set UVs

  const uvs = new Float32Array([ 0, 1, 1,0, 0, 1]);
  geometryTri.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

  const meshTri = new THREE.Mesh(geometryTri, materialShader);

  meshTri.position.y = 1;
  scene.add(meshTri);


  //-------- ----------
// ARRAY OF MATERIALS
//-------- ----------
const materialsG = [
  new THREE.MeshBasicMaterial({
      color: 'red',
      side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
      color: 'lime',
      side: THREE.DoubleSide
  })
];
//-------- ----------
// GEOMETRY - with groups
//-------- ----------
const geometryG = new THREE.BufferGeometry();
const verticesG = new Float32Array([
          0, 0, 0, // triangle 1
          1, 0, 0,
          1, 1, 0,
          0, 0, 0, // triangle 2
          0, 1, 0,
          1, 1, 0
      ]);
// create position property
geometryG.setAttribute('position', new THREE.BufferAttribute(verticesG, 3));
// add groups, and set material index values
geometryG.addGroup(0, 3, 1);
geometryG.addGroup(3, 3, 0);

const geoMulti = new THREE.Mesh( geometryG, materialsG);

geoMulti.position.x = 1;
scene.add(geoMulti);


/**
 * Geo with few vertices
 */

//-------- ----------
// CUSTOM GEO WITH JUST A POSITION, AND NORMAL ATTRIBUTES
//-------- ----------
const geometry1 = new THREE.BufferGeometry();
// position array of 4 points
const pos1 = new THREE.BufferAttribute(
    new Float32Array([
        0,-3, 0,  // 0
        0, 3, 0,  // 1
       -5, 0, 0,  // 2
        0, 0,-5   // 3
    ]),
    3    // 3 numbers for every item in the buffer attribute ( x, y, z)
);
geometry1.setAttribute('position', pos1);
// using computeVertexNormals to create normal attribute
geometry1.computeVertexNormals();
//-------- ----------
//CREATING AN INDEX BY USING THE setIndex METHOD AND PASSING AN ARRAY
//-------- ----------
// drawing 2 trangles with just 4 points in the position attribute by giving an
// array of index values for points in the position attribute to the setIndex method
geometry1.setIndex( [
  0,1,2,
  0,1,3,
  3,2,1
] );
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const mesh1 = new THREE.Mesh(geometry1, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }) );
mesh1.position.x=-2;
mesh1.position.y=2;
scene.add(mesh1);


/**
 * Shading for indexed obj
 */

/**
 * Twist modifier
 */

function twist(geometry:THREE.BufferGeometry, factor:number) {
  const q = new THREE.Quaternion()
  const up = new THREE.Vector3(0, 1, 0)
  const p = geometry.attributes.position.array

  for (let i = 0; i < p.length; i += 3) {
      q.setFromAxisAngle(up, p[i + 1] * factor)

      const vec = new THREE.Vector3(p[i], p[i + 1], p[i + 2])
      vec.applyQuaternion(q)

      p[i] = vec.x
      p[i + 2] = vec.z
  }

  geometry.computeVertexNormals()
  geometry.attributes.position.needsUpdate = true
}

let geometryTwist = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10)
twist(geometryTwist,0)// Math.PI / 2
const twistedCube = new THREE.Mesh(
  geometryTwist,
  new THREE.MeshNormalMaterial({
      wireframe: true
  })
)
scene.add(twistedCube);




  //-------- ----------
  // VERTEX HELPERS
  //-------- ----------

  const vertHelpermesh1 = new VertexNormalsHelper(mesh1, 0.5, 0x00ff00);
  scene.add(vertHelpermesh1);

  const vertHelper1 = new VertexNormalsHelper(meshTri, 0.5, 0x00ff00);
  scene.add(vertHelper1);

  const vertHelpermeshTet = new VertexNormalsHelper(meshTet, 0.5, 0x00ff00);
  scene.add(vertHelpermeshTet);

  // Vertex

  const controls = new OrbitControls(camera, renderer.domElement);
  const loader = new GLTFLoader();
  controls.update();

  const data ={
    t: 0// Math.PI / 2
  }

  const gui = new GUI();



  const meshFolder = gui.addFolder("Cube");
  meshFolder.add(mesh.rotation, "x", 0, Math.PI * 2);
  meshFolder.add(mesh.rotation, "y", 0, Math.PI * 2);
  meshFolder.add(mesh.rotation, "z", 0, Math.PI * 2);
  meshFolder.open();

  const dataTet = {
    x: 1,
  };

  const meshTetGui = gui.addFolder("Tetrahedon");
  meshTetGui.add(dataTet, "x", -5, -1, 0.01).onChange(() => {
    geometryTet.attributes.position.array[3] = dataTet.x;
    geometryTet.attributes.position.needsUpdate = true;
  });
  meshTetGui.open();

  const twistGUI = gui.addFolder("Twist");
  twistGUI.add(data, 't', -Math.PI, Math.PI, 0.01).onChange((t) => {
    twistedCube.geometry.dispose()
    geometryTwist = new THREE.BoxGeometry(10, 10, 10, 10, 10, 10)
    twist(geometryTwist, t)
    twistedCube.geometry = geometryTwist;
})

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
