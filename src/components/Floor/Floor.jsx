import React from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const Floor = () => {
  const floorTexture = useTexture({
    map: "/textures/floor/floor-diff.jpg",
    normalMap: "/textures/floor/floor-normal.png",
    aoMap: "/textures/floor/floor-ao.jpg",
    roughnessMap: "/textures/floor/floor-rough.jpg",
    displacementMap: "/textures/floor/floor-disp.jpg",
  });

  const wallTexture = useTexture({
    map: "/textures/wall/wall-ao.jpg",
    normalMap: "/textures/wall/wall-normal.png",
    aoMap: "/textures/wall/wall-ao.jpg",
    roughnessMap: "/textures/wall/wall-rough.jpg",
    displacementMap: "/textures/wall/wall-disp.jpg",
  });
  wallTexture.encoding = THREE.sRGBEncoding;
  wallTexture.needsUpdate = true;

  return (
    <>
      <mesh position={[0, 1.5, -5]}>
        <planeGeometry args={[10, 5, 100, 100]} />
        <meshStandardMaterial
          emissiveIntensity={0.1}
          emissive="white"
          {...wallTexture}
          displacementScale={0.06}
        />
      </mesh>
      <mesh position={[0, 1.5, 5]} rotation-x={Math.PI}>
        <planeGeometry args={[10, 5, 100, 100]} />
        <meshStandardMaterial
          emissiveIntensity={0.1}
          emissive="white"
          {...wallTexture}
          displacementScale={0.06}
        />
      </mesh>
      <mesh position-y={-1} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[10, 10, 100, 100]} />
        <meshStandardMaterial {...floorTexture} displacementScale={0.06} />
      </mesh>
    </>
  );
};

export default Floor;
