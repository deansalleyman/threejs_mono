//these are injected automatically by the ShaderMaterial
//we dont see them but lets list them:
//attribute vec3 position; //courtesy of THREE.BufferGeometry
//uniform


void main() {
  //we cast the vec3 attribute position into a vec4
  //why .w is 1 is a topic on its own, but it represents 
  //a position in space, versus a direction
  vec4 _position = vec4( position, 1.); 
  //next we need to tell this vertex to be somewhere in 3d space
  //this is the contract we accept when working with a scene graph
  //the modelMatrix represents the position of our Mesh and all
  //the parents above it:
  vec4 worldPosition = modelMatrix * _position; 
  //next we get information from the render(scene,CAMERA)
  //the camera used for that call gives us the viewMatrix uniform
  //this transforms the world (through this vertex) into something
  //called "camera space" or "view space"
  vec4 viewPosition = viewMatrix * worldPosition;
  //this space is suitable for further transformations so we
  //apply the projectionMatrix 
  vec4 perspectiveSpace = projectionMatrix * viewPosition;
  //finally we write the result into a built-in GLSL variable
  gl_Position = perspectiveSpace; 

}