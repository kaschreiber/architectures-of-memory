// crossHatchFragment.glsl
uniform vec2 resolution;
uniform sampler2D paperTexture;
uniform sampler2D noiseTexture;
uniform vec3 inkColor;
uniform float e;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;

#define TAU 6.28318530718

float luma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

float noise(in vec2 x) {
    return texture2D(noiseTexture, x * 0.01).x;
}

float texh(in vec2 p, in float str) {
    float rz = 1.0;
    for (int i = 0; i < 10; i++) {
        float g = texture2D(noiseTexture, vec2(0.025, .5) * p).x;
        g = smoothstep(0.0 - str * 0.1, 2.3 - str * 0.1, g);
        rz = min(1.0 - g, rz);
        p = vec2(p.y, p.x); // rotate
        p += 0.7;
        p *= 1.52;
        if (float(i) > str) break;
    }
    return rz * 1.05;
}

float texcube(in vec3 p, in vec3 n, in float str, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 rot = mat2(c, -s, s, c);
    vec3 v = vec3(texh(rot * p.yz, str), texh(rot * p.zx, str), texh(rot * p.xy, str));
    return dot(v, n * n);
}

// basic blendDarken (float)
float blendDarken(float base, float blend) {
    return min(blend, base);
}

// vec3 version
vec3 blendDarken(vec3 base, vec3 blend) {
    return vec3(
    blendDarken(base.r, blend.r),
    blendDarken(base.g, blend.g),
    blendDarken(base.b, blend.b)
    );
}

// vec3 mit opacity
vec3 blendDarken(vec3 base, vec3 blend, float opacity) {
    return blendDarken(base, blend) * opacity + base * (1.0 - opacity);
}

void main() {
    float l = 1.0 - luma(vec3(1.0)); // placeholder brightness
    float darks = 1.0 - 2.0 * l;

    vec4 paper = texture2D(paperTexture, gl_FragCoord.xy / resolution.xy);
    vec3 coords = vWorldPosition;
    vec3 eye = normalize(-coords);
    vec3 ref = reflect(vNormal, eye);

    float line = texcube(coords, vNormal, l * 5.0, TAU / 8.0);
    float lineDark = texcube(coords, vNormal, darks * 5.0, TAU / 16.0);

    float r = 1.0 - smoothstep(l - e, l + e, line);
    float rDark = 1.0 - smoothstep(l - e, l + e, lineDark);

    vec3 finalColor = blendDarken(paper.rgb, inkColor, 0.5 * r);
    finalColor = blendDarken(finalColor, inkColor, 0.5 * rDark);

//    vec3 finalColor = vec3(0.0, 1.0, 1.0);

    gl_FragColor = vec4(lineDark, 0.0, 0.0, 1.0);
}