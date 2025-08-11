import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Center, Line, Text3D, useFont } from "@react-three/drei";

const Text = () => {
  const groupRef = useRef();
  const font = useFont("./fonts/CourierPrimeRegular.json");

  useFrame(({ clock }) => {
    if (groupRef?.current) {
      // groupRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.1;
      for (const line in groupRef.current.children) {
        groupRef.current.children[line].material.dashOffset =
          // clock.getElapsedTime() * 0.8;
          Math.sin(clock.getElapsedTime() * 2) * 0.25;
      }
    }
  });

  useEffect(() => {
    if (groupRef) console.log(groupRef.current);
  }, [groupRef]);

  const linePoints = useMemo(() => {
    const shapes = font?.generateShapes("Architecture of Memories", 0.5);
    let lineShapePoints = [];
    shapes.forEach((s) => {
      let points = s.getPoints();
      let points3d = [];
      points.forEach((p) => {
        points3d.push(p.x, p.y, 0.285);
      });
      lineShapePoints.push({
        points: points3d,
        sLength: s.getLength(),
      });

      if (s.holes?.length > 0) {
        s.holes.forEach((h) => {
          let holePoints = h.getPoints();
          let holePoints3d = [];
          holePoints.forEach((p) => {
            holePoints3d.push(p.x, p.y, 0.285);
          });
          lineShapePoints.push({
            points: holePoints3d,
            sLength: s.getLength(),
          });
        });
      }
    });
    return lineShapePoints;
  }, [font]);

  return (
    <Center>
      <Text3D
        font="./fonts/CourierPrimeRegular.json"
        size={0.5}
        depth={0.1}
        curveSegments={6}
        bevelEnabled={true}
        bevelThickness={0.08}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={2}
      >
        Architecture of Memories
        <meshPhysicalMaterial
          roughness={0.5}
          transmission={1.0}
          transparent={true}
          thickness={1.0}
        />
      </Text3D>
      <group ref={groupRef}>
        {linePoints.map((shape, index) => (
          <Line
            key={index}
            points={shape.points}
            lineWidth={2}
            color="#00ff00"
            dashed={true}
            dashSize={shape.sLength}
            gapSize={shape.sLength}
            dashOffset={0.0}
          />
        ))}
      </group>
    </Center>
  );
};

export default Text;
