import { Perf } from "r3f-perf";
import { Environment, OrbitControls } from "@react-three/drei";
import BookPhotogrammetry from "./components/BookPhotogrammetry/BookPhotogrammetry.jsx";
import { useEffect, useRef } from "react";
import { Torus } from "./components/Torus/Torus.jsx";
import { extend, useThree } from "@react-three/fiber";
import { PencilLinesPass } from "./components/Torus/PencilLinesPass.jsx";
import { RenderPass } from "postprocessing";
import { EffectComposer } from "@react-three/postprocessing";
import PencilLinesEffect from "./components/Torus/PencilLinesEffect.jsx";

extend({ RenderPass, PencilLinesPass });

export default function Experience() {
  const { scene, camera, size } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(0.036, 1.55, 5.63); // <- hier deine Start-Position (x, y, z)
      controlsRef.current.target.set(0.009, 0.371, -0.077); // <- hier dein Zielpunkt (x, y, z)
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
      <Perf position="bottom-left" />
      <OrbitControls ref={controlsRef} makeDefault />
      <Environment files="environment/office.hdr" />

      <directionalLight
        castShadow={true}
        position={[0.1, 5.5, -0.1]}
        intensity={6.5}
        color={"#ffffff"}
      />
      <BookPhotogrammetry />
      {/*<Torus />*/}

      <EffectComposer>
        <renderPass
          attach="passes-0"
          args={[scene, camera]}
          renderToScreen={false}
        />
        {/*<primitive object={new PencilLinesEffect()} attach="passes-1" />*/}
        {/*<primitive*/}
        {/*  object={new PencilLinesPass(size.width, size.height)}*/}
        {/*  attach="passes-1"*/}
        {/*/>*/}
        {/*<pencilLinesPass*/}
        {/*  attach="passes-1"*/}
        {/*  args={[{ width: size.width, height: size.height }]}*/}
        {/*  renderToScreen={true}*/}
        {/*/>*/}
      </EffectComposer>
    </>
  );
}
