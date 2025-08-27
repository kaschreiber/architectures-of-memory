import React, { useEffect, useRef } from "react";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import * as dat from "dat.gui";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Player = () => {
  const player = useRef(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const guiRef = useRef();
  const [capsuleParams, setCapsuleParams] = React.useState({
    height: 0.04,
    radius: 0.05,
  });

  useEffect(() => {
    const gui = new dat.GUI();
    guiRef.current = gui;

    const folder = gui.addFolder("Player Settings");

    const playerChild = player.current;

    const params = {
      x: playerChild.translation().x,
      y: playerChild.translation().y,
      z: playerChild.translation().z,
    };

    if (!player.current) return;
    folder.add(params, "x", -0.5, 0.5, 0.01).onChange((val) => {
      playerChild.setTranslation({ x: val, y: params.y, z: params.z });
    });
    folder.add(params, "y", 0, 0.5, 0.01).onChange((val) => {
      playerChild.setTranslation({ x: params.x, y: val, z: params.z });
    });
    folder.add(params, "z", -0.5, 0.5, 0.01).onChange((val) => {
      playerChild.setTranslation({ x: params.x, y: params.y, z: val });
    });

    folder.add(capsuleParams, "height", 0.01, 0.2, 0.01).onChange((val) => {
      setCapsuleParams((prev) => ({ ...prev, height: val }));
    });
    folder.add(capsuleParams, "radius", 0.01, 0.2, 0.01).onChange((val) => {
      setCapsuleParams((prev) => ({ ...prev, radius: val }));
    });

    return () => {
      gui.destroy();
      guiRef.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = new THREE.Vector3();

    // Richtung basierend auf WASD
    if (forward) impulse.z -= 1;
    if (backward) impulse.z += 1;
    if (leftward) impulse.x += 1;
    if (rightward) impulse.x -= 1;

    // Impuls nur anwenden, wenn es Bewegung gibt
    if (impulse.lengthSq() > 0) {
      impulse.normalize(); // Einheitliche Geschwindigkeit

      // In Kamerakoordinaten transformieren
      const camDir = new THREE.Vector3();
      state.camera.getWorldDirection(camDir);
      camDir.y = 0; // Nur horizontale Richtung
      camDir.normalize();

      // Rechts-Vektor der Kamera
      const camRight = new THREE.Vector3();
      camRight.crossVectors(new THREE.Vector3(0, 1, 0), camDir).normalize();

      // Bewegungsimpuls in Weltkoordinaten
      const move = new THREE.Vector3();
      move.addScaledVector(camDir, -impulse.z); // Vorwärts/Zurück
      move.addScaledVector(camRight, impulse.x); // Links/Rechts

      const impulseStrength = 0.006 * delta;
      player.current.applyImpulse({
        x: move.x * impulseStrength,
        y: 0,
        z: move.z * impulseStrength,
      });
    }

    // Kamera auf Spielerposition setzen
    const bodyPosition = player.current.translation();
    state.camera.position.set(
      bodyPosition.x,
      bodyPosition.y + 0.09,
      bodyPosition.z,
    );
  });

  return (
    <RigidBody
      ref={player}
      colliders={false}
      mass={0.5}
      type="dynamic"
      position={[0, 0.2, -0.1]}
      friction={0}
      restitution={0}
      lockRotations
      canSleep={false}
      linearDamping={0.7}
      angularDamping={0.7}
    >
      <CapsuleCollider args={[capsuleParams.height, capsuleParams.radius]} />
    </RigidBody>
  );
};

export default Player;
