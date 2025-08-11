import * as THREE from "three";
import fragmentShader from "../../shaders/pencilLine/fragment.glsl";
import vertexShader from "../../shaders/pencilLine/vertex.glsl";

export class PencilLinesMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        tDiffuse: { value: null },
        uResolution: {
          value: new THREE.Vector2(1, 1),
        },
      },
      fragmentShader,
      vertexShader,
    });
  }
}
