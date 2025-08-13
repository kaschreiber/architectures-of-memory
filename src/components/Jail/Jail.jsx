import React, { useEffect, useMemo, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as dat from "dat.gui";
import Doors from "./Doors.jsx";

const Jail = () => {
  const [doorModel, doorLeftModel, base, ceiling, floor, mainDoor, cell01] =
    useLoader(GLTFLoader, [
      "./door.glb",
      "./door_left.glb",
      "./base.glb",
      "./ceiling.glb",
      "./floor.glb",
      "./main_door.glb",
      "./model01.glb",
    ]);
  const doorTextures = useLoader(THREE.TextureLoader, [
    "/door_texture.jpg",
    "/door02_texture.jpg",
    "/door03_texture.jpg",
    "/door04_texture.jpg",
    "/door05_texture.jpg",
    "/door06_texture.jpg",
  ]);
  const [baseTexture, ceilingTexture, floorTexture, mainDoorTexture] =
    useLoader(THREE.TextureLoader, [
      "/base_texture.jpg",
      "/ceiling_texture.jpg",
      "/floor_texture.jpg",
      "/maindoor_texture.jpg",
    ]);
  [
    ...doorTextures,
    baseTexture,
    ceilingTexture,
    floorTexture,
    mainDoorTexture,
  ].forEach((tex) => {
    tex.flipY = false;
    tex.colorSpace = THREE.SRGBColorSpace;
  });
  const groupRef = useRef();
  const guiRef = useRef();

  const doors = useMemo(() => [
    {
      position: [0, 0, 0],
      textureIndex: 0,
      rotationY: 0,
    },
    {
      position: [0, 0, 0.372],
      textureIndex: 1,
      rotationY: 0,
    },
    {
      position: [0, 0, 0.744],
      textureIndex: 2,
      rotationY: 0,
    },
    {
      position: [0, 0, 0],
      textureIndex: 3,
      rotationY: Math.PI,
    },
    {
      position: [0, 0, 0.384],
      textureIndex: 4,
      rotationY: Math.PI,
    },
    {
      position: [0, 0, 0.756],
      textureIndex: 5,
      rotationY: Math.PI,
    },
  ]);

  useEffect(() => {
    if (!base?.scene || !ceiling?.scene || !floor?.scene || !mainDoor?.scene)
      return;

    const baseMaterial = new THREE.MeshBasicMaterial({ map: baseTexture });
    const ceilingMaterial = new THREE.MeshBasicMaterial({
      map: ceilingTexture,
    });
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
    const mainDoorMaterial = new THREE.MeshBasicMaterial({
      map: mainDoorTexture,
    });

    // Apply the material to the model
    base.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = baseMaterial;
      }
    });

    ceiling.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = ceilingMaterial;
      }
    });

    floor.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = floorMaterial;
      }
    });

    mainDoor.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = mainDoorMaterial;
      }
    });
  }, [
    doorModel,
    base,
    ceiling,
    floor,
    mainDoor,
    baseTexture,
    ceilingTexture,
    floorTexture,
    mainDoorTexture,
  ]);

  return (
    <group ref={groupRef}>
      <Doors
        doors={doors}
        doorTextures={doorTextures}
        doorModel={doorModel}
        doorLeftModel={doorLeftModel}
      />
      <primitive object={base.scene} scale={1.0} />
      {/*<primitive object={ceiling.scene} scale={1.0} />*/}
      <primitive object={floor.scene} scale={1.0} />
      <primitive object={mainDoor.scene} scale={1.0} />
      <primitive object={cell01.scene} scale={1.0} />
    </group>
  );
};

export default Jail;
