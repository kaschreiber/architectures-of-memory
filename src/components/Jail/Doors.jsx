import React, { useEffect, useMemo } from "react";
import * as THREE from "three";

const Doors = ({ doors, doorTextures, doorModel, doorLeftModel }) => {
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

    return <primitive key={index} object={doorClone} scale={1.0} />;
  });
};

export default Doors;
