import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { CrossHatchMaterial, generateParams } from "./CrossHatchMaterial.js";
import * as dat from "dat.gui";

const BookPhotogrammetry = () => {
  const model = useLoader(GLTFLoader, "./door03.glb");
  const bakedTexture = useLoader(THREE.TextureLoader, "/Final_Door3.jpg");
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;
  const groupRef = useRef();
  const guiRef = useRef();

  useEffect(() => {
    if (!model.scene) return;

    const edgeLines = [];
    //const gui = new dat.GUI();
    //guiRef.current = gui;

    // const material = new THREE.MeshStandardMaterial({ color: "white" });
    //const material = new THREE.MeshNormalMaterial();
    const material = new THREE.MeshBasicMaterial({ map: bakedTexture });
    // const material = new CrossHatchMaterial({
    //   color: 0x808080,
    //   inkColor: 0x3e3330,
    //   roughness: 0.6,
    //   metalness: 0.3,
    //   side: THREE.DoubleSide,
    //   e: 0.26,
    // });

    // Rufe die Funktion auf, um die GUI für die Parameter zu generieren
    //generateParams(gui, material);

    // Apply the material to the model
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });

    // model.scene.traverse((child) => {
    //   if (child.isMesh) {
    //     const geometry = child.geometry;
    //
    //     // Erstelle eine Instanz von CrossHatchMaterial und setze sie als Material
    //     child.material = material;
    //
    //     // 1. Kanten-Geometrie erzeugen
    //     const edges = new THREE.EdgesGeometry(geometry);
    //     const lineMaterial = new THREE.LineBasicMaterial({ color: "black" });
    //     const lines = new THREE.LineSegments(edges, lineMaterial);
    //
    //     // 2. Matrix übernehmen (Welttransformation!)
    //     child.updateWorldMatrix(true, false);
    //     lines.applyMatrix4(child.matrixWorld);
    //
    //     // 3. Speichern für späteres Entfernen
    //     edgeLines.push(lines);
    //   }
    // });
    //
    // // 4. Alle Linien zur Szene hinzufügen
    // edgeLines.forEach((line) => groupRef.current.add(line));

    // Cleanup bei Unmount
    // return () => {
    //   edgeLines.forEach((line) => groupRef.current.remove(line));
    //   if (guiRef.current) {
    //     guiRef.current.destroy(); // GUI zerstören, wenn die Komponente unmontiert wird
    //   }
    // };
  }, [model]);

  return (
    <group ref={groupRef}>
      <primitive object={model.scene} scale={10.0} />
    </group>
  );
};

export default BookPhotogrammetry;
