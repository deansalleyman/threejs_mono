varying vec2 vUv;

void main() {
   // pattern 3
   // float strength = vUv.x;

   // pattern 4
   // float strength = vUv.y;

   // pattern 5
   // float strength = vUv.y * 5.0;

   // pattern 7
   float strength = mod(vUv.y * 5.0, 0.5 );

   gl_FragColor = vec4(strength, strength, strength, 1.0);
}