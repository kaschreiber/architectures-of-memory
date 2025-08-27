import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as dat from "dat.gui";
import Doors from "./Doors.jsx";
import { RigidBody } from "@react-three/rapier";

const Jail = () => {
  const [
    doorModel,
    doorLeftModel,
    base,
    ceiling,
    floor,
    mainDoor,
    cell01,
    cell02,
    cell03,
    cell04,
    cell05,
    wireframeBase,
  ] = useLoader(GLTFLoader, [
    "./door.glb",
    "./door_left.glb",
    "./base.glb",
    "./ceiling.glb",
    "./floor.glb",
    "./main_door.glb",
    "./cell01.glb",
    "./model02.glb",
    "./model03.glb",
    "./model04.glb",
    "./model05.glb",
    "./wireframe_base.glb",
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
  const cell01Ref = useRef();

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
      {/*add area light*/}
      <rectAreaLight />
      <Doors
        doorTextures={doorTextures}
        doorModel={doorModel}
        doorLeftModel={doorLeftModel}
      />
      <RigidBody type="fixed" colliders="trimesh">
        <primitive object={base.scene} scale={1.0} />
      </RigidBody>
      {/*<primitive object={wireframeBase.scene} scale={1.0} />*/}
      <primitive object={ceiling.scene} scale={1.0} />
      <RigidBody type="fixed" colliders="hull">
        <primitive object={floor.scene} scale={1.0} />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh" friction={0} restitution={0}>
        <primitive object={mainDoor.scene} scale={1.0} />
      </RigidBody>
      <primitive
        ref={cell01Ref}
        object={cell01.scene}
        scale={1.0}
        position={[0, 0, 0]}
      />
      <primitive object={cell02.scene} scale={1.0} position={[0, 0, 0]} />
      <primitive object={cell03.scene} scale={1.0} position={[0, 0, 0]} />
      <primitive object={cell04.scene} scale={1.0} position={[0, 0, 0]} />
      <primitive object={cell05.scene} scale={1.0} position={[0, 0, 0]} />
    </group>
  );
};

export default Jail;
