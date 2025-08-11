precision highp float;

uniform sampler2D tDiffuse;   // Das gerenderte Bild (für Postprocessing)
uniform vec2 resolution;      // Auflösung des Viewports
uniform float scale;          // Linien-Skalierung
uniform float radius;         // Linien-Radius
uniform vec2 range;           // Kontrastbereich
uniform vec2 range2;          // Linienfrequenz

varying vec2 vUv;

float luma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

float luma(vec4 color) {
    return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}

float lines(float l, vec2 fragCoord, vec2 resolution, vec2 range, vec2 range2, float scale, float radius) {
    vec2 center = resolution * 0.5;
    vec2 d = fragCoord - center;
    float r = length(d) / 1000.0;
    float a = atan(d.y, d.x) + scale * (radius - r) / radius;
    vec2 uvt = center + r * vec2(cos(a), sin(a));

    float c = range2.x + range2.y * sin(uvt.x * 1000.0);
    float f = smoothstep(range.x * c, range.y * c, l);
    f = smoothstep(0.0, 0.5, f);

    return f;
}

void main() {
    vec4 texColor = texture2D(tDiffuse, vUv);
    float intensity = luma(texColor);
    float effect = lines(intensity, gl_FragCoord.xy, resolution, range, range2, scale, radius);
    gl_FragColor = vec4(vec3(effect), 1.0);
}
