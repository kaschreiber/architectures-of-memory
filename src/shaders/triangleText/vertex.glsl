uniform float uAmplitude;

attribute vec3 customColor;
attribute vec3 displacement;

varying vec3 vNormal;
varying vec3 vColor;
varying float vTransparency;

void main() {

    vNormal = normal;
    vColor = customColor;

    vec3 newPosition = position + normal * uAmplitude * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}