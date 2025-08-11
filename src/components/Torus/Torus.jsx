export const Torus = () => {
  return (
    <mesh>
      <torusKnotGeometry args={[1, 0.3, 200, 32]} />
      <meshStandardMaterial />
    </mesh>
  );
};
