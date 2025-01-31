 uniform vec2 resolution;
     uniform int time; 
     
     varying vec2 vUv;

void main() {

      vec3 colorA = vec3(vUv.x,vUv.x,1.0);
      vec3 colorB = vec3(vUv.y,vUv.y,1.0);

      float wave = sin( float(time) * 0.1 ); // sin take float, so float( time )

      vec3 color = mix(colorA , colorB, wave );
                
      gl_FragColor  = vec4( color, 1.0);;
}