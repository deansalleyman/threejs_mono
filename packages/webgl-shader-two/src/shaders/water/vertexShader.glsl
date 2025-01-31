uniform float uBigWavesElevation;
void main() {


vec4 modalPosition = modelViewMatrix * vec4(position, 1.0);
modalPosition.y +=sin(modalPosition.y * 10.0) * uBigWavesElevation;
vec4 viewPosition = viewMatrix * modalPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;
gl_Position = projectedPosition;
}