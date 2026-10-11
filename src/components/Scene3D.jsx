import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import {
  EffectComposer,
  ChromaticAberration,
  Glitch,
} from "@react-three/postprocessing";
import * as THREE from "three";

function Artifact({ progress }) {
  const group = useRef();
  const core = useRef();

  useFrame((state, delta) => {
    if (!group.current || !core.current) return;

    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      state.pointer.y * 0.25 + progress * 0.8,
      3,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      -state.pointer.x * 0.18 + progress * 0.4,
      3,
      delta
    );

    core.current.rotation.x -= delta * 0.22;
    core.current.rotation.y += delta * 0.32;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.65}>
        <mesh ref={core}>
          <torusKnotGeometry args={[1.05, 0.31, 180, 24, 2, 5]} />
          <meshStandardMaterial
            color="#b7ff36"
            emissive="#72ff00"
            emissiveIntensity={1.2}
            metalness={0.85}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <mesh rotation={[0.7, 0.2, 0.4]} scale={1.7}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#ff286f"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>

        <mesh rotation={[1.1, 0.6, 0]}>
          <torusGeometry args={[1.85, 0.008, 8, 180]} />
          <meshBasicMaterial color="#b7ff36" />
        </mesh>
      </Float>
    </group>
  );
}

function CameraRig({ progress }) {
  useFrame(({ camera }, delta) => {
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      Math.sin(progress * Math.PI * 2) * 0.55,
      2,
      delta
    );

    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      progress * 1.1,
      2,
      delta
    );

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      5.5 - progress * 0.7,
      2,
      delta
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene3D({ progress = 0 }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={<div className="canvas-fallback">3D ENGINE UNAVAILABLE</div>}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 16]} />

      <ambientLight intensity={0.65} />
      <pointLight position={[3, 3, 3]} intensity={30} color="#b7ff36" />
      <pointLight position={[-4, -2, 2]} intensity={22} color="#ff286f" />

      <Stars radius={65} depth={35} count={1100} factor={2} fade speed={0.5} />
      <Artifact progress={progress} />
      <CameraRig progress={progress} />

      <EffectComposer>
        <Glitch
          delay={[2.5, 5]}
          duration={[0.12, 0.28]}
          strength={[0.08, 0.2]}
          ratio={0.65}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0008, 0.0008)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </Canvas>
  );
}