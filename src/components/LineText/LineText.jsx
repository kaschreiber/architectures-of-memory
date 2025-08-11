import { shaderMaterial, useFont } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import lineTextVertexShader from "../../shaders/lineText/vertex.glsl";
import lineTextFragmentShader from "../../shaders/lineText/fragment.glsl";

const LineTextMaterial = shaderMaterial(
  {
    uColor: new THREE.Color("#ffffff"),
    uAmplitude: 0,
    uOpacity: 1,
  },
  lineTextVertexShader,
  lineTextFragmentShader,
);

extend({ LineTextMaterial });

const LineText = ({ text, positionY }) => {
  // const font = useFont("./fonts/helvetica-regular.typeface.json");
  const font = useFont("./fonts/CourierPrimeRegular.json");
  const lineGeometry = useRef();
  const lineMaterial = useRef();

  useFrame((state, delta) => {
    if (!lineMaterial.current) return;

    const time = Date.now() * 0.001;

    lineMaterial.current.uAmplitude = Math.sin(0.7 * time);

    const attributes = lineGeometry.current.geometry.attributes;
    const array = attributes.displacement.array;

    for (let i = 0, l = array.length; i < l; i += 3) {
      array[i] = 0.02 * Math.sin(0.1 * i + time);
      array[i + 1] = 0.02 * Math.cos(0.1 * i + time);
      array[i + 2] = 0.02 * Math.sin(0.1 * i + time);
      /*      array[i] += 0.002 * (0.5 - Math.random());
      array[i + 1] += 0.002 * (0.5 - Math.random());
      array[i + 2] += 0.002 * (0.5 - Math.random());*/
    }

    attributes.displacement.needsUpdate = true;
  });

  useEffect(() => {
    if (!lineGeometry.current) return;

    const textGeometry = new TextGeometry(text, {
      font,
      size: 0.5,
      depth: 0.1,
      curveSegments: 2,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 2,
    });

    textGeometry.center();

    const count = textGeometry.attributes.position.count;
    const displacement = new THREE.Float32BufferAttribute(count * 3, 3);
    textGeometry.setAttribute("displacement", displacement);

    const customColor = new THREE.Float32BufferAttribute(count * 3, 3);
    textGeometry.setAttribute("customColor", customColor);

    const color = new THREE.Color(0xffffff);
    for (let i = 0; i < customColor.count; i++) {
      color.setHSL(0.65, 0.15, 0.3);
      color.toArray(customColor.array, i * customColor.itemSize);
    }

    lineGeometry.current.geometry = textGeometry;
  }, [font]);

  return (
    <mesh ref={lineGeometry} position={[0, positionY + 1.0, 0]}>
      <lineTextMaterial
        ref={lineMaterial}
        depthTest={false}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default LineText;
