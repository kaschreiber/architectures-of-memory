import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface/Interface.jsx";
import { KeyboardControls } from "@react-three/drei";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        style={{ background: "black" }}
        shadows
        camera={{
          fov: 60,
          near: 0.01,
          far: 200,
          // position: [-6, 2, 0],
        }}
      >
        <fog color="#161616" attach="fog" near={8} far={30} />
        <Experience />
      </Canvas>
      <Interface />
    </KeyboardControls>
  </>,
);
