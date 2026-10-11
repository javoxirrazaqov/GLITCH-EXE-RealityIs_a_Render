
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Float,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

/* =========================================
   WORLD 01 — VOID PROTOCOL
========================================= */

function VoidProtocol({ color }) {
  return (
    <group>
      <mesh>
        <torusKnotGeometry args={[1, 0.24, 220, 32, 2, 5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          metalness={0.85}
          roughness={0.15}
          wireframe
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.008, 8, 120]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <mesh rotation={[0.8, 0.4, 0.5]}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/* =========================================
   WORLD 02 — NO SIGNAL
========================================= */

function NoSignal({ color }) {
  const shards = useRef();

  useFrame((state) => {
    if (!shards.current) return;
    shards.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <group>
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          metalness={0.95}
          roughness={0.12}
          flatShading
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh scale={1.18}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>

      <group ref={shards}>
        {Array.from({ length: 9 }, (_, i) => {
          const angle = (i / 9) * Math.PI * 2;
          const radius = 1.6 + (i % 3) * 0.15;

          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.65,
                Math.sin(angle) * radius,
              ]}
              rotation={[angle, angle * 0.7, angle * 0.4]}
              scale={0.15 + (i % 3) * 0.07}
            >
              <tetrahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1.4}
                wireframe
              />
            </mesh>
          );
        })}
      </group>

      <mesh rotation={[0.5, 0.3, 0.2]}>
        <torusGeometry args={[1.75, 0.012, 8, 100]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* =========================================
   WORLD 03 — AFTER ERROR
========================================= */

function AfterError({ color }) {
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.25, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          metalness={0.8}
          roughness={0.18}
          wireframe
        />
      </mesh>

      <mesh scale={1.45} rotation={[0.5, 0.4, 0]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[1.8, 0.015, 8, 120]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* =========================================
   WORLD 04 — CYBER NEXUS
   Multi-layered energy machine
========================================= */

function CyberNexus({ color }) {
  const machine = useRef();
  const inner = useRef();

  useFrame((state, delta) => {
    if (machine.current) {
      machine.current.rotation.y += delta * 0.24;
      machine.current.rotation.x += delta * 0.08;
    }

    if (inner.current) {
      inner.current.rotation.x -= delta * 0.35;
      inner.current.rotation.z += delta * 0.28;
    }
  });

  return (
    <group>
      {/* Outer rotating structure */}
      <group ref={machine}>
        <mesh>
          <boxGeometry args={[1.65, 1.65, 1.65]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>

        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <octahedronGeometry args={[1.4, 0]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>

        <mesh rotation={[Math.PI / 2.6, 0.4, 0]}>
          <torusGeometry args={[1.9, 0.018, 8, 120]} />
          <meshBasicMaterial color={color} />
        </mesh>

        <mesh rotation={[0.3, Math.PI / 2.5, 0.8]}>
          <torusGeometry args={[2.1, 0.012, 8, 120]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.65}
          />
        </mesh>

        <mesh rotation={[1.2, 0.3, 0.5]}>
          <torusGeometry args={[1.65, 0.025, 8, 100]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* Inner rotating polyhedron */}
      <group ref={inner}>
        <mesh>
          <dodecahedronGeometry args={[0.82, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.7}
            metalness={1}
            roughness={0.12}
            wireframe
          />
        </mesh>

        <mesh scale={0.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
      </group>

      {/* Energy points */}
      <Sparkles
        count={65}
        scale={4.5}
        size={2.5}
        speed={0.5}
        color={color}
      />
    </group>
  );
}

/* =========================================
   WORLD 05 — VOID RUNNER
   Floating crystal fragments
========================================= */

function VoidRunner({ color }) {
  const core = useRef();
  const fragments = useRef();

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.32;
      core.current.rotation.x += delta * 0.18;
    }

    if (fragments.current) {
      fragments.current.rotation.y -= delta * 0.12;
      fragments.current.rotation.z += delta * 0.09;
    }
  });

  const shards = [
    { position: [1.45, 0.45, 0.15], rotation: [0.4, 0.2, 0.8], scale: 0.42 },
    { position: [-1.4, -0.45, 0.2], rotation: [0.2, 0.8, 0.4], scale: 0.34 },
    { position: [0.3, 1.45, -0.3], rotation: [0.8, 0.3, 0.1], scale: 0.32 },
    { position: [-0.4, -1.4, 0.2], rotation: [0.2, 0.5, 0.9], scale: 0.38 },
    { position: [0.25, 0.15, 1.55], rotation: [0.6, 0.4, 0.2], scale: 0.28 },
    { position: [-0.25, 0.2, -1.55], rotation: [0.1, 0.9, 0.5], scale: 0.3 },
  ];

  return (
    <group>
      {/* Main faceted crystal */}
      <group ref={core}>
        <mesh>
          <octahedronGeometry args={[1.05, 1]} />
          <meshPhysicalMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.1}
            flatShading
            wireframe
          />
        </mesh>

        <mesh scale={0.72} rotation={[0.5, 0.2, 0.4]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={color}
            emissiveIntensity={1.3}
            wireframe
          />
        </mesh>
      </group>

      {/* Independent orbiting fragments */}
      <group ref={fragments}>
        {shards.map((shard, i) => (
          <mesh
            key={i}
            position={shard.position}
            rotation={shard.rotation}
            scale={shard.scale}
          >
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.4}
              metalness={0.9}
              roughness={0.16}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* Three orbital tracks */}
      <mesh rotation={[1.1, 0.3, 0.2]}>
        <torusGeometry args={[1.95, 0.014, 8, 120]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <mesh rotation={[0.2, 1.2, 0.6]}>
        <torusGeometry args={[2.15, 0.01, 8, 120]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh rotation={[0.7, 0.2, 1.1]}>
        <torusGeometry args={[1.7, 0.012, 8, 120]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <Sparkles
        count={45}
        scale={4.5}
        size={3}
        speed={0.8}
        color={color}
      />
    </group>
  );
}

/* =========================================
   WORLD 06 — NEURAL CHAOS
   Connected neural geometry
========================================= */

const neuralPoints = [
  [0, 1.25, 0],
  [1.05, 0.55, 0.25],
  [0.8, -0.75, 0.35],
  [-0.55, -1.05, 0.2],
  [-1.15, 0.1, 0.3],
  [-0.4, 0.45, 1.0],
  [0.35, 0.05, -1.0],
  [0.2, 0.8, 0.65],
  [-0.7, -0.35, -0.7],
  [0.9, -0.35, -0.6],
];

const neuralConnections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  [0, 5], [5, 3], [1, 7], [7, 5], [7, 6],
  [6, 9], [9, 2], [6, 8], [8, 4], [8, 3],
  [5, 8], [1, 9], [0, 6], [4, 5], [2, 8],
];

function NeuralChaos({ color }) {
  const network = useRef();
  const centralCore = useRef();

  useFrame((state, delta) => {
    if (network.current) {
      network.current.rotation.y += delta * 0.13;
      network.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }

    if (centralCore.current) {
      centralCore.current.rotation.x += delta * 0.4;
      centralCore.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group>
      <group ref={network}>
        {/* Connecting beams */}
        {neuralConnections.map(([start, end], i) => {
          const a = new THREE.Vector3(...neuralPoints[start]);
          const b = new THREE.Vector3(...neuralPoints[end]);
          const direction = new THREE.Vector3().subVectors(b, a);
          const midpoint = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

          return (
            <mesh
              key={i}
              position={midpoint.toArray()}
              quaternion={
                new THREE.Quaternion().setFromUnitVectors(
                  new THREE.Vector3(0, 1, 0),
                  direction.clone().normalize()
                )
              }
            >
              <cylinderGeometry
                args={[0.009, 0.009, direction.length(), 5]}
              />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}

        {/* Neural nodes */}
        {neuralPoints.map((point, i) => (
          <group key={i} position={point}>
            <mesh>
              <icosahedronGeometry args={[i === 0 ? 0.14 : 0.095, 1]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                metalness={0.6}
                roughness={0.15}
              />
            </mesh>

            <mesh scale={1.8}>
              <sphereGeometry args={[0.09, 8, 8]} />
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.65}
              />
            </mesh>
          </group>
        ))}

        {/* Outer polyhedron */}
        <mesh>
          <icosahedronGeometry args={[1.65, 1]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>
      </group>

      {/* Independent central core */}
      <group ref={centralCore}>
        <mesh>
          <octahedronGeometry args={[0.36, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={color}
            emissiveIntensity={2.5}
            metalness={1}
            roughness={0.1}
            wireframe
          />
        </mesh>
      </group>

      <mesh rotation={[0.5, 0.4, 0.8]}>
        <torusGeometry args={[2, 0.012, 8, 120]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <Sparkles
        count={80}
        scale={4.5}
        size={2}
        speed={0.7}
        color={color}
      />
    </group>
  );
}

/* =========================================
   WORLD 07 — QUANTUM REACTOR
========================================= */

function QuantumReactor({ color }) {
  const rings = useRef();
  const core = useRef();
  const satellites = useRef();

  useFrame((state, delta) => {
    if (rings.current) {
      rings.current.rotation.x += delta * 0.18;
      rings.current.rotation.y += delta * 0.25;
    }

    if (core.current) {
      core.current.rotation.x += delta * 0.4;
      core.current.rotation.y -= delta * 0.5;
    }

    if (satellites.current) {
      satellites.current.rotation.y -= delta * 0.45;
    }
  });

  return (
    <group>
      {/* Triple mechanical orbital system */}
      <group ref={rings}>
        <mesh rotation={[0.9, 0.2, 0]}>
          <torusGeometry args={[1.7, 0.035, 12, 120]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh rotation={[0.3, 0.9, 0.8]}>
          <torusGeometry args={[1.45, 0.018, 8, 120]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh rotation={[1.3, 0.2, 0.4]}>
          <torusGeometry args={[1.95, 0.012, 8, 120]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* Energy core */}
      <group ref={core}>
        <mesh>
          <dodecahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            metalness={0.95}
            roughness={0.12}
            wireframe
          />
        </mesh>

        <mesh scale={0.48}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>

        <mesh scale={0.22}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Orbiting reactor modules */}
      <group ref={satellites}>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;

          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 1.3,
                Math.sin(angle * 2) * 0.3,
                Math.sin(angle) * 1.3,
              ]}
              rotation={[angle, 0.5, angle]}
            >
              <boxGeometry args={[0.13, 0.35, 0.13]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                metalness={0.8}
              />
            </mesh>
          );
        })}
      </group>

      <Sparkles count={55} scale={4.5} size={2.5} speed={0.7} color={color} />
    </group>
  );
}

/* =========================================
   WORLD 08 — ECLIPSE ENGINE
========================================= */

function EclipseEngine({ color }) {
  const eclipse = useRef();
  const corona = useRef();

  useFrame((state, delta) => {
    if (eclipse.current) {
      eclipse.current.rotation.y += delta * 0.15;
      eclipse.current.rotation.z += delta * 0.08;
    }

    if (corona.current) {
      corona.current.rotation.x -= delta * 0.2;
      corona.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Dark stellar body */}
      <group ref={eclipse}>
        <mesh>
          <sphereGeometry args={[0.9, 48, 48]} />
          <meshStandardMaterial
            color="#100b19"
            metalness={0.95}
            roughness={0.16}
          />
        </mesh>

        <mesh scale={1.06}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Angular outer shell */}
        <mesh rotation={[0.5, 0.3, 0.2]}>
          <icosahedronGeometry args={[1.45, 1]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.38}
          />
        </mesh>
      </group>

      {/* Glowing stellar corona */}
      <group ref={corona}>
        <mesh rotation={[Math.PI / 2.5, 0.2, 0.4]}>
          <torusGeometry args={[1.35, 0.075, 12, 160]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2.5}
            metalness={0.65}
            roughness={0.15}
          />
        </mesh>

        <mesh rotation={[0.5, 0.8, 1.1]}>
          <torusGeometry args={[1.75, 0.018, 8, 120]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        <mesh rotation={[1.3, 0.2, 0.6]}>
          <torusGeometry args={[2, 0.012, 8, 120]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* Small stellar fragments */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 1.95,
              Math.sin(angle * 2) * 0.4,
              Math.sin(angle) * 1.95,
            ]}
            rotation={[angle, angle * 0.5, 0]}
          >
            <tetrahedronGeometry args={[0.12, 0]} />
            <meshBasicMaterial color={color} />
          </mesh>
        );
      })}

      <Sparkles count={75} scale={5} size={3} speed={0.55} color={color} />
    </group>
  );
}

/* =========================================
   WORLD 09 — FRACTURE CORE
========================================= */

function FractureCore({ color }) {
  const cluster = useRef();
  const inner = useRef();

  const fragments = [
    { position: [0, 0, 0], scale: 0.68 },
    { position: [1.05, 0.4, 0.15], scale: 0.34 },
    { position: [-1.0, -0.25, 0.2], scale: 0.38 },
    { position: [0.2, 1.0, -0.15], scale: 0.32 },
    { position: [-0.25, -1.0, 0.2], scale: 0.36 },
    { position: [0.2, 0.15, 1.0], scale: 0.3 },
    { position: [-0.25, 0.1, -1.0], scale: 0.35 },
    { position: [0.9, -0.7, -0.25], scale: 0.24 },
    { position: [-0.9, 0.7, 0.15], scale: 0.27 },
  ];

  useFrame((state, delta) => {
    if (cluster.current) {
      cluster.current.rotation.y += delta * 0.16;
      cluster.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    }

    if (inner.current) {
      inner.current.rotation.x += delta * 0.3;
      inner.current.rotation.z -= delta * 0.22;
    }
  });

  return (
    <group>
      {/* Multi-fragment crystal cluster */}
      <group ref={cluster}>
        {fragments.map((fragment, i) => (
          <mesh
            key={i}
            position={fragment.position}
            scale={fragment.scale}
            rotation={[i * 0.37, i * 0.61, i * 0.23]}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.25}
              metalness={0.9}
              roughness={0.16}
              flatShading
              wireframe
            />
          </mesh>
        ))}

        {/* Large fractal frame */}
        <mesh rotation={[0.3, 0.5, 0.2]}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>

        <mesh rotation={[0.8, 0.2, 0.6]}>
          <dodecahedronGeometry args={[1.55, 0]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Independent inner fractal */}
      <group ref={inner}>
        <mesh>
          <tetrahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={color}
            emissiveIntensity={2}
            metalness={1}
            roughness={0.12}
            wireframe
          />
        </mesh>

        <mesh scale={0.55} rotation={[0.3, 0.8, 0.4]}>
          <octahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </group>

      <mesh rotation={[1.1, 0.4, 0.8]}>
        <torusGeometry args={[2.05, 0.015, 8, 120]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <Sparkles count={65} scale={4.5} size={2.5} speed={0.7} color={color} />
    </group>
  );
}

function CubeMatrix({ color }) {
  const cube = useRef();
  const inner = useRef();

  useFrame((state, delta) => {
    if (cube.current) {
      cube.current.rotation.x += delta * 0.18;
      cube.current.rotation.y += delta * 0.3;
    }
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.4;
      inner.current.rotation.y += delta * 0.55;
    }
  });

  return (
    <group>
      <group ref={cube}>
        <mesh>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.85}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <mesh scale={1.2}>
          <boxGeometry args={[1.7, 1.7, 1.7]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>

      <mesh ref={inner}>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.65, 0.018, 8, 100]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <Sparkles
        count={35}
        scale={4}
        size={3}
        speed={0.35}
        color={color}
      />
    </group>
  );
}

function PyramidX({ color }) {
  const pyramid = useRef();
  const core = useRef();

  useFrame((state, delta) => {
    if (pyramid.current) {
      pyramid.current.rotation.y += delta * 0.24;
    }
    if (core.current) {
      core.current.rotation.x += delta * 0.7;
      core.current.rotation.y -= delta * 0.45;
    }
  });

  return (
    <group>
      <group ref={pyramid}>
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.35, 2.1, 4, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.45}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <mesh rotation={[0, Math.PI / 4, 0]} scale={0.72}>
          <coneGeometry args={[1.35, 2.1, 4, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.25}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      </group>

      <mesh ref={core} position={[0, -0.05, 0]}>
        <octahedronGeometry args={[0.38, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={2.5}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[1.65, 0.025, 8, 100]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <Sparkles
        count={40}
        scale={4}
        size={3}
        speed={0.5}
        color={color}
      />
    </group>
  );
}

function CyberBird({ color }) {
  const bird = useRef();
  const leftWing = useRef();
  const rightWing = useRef();
  const tail = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (bird.current) {
      bird.current.rotation.y = Math.sin(t * 0.4) * 0.18;
      bird.current.position.y = Math.sin(t * 1.2) * 0.12;
    }

    if (leftWing.current) {
      leftWing.current.rotation.z = Math.sin(t * 4) * 0.32 + 0.15;
    }

    if (rightWing.current) {
      rightWing.current.rotation.z = -Math.sin(t * 4) * 0.32 - 0.15;
    }

    if (tail.current) {
      tail.current.rotation.x = Math.sin(t * 2) * 0.12;
    }
  });

  return (
    <group ref={bird}>
      {/* Main body */}
      <mesh rotation={[0, 0, -0.15]} scale={[0.85, 0.42, 0.42]}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.85}
          roughness={0.18}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0.68, 0.32, 0]}>
        <icosahedronGeometry args={[0.34, 1]} />
        <meshStandardMaterial
          color="#d9fbff"
          emissive={color}
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Beak */}
      <mesh
        position={[1.08, 0.29, 0]}
        rotation={[0, 0, -Math.PI / 2]}
      >
        <coneGeometry args={[0.13, 0.42, 4]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Neon eye */}
      <mesh position={[0.78, 0.39, 0.285]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Animated wings */}
      <group ref={leftWing} position={[0, 0.2, 0.25]}>
        <mesh
          position={[-0.1, 0.15, 0.35]}
          rotation={[0.3, 0, 0.3]}
          scale={[0.9, 0.12, 0.55]}
        >
          <octahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <mesh position={[-0.25, 0.2, 0.45]} scale={[0.65, 0.08, 0.3]}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      <group ref={rightWing} position={[0, 0.2, -0.25]}>
        <mesh
          position={[-0.1, 0.15, -0.35]}
          rotation={[-0.3, 0, -0.3]}
          scale={[0.9, 0.12, 0.55]}
        >
          <octahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <mesh position={[-0.25, 0.2, -0.45]} scale={[0.65, 0.08, 0.3]}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* Tail feathers */}
      <group ref={tail} position={[-0.65, 0, 0]}>
        {[-0.25, 0, 0.25].map((z, i) => (
          <mesh
            key={i}
            position={[-0.35, -0.03, z]}
            rotation={[0, 0, -0.55]}
            scale={[0.5, 0.09, 0.12]}
          >
            <octahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.2}
              wireframe
            />
          </mesh>
        ))}
      </group>

      <Sparkles
        count={30}
        scale={4}
        size={2.5}
        speed={0.6}
        color={color}
      />
    </group>
  );
}

/* =========================================
   3D ANIMAL 01 — CYBER WOLF
========================================= */

function CyberWolf({ color }) {
  const wolf = useRef();
  const tail = useRef();
  const ears = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (wolf.current) {
      wolf.current.rotation.y = Math.sin(t * 0.45) * 0.22;
      wolf.current.position.y = Math.sin(t * 1.3) * 0.07;
    }

    if (tail.current) {
      tail.current.rotation.z = Math.sin(t * 2) * 0.2;
    }

    if (ears.current) {
      ears.current.rotation.x = Math.sin(t * 1.8) * 0.04;
    }
  });

  const metal = {
    color,
    emissive: color,
    emissiveIntensity: 0.45,
    metalness: 0.85,
    roughness: 0.22,
  };

  return (
    <group ref={wolf} scale={0.9} rotation={[0, -0.3, 0]}>
      {/* Armored body */}
      <mesh position={[-0.15, 0, 0]} scale={[1.05, 0.52, 0.48]}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial {...metal} />
      </mesh>

      {/* Armor lines */}
      <mesh position={[-0.15, 0, 0]} scale={[1.12, 0.56, 0.5]}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0.52, 0.22, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.28, 0.4, 0.55, 6]} />
        <meshStandardMaterial {...metal} />
      </mesh>

      {/* Head */}
      <group position={[0.75, 0.43, 0]} rotation={[0, 0, -0.12]}>
        <mesh scale={[0.48, 0.4, 0.36]}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        {/* Long muzzle */}
        <mesh position={[0.38, -0.14, 0]} rotation={[0, 0, 0.12]}>
          <coneGeometry args={[0.22, 0.58, 5]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        {/* Jaw */}
        <mesh position={[0.31, -0.27, 0]} scale={[0.42, 0.1, 0.2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#d7e8ee" metalness={0.9} roughness={0.18} />
        </mesh>

        {/* Glowing eyes */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[0.12, 0.04, side * 0.315]}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}

        {/* Ears */}
        <group ref={ears}>
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              position={[-0.12, 0.37, side * 0.2]}
              rotation={[side * 0.1, 0, -0.15]}
            >
              <coneGeometry args={[0.17, 0.48, 4]} />
              <meshStandardMaterial {...metal} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Four mechanical legs */}
      {[
        [-0.68, -0.48, 0.28],
        [-0.68, -0.48, -0.28],
        [0.42, -0.42, 0.28],
        [0.42, -0.42, -0.28],
      ].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, -0.19, 0]}>
            <cylinderGeometry args={[0.09, 0.13, 0.4, 5]} />
            <meshStandardMaterial {...metal} />
          </mesh>
          <mesh position={[0.07, -0.39, 0.025]}>
            <boxGeometry args={[0.3, 0.12, 0.18]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        </group>
      ))}

      {/* Segmented tail */}
      <group ref={tail} position={[-0.9, 0.12, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[-i * 0.17, 0.12 + i * 0.09, 0]}
            rotation={[0, 0, -0.3 - i * 0.12]}
          >
            <octahedronGeometry args={[0.17 - i * 0.025, 0]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        ))}
      </group>

      <Sparkles count={22} scale={3.5} size={2} color={color} speed={0.35} />
    </group>
  );
}

