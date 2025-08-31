import React, { useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";
import { useDrag } from "react-use-gesture";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Background } from "./Background.jsx";
import { useTabs } from "./useTab.jsx";

export const WebExperience = () => {
  const { viewport, size } = useThree();
  const { activeTab } = useTabs();
  const euler = useMemo(() => new THREE.Euler(), []);
  const [spring, set] = useSpring(() => ({
    rotation: [0, 0, 0],
  }));

  const [cell01] = useLoader(GLTFLoader, ["./centered_model01.glb"]);

  // Modell zentrieren
  useMemo(() => {
    const box = new THREE.Box3().setFromObject(cell01.scene);
    const center = box.getCenter(new THREE.Vector3());
    cell01.scene.position.sub(center); // Mittelpunkt auf Ursprung setzen
  }, [cell01]);

  const bind = useDrag(({ delta: [dx, dy] }) => {
    euler.y += (dx / size.width) * 20;
    euler.x += (dy / size.width) * 20;
    euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 2, Math.PI / 2);
    set({ rotation: euler.toArray().slice(0, 3) });
  });

  return (
    <>
      <Background />
      {activeTab === "cell" && (
        <group
          {...bind()}
          position={[-viewport.width / 3, -2 * viewport.height, 0]}
          rotation={[0, 1.75 * Math.PI, 0]}
        >
          <Float>
            <a.primitive
              object={cell01.scene}
              scale={7.0}
              position={[2, -1, 0]}
              rotation={spring.rotation}
            />
          </Float>
        </group>
      )}
    </>
  );
};
