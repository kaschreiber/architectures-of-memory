import React from "react";
import LineText from "./LineText.jsx";
import { Center, Text3D, useFont } from "@react-three/drei";

const MultiLineText = ({ text, normal = false }) => {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => {
        return normal ? (
          <Center position={[0, -index * 0.6 + 0.5, 0.0]}>
            <Text3D
              key={index}
              font="./fonts/CourierPrimeRegular.json"
              size={0.5}
              depth={0.1}
            >
              {line}
              <meshPhysicalMaterial roughness={0.9} thickness={1.0} />
            </Text3D>
          </Center>
        ) : (
          <LineText key={index} text={line} positionY={-index * 0.7} />
        );
      })}
    </>
  );
};

export default MultiLineText;