/* =========================================
   3D ANIMAL 02 — PHANTOM SERPENT
========================================= */

function PhantomSerpent({ color }) {
  const serpent = useRef();
  const segments = 15;

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (!serpent.current) return;

    serpent.current.children.forEach((segment, i) => {
      if (i < segments) {
        segment.position.y =
          Math.sin(t * 2.1 - i * 0.43) * 0.2;
        segment.position.z =
          Math.sin(t * 1.4 - i * 0.32) * 0.12;
      }
    });

    serpent.current.rotation.y = Math.sin(t * 0.3) * 0.18;
  });

  const metal = {
    color,
    emissive: color,
    emissiveIntensity: 0.6,
    metalness: 0.75,
    roughness: 0.2,
  };

  return (
    <group ref={serpent} scale={0.85}>
      {/* Floating, articulated body */}
      {Array.from({ length: segments }, (_, i) => {
        const angle = i * 0.43;
        const radius = 1.05;

        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 1.5) * 0.35,
              Math.sin(angle) * radius * 0.6,
            ]}
          >
            <mesh
              scale={[
                0.24 - (i / segments) * 0.1,
                0.23 - (i / segments) * 0.1,
                0.23 - (i / segments) * 0.1,
              ]}
            >
              <icosahedronGeometry args={[1, 1]} />
              <meshStandardMaterial {...metal} />
            </mesh>

            <mesh scale={0.28 - (i / segments) * 0.1}>
              <icosahedronGeometry args={[1, 1]} />
              <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.55}
              />
            </mesh>
          </group>
        );
      })}

      {/* Serpent head */}
      <group position={[1.18, 0.1, 0.5]} rotation={[0, 0.3, -0.25]}>
        <mesh scale={[0.42, 0.3, 0.32]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        <mesh position={[0.32, -0.1, 0]}>
          <coneGeometry args={[0.16, 0.42, 4]} />
          <meshStandardMaterial {...metal} />
        </mesh>

        {[-1, 1].map((side) => (
          <mesh key={side} position={[0.03, 0.1, side * 0.27]}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}

        {/* Horns */}
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[-0.2, 0.28, side * 0.18]}
            rotation={[side * 0.2, 0, -0.35]}
          >
            <coneGeometry args={[0.09, 0.35, 4]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        ))}
      </group>

      <Sparkles count={35} scale={4.5} size={2.5} color={color} speed={0.5} />
    </group>
  );
}

