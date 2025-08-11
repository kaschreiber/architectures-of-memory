import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import pencilLineFragmentShader from "../../shaders/pencilLine/fragment.glsl";
import pencilLineVertexShader from "../../shaders/pencilLine/vertex.glsl";
import { Pass } from "postprocessing";
import { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass.js";

const PencilLinesMaterial = shaderMaterial(
  {
    tDiffuse: { value: null },
    uResolution: {
      value: new THREE.Vector2(1, 1),
    },
  },
  pencilLineVertexShader,
  pencilLineFragmentShader,
);

extend({ PencilLinesMaterial });

export class PencilLinesPass extends Pass {
  constructor({ width, height }) {
    super();

    this.material = new PencilLinesMaterial();
    this.fsQuad = new FullScreenQuad(this.material);

    this.material.uniforms.uResolution.value = new THREE.Vector2(width, height);
  }

  render(renderer, writeBuffer, readBuffer) {
    this.material.uniforms.tDiffuse.value = writeBuffer.texture;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.fsQuad.render(renderer);
    }
  }

  dispose() {
    this.material.dispose();
    this.fsQuad.dispose();
  }
}
