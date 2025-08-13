import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface/Interface.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      style={{ background: "black" }}
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        // position: [-6, 2, 0],
      }}
    >
      <fog color="#161616" attach="fog" near={8} far={30} />
      <Experience />
    </Canvas>
    <Interface />
  </>,
);
