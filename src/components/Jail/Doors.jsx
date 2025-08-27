import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

const Doors = ({ doorTextures, doorModel, doorLeftModel }) => {
  const doors = useMemo(() => [
    {
      position: [0, 0, 0],
      textureIndex: 0,
      rotationY: 0,
    },
    {
      position: [0, 0, 0.374],
      textureIndex: 1,
      rotationY: 0,
    },
    {
      position: [0, 0, 0.747],
      textureIndex: 2,
      rotationY: 0,
    },
    {
      position: [0, 0, 0],
      textureIndex: 3,
      rotationY: Math.PI,
    },
    {
      position: [0, 0, 0.375],
      textureIndex: 4,
      rotationY: Math.PI,
    },
    {
      position: [0, 0, 0.748],
      textureIndex: 5,
      rotationY: Math.PI,
    },
  ]);

  return doors.map((door, index) => {
    const doorClone = useMemo(() => {
      let clone;
      if (index < 3) {
        clone = doorModel.scene.children[0].clone();
      } else {
        clone = doorLeftModel.scene.children[0].clone();
      }
      clone.translateX(door.position[0]);
      clone.translateY(door.position[1]);
      clone.translateZ(door.position[2]);
      // clone.rotation.y = door.rotationY;
      return clone;
    }, [doorModel]);

    useEffect(() => {
      const texture = doorTextures[door.textureIndex].clone();
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      doorClone.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
          child.material.needsUpdate = true;
        }
      });
    }, [doorClone, door.textureIndex, doorTextures]);

    return (
      <RigidBody type="fixed" colliders="trimesh" friction={0} restitution={0}>
        <primitive key={index} object={doorClone} scale={1.0} />
      </RigidBody>
    );
  });
};

export default Doors;
