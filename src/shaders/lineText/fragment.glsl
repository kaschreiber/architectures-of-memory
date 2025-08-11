uniform vec3 uColor;
uniform float uOpacity;

varying vec3 vColor;

void main() {
    gl_FragColor = vec4( vColor * uColor, uOpacity );
}