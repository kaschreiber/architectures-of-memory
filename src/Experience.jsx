import { Perf } from "r3f-perf";
import { Environment, OrbitControls } from "@react-three/drei";
import Jail from "./components/Jail/Jail.jsx";
import { useEffect, useRef } from "react";

export default function Experience() {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(-0.003, 0.22, 0.111); // <- hier deine Start-Position (x, y, z)
      controlsRef.current.target.set(0.008, 0.225, -0.106); // <- hier dein Zielpunkt (x, y, z)
      controlsRef.current.update();
    }
    const handleKeyDown = (event) => {
      if (event.key === "p") {
        // z.B. Taste "p" für "Position"
        const controls = controlsRef.current;
        if (controls) {
          console.log("Kamera-Position:", controls.object.position);
          console.log("OrbitControls Target:", controls.target);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // CleanUp bei Unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/*<Perf position="bottom-left" />*/}
      <OrbitControls ref={controlsRef} makeDefault />
      <Environment files="environment/office.hdr" />
      <directionalLight
        castShadow={true}
        position={[0.1, 5.5, -0.1]}
        intensity={10}
        color={"#ffffff"}
      />
      <Jail />
    </>
  );
}