/* =========================================
   3D ANIMAL 03 — NEON SCORPION
========================================= */

function NeonScorpion({ color }) {
  const scorpion = useRef();
  const tail = useRef();
  const leftClaw = useRef();
  const rightClaw = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (scorpion.current) {
      scorpion.current.rotation.y = Math.sin(t * 0.4) * 0.18;
      scorpion.current.position.y = Math.sin(t * 1.2) * 0.06;
    }

    if (tail.current) {
      tail.current.rotation.z = Math.sin(t * 1.5) * 0.14;
      tail.current.rotation.x = Math.sin(t * 1.1) * 0.12;
    }

    if (leftClaw.current) {
      leftClaw.current.rotation.y = Math.sin(t * 1.8) * 0.15;
    }

    if (rightClaw.current) {
      rightClaw.current.rotation.y = -Math.sin(t * 1.8) * 0.15;
    }
  });

  const metal = {
    color,
    emissive: color,
    emissiveIntensity: 0.5,
    metalness: 0.85,
    roughness: 0.2,
  };

  return (
    <group ref={scorpion} scale={0.9}>
      {/* Main armored body */}
      <mesh position={[0, 0, 0]} scale={[0.65, 0.38, 0.48]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial {...metal} />
      </mesh>

      <mesh position={[-0.45, 0.08, 0]} scale={[0.42, 0.3, 0.4]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial {...metal} />
      </mesh>

      {/* Six articulated legs */}
      {[-1, 0, 1].flatMap((offset, index) =>
        [-1, 1].map((side) => (
          <group
            key={`${index}-${side}`}
            position={[offset * 0.32, -0.18, side * 0.28]}
          >
            <mesh
              position={[offset * 0.12, -0.17, side * 0.16]}
              rotation={[side * 0.25, 0, offset * 0.45]}
            >
              <cylinderGeometry args={[0.045, 0.065, 0.42, 5]} />
              <meshStandardMaterial {...metal} />
            </mesh>

            <mesh
              position={[offset * 0.28, -0.35, side * 0.25]}
              rotation={[0, 0, offset * 0.35]}
            >
              <cylinderGeometry args={[0.035, 0.05, 0.32, 5]} />
              <meshStandardMaterial {...metal} />
            </mesh>
          </group>
        ))
      )}

      {/* Front pincers */}
      <group ref={leftClaw} position={[0.42, 0.02, 0.38]}>
        <mesh position={[0.2, 0.02, 0.12]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[0.07, 0.11, 0.42, 5]} />
          <meshStandardMaterial {...metal} />
        </mesh>
        <mesh position={[0.42, 0.08, 0.18]} scale={[0.28, 0.18, 0.17]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial {...metal} />
        </mesh>
        <mesh position={[0.62, 0.15, 0.19]} rotation={[0, 0, -0.5]}>
          <coneGeometry args={[0.09, 0.38, 4]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      </group>

      <group ref={rightClaw} position={[0.42, 0.02, -0.38]}>
        <mesh position={[0.2, 0.02, -0.12]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[0.07, 0.11, 0.42, 5]} />
          <meshStandardMaterial {...metal} />
        </mesh>
        <mesh position={[0.42, 0.08, -0.18]} scale={[0.28, 0.18, 0.17]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial {...metal} />
        </mesh>
        <mesh position={[0.62, 0.15, -0.19]} rotation={[0, 0, -0.5]}>
          <coneGeometry args={[0.09, 0.38, 4]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      </group>

      {/* Curved, animated segmented tail */}
      <group ref={tail} position={[-0.48, 0.18, 0]}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh
            key={i}
            position={[
              -i * 0.13,
              0.15 + Math.sin((i / 5) * Math.PI) * 0.38,
              0,
            ]}
            scale={0.2 - i * 0.015}
          >
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial {...metal} />
          </mesh>
        ))}

        <mesh position={[-0.72, 0.8, 0]} rotation={[0, 0, -0.5]}>
          <coneGeometry args={[0.16, 0.42, 5]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={color}
            emissiveIntensity={2}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>
      </group>

      <Sparkles count={30} scale={4} size={2.5} color={color} speed={0.45} />
    </group>
  );
}

/* =========================================
   MAIN WORLD OBJECT
========================================= */

function WorldObject({ project }) {
  const object = useRef();

  useFrame((state, delta) => {
    if (!object.current) return;

    object.current.rotation.y += delta * 0.12;
    object.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.65) * 0.1;
  });

  return (
    <group ref={object}>
      <Float speed={1.2} floatIntensity={0.22} rotationIntensity={0.12}>
        {project.shape === "knot" && (
          <VoidProtocol color={project.color} />
        )}

        {project.shape === "crystal" && (
          <NoSignal color={project.color} />
        )}

        {project.shape === "sphere" && (
          <AfterError color={project.color} />
        )}

        {project.shape === "nexus" && (
          <CyberNexus color={project.color} />
        )}

        {project.shape === "runner" && (
          <VoidRunner color={project.color} />
        )}

        {project.shape === "neural" && (
          <NeuralChaos color={project.color} />
        )}

{project.shape === "reactor" && (
  <QuantumReactor color={project.color} />
)}

{project.shape === "eclipse" && (
  <EclipseEngine color={project.color} />
)}

{project.shape === "fracture" && (
  <FractureCore color={project.color} />
)}


{project.shape === "cube" && (
  <CubeMatrix color={project.color} />
)}

{project.shape === "pyramid" && (
  <PyramidX color={project.color} />
)}

{project.shape === "bird" && (
  <CyberBird color={project.color} />
)}


{project.shape === "wolf" && (
  <CyberWolf color={project.color} />
)}

{project.shape === "serpent" && (
  <PhantomSerpent color={project.color} />
)}

{project.shape === "scorpion" && (
  <NeonScorpion color={project.color} />
)}

      </Float>
    </group>
  );
}

/* =========================================
   CANVAS
========================================= */

export default function ProjectWorld({ project }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor("#070707", 1);
      }}
    >
      <ambientLight intensity={0.65} />

      <pointLight
        position={[3, 4, 3]}
        intensity={30}
        color={project.color}
      />

      <pointLight
        position={[-3, -2, -3]}
        intensity={15}
        color="#ffffff"
      />

      <pointLight
        position={[0, 0, 4]}
        intensity={10}
        color={project.color}
      />

      <Stars
        count={500}
        radius={35}
        depth={20}
        factor={3}
        fade
        speed={0.35}
      />

      <WorldObject project={project} />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={3}
        maxDistance={8}
        autoRotate={false}
      />
    </Canvas>
  );
}
