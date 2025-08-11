import triangleTextVertexShader from "../../shaders/triangleText/vertex.glsl";
import triangleTextFragmentShader from "../../shaders/triangleText/fragment.glsl";
import { shaderMaterial, useFont } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import { useControls } from "leva";
import usePhases, { PHASE } from "../../stores/usePhases.jsx";

const TriangleTextMaterial = shaderMaterial(
  {
    uAmplitude: 0.0,
    uTransparency: 0.0,
  },
  triangleTextVertexShader,
  triangleTextFragmentShader,
);

extend({ TriangleTextMaterial });
const TriangleText = () => {
  const font = useFont("./fonts/CourierPrimeRegular.json");
  const triangleGeometry = useRef();
  const triangleMaterial = useRef();
  const controls = useControls({
    amplitude: { value: 0, min: -10, max: 50 },
    transparency: { value: 1.0, min: 0, max: 1 },
  });
  const phase = usePhases((state) => state.phase);
  let startExperienceTime = 0;

  useFrame((state, delta) => {
    if (phase === PHASE.EXPERIENCE) {
      if (startExperienceTime === 0)
        startExperienceTime = state.clock.elapsedTime;

      const elapsedTime = state.clock.elapsedTime - startExperienceTime;
      triangleMaterial.current.uAmplitude = Math.pow(elapsedTime, 4) * 0.01;
    }
  });

  useEffect(() => {
    if (!triangleGeometry.current) return;

    let textGeometry = new TextGeometry("Hello World", {
      font,
      size: 0.5,
      depth: 0.1,
      curveSegments: 3,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 2,
    });

    textGeometry.center();

    const tesselModifier = new TessellateModifier(8, 6);
    textGeometry = tesselModifier.modify(textGeometry);

    const numFaces = textGeometry.attributes.position.count / 3;

    const colors = new Float32Array(numFaces * 3 * 3);
    const displacement = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();

    for (let f = 0; f < numFaces; f++) {
      const index = 9 * f;

      const h = 0.2 * Math.random();
      const s = 0.5 + 0.5 * Math.random();
      const l = 0.5 + 0.5 * Math.random();

      color.setHSL(h, s, l);

      const d = 10 * (0.5 - Math.random());

      for (let i = 0; i < 3; i++) {
        colors[index + 3 * i] = color.r;
        colors[index + 3 * i + 1] = color.g;
        colors[index + 3 * i + 2] = color.b;

        displacement[index + 3 * i] = d;
        displacement[index + 3 * i + 1] = d;
        displacement[index + 3 * i + 2] = d;
      }
    }

    textGeometry.setAttribute(
      "customColor",
      new THREE.BufferAttribute(colors, 3),
    );
    textGeometry.setAttribute(
      "displacement",
      new THREE.BufferAttribute(displacement, 3),
    );

    triangleGeometry.current.geometry = textGeometry;
  }, [font]);

  return (
    <mesh ref={triangleGeometry}>
      <triangleTextMaterial
        ref={triangleMaterial}
        uAmplitude={controls.amplitude}
        uTransparency={controls.transparency}
        transparent={true}
      />
    </mesh>
  );
};

export default TriangleText;
