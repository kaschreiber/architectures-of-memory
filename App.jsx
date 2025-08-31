import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { ScrollManager } from "./src/helper/ScrollManager.jsx";
import { MotionConfig } from "framer-motion";
import { Interface } from "./src/Interface/Interface.jsx";
import { WebExperience } from "./src/WebExperience.jsx";

function App() {
  const [section, setSection] = useState(0);

  return (
    <>
      <MotionConfig
        transition={{
          type: "spring",
          mass: 5,
          stiffness: 500,
          damping: 50,
          restDelta: 0.0001,
        }}
      >
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
          <color attach="background" args={["#E7ECEF"]} />
          <ScrollControls pages={4} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <WebExperience setSection={setSection} />
            </Scroll>
            <Scroll html>
              <Interface setSection={setSection} />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </MotionConfig>
    </>
  );
}

export default App;
