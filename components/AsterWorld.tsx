"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

type WorldProps = { focus?: string; onExplore?: () => void };

const landforms = [
  [-0.8, 0.75, 1.1, 0.36, "#385f49"],
  [0.8, 0.48, 0.92, 0.28, "#477455"],
  [-0.25, -0.65, 0.8, 0.22, "#315d48"],
  [1.05, -0.42, 0.46, 0.16, "#547856"],
] as const;

function Island({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  return (
    <group position={position} rotation={[-0.5, 0.2, 0]} scale={scale}>
      <mesh>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color={color} roughness={0.95} flatShading />
      </mesh>
      <mesh position={[0, 0.32, 0]} scale={[0.7, 0.32, 0.7]}>
        <sphereGeometry args={[1, 16, 10]} />
        <meshStandardMaterial color="#e9d2a3" roughness={1} flatShading />
      </mesh>
    </group>
  );
}

function Lighthouse() {
  return (
    <group position={[0.72, -0.25, 2.18]} rotation={[0.2, -0.35, 0]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.11, 0.18, 0.62, 16]} />
        <meshStandardMaterial color="#f5eee1" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.185, 0.19, 0.08, 16]} />
        <meshStandardMaterial color="#b9534e" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.54, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.13, 12]} />
        <meshStandardMaterial color="#f7dc9e" emissive="#e9a95f" emissiveIntensity={2.4} />
      </mesh>
      <pointLight color="#ffd398" intensity={2.1} distance={3} />
    </group>
  );
}

function Architecture() {
  return (
    <group position={[0.44, 0.35, 2.1]} rotation={[0.1, -0.35, 0]}>
      {[[0, 0, 0, 0.3], [0.35, 0.04, 0.08, 0.22], [-0.25, 0.07, 0.02, 0.18]].map(([x, y, z, size], index) => (
        <group key={index} position={[x, y, z]}>
          <mesh position={[0, size / 2, 0]}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color="#d9d4ca" roughness={0.68} />
          </mesh>
          <mesh position={[0, size + 0.02, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[size * 0.76, size * 0.24, 4]} />
            <meshStandardMaterial color="#a59d94" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Cloud({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.x = position[0] + Math.sin(clock.getElapsedTime() * 0.14 + position[1]) * 0.18;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      {[[0, 0, 0], [0.28, 0.05, 0.02], [-0.27, -0.02, 0.03], [0.08, 0.18, 0]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <sphereGeometry args={[0.27, 16, 10]} />
          <meshStandardMaterial color="#e8edf8" transparent opacity={0.73} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Planet({ focus }: { focus?: string }) {
  const world = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();
  const focusScale = focus ? 1.1 : 1;

  useFrame(({ clock }, delta) => {
    if (!world.current) return;
    world.current.rotation.y += delta * 0.032;
    world.current.rotation.x = THREE.MathUtils.lerp(world.current.rotation.x, pointer.y * 0.05, 0.025);
    world.current.rotation.z = THREE.MathUtils.lerp(world.current.rotation.z, -pointer.x * 0.045, 0.025);
    const breathe = 1 + Math.sin(clock.getElapsedTime() * 0.55) * 0.012;
    world.current.scale.setScalar(breathe * focusScale);
    world.current.position.x = THREE.MathUtils.lerp(world.current.position.x, pointer.x * viewport.width * 0.018, 0.025);
  });

  return (
    <group ref={world} position={[1.15, -0.1, 0]}>
      <Float speed={0.55} rotationIntensity={0.04} floatIntensity={0.17}>
        <mesh>
          <sphereGeometry args={[2.4, 64, 64]} />
          <meshPhysicalMaterial color="#0c5070" roughness={0.23} metalness={0.06} clearcoat={0.75} clearcoatRoughness={0.22} />
        </mesh>
        <mesh scale={1.014}>
          <sphereGeometry args={[2.4, 64, 64]} />
          <meshBasicMaterial color="#96dfff" transparent opacity={0.07} side={THREE.BackSide} />
        </mesh>
        {landforms.map(([x, y, z, size, color], index) => (
          <Island key={index} position={[x, y, z]} scale={size} color={color} />
        ))}
        <Lighthouse />
        <Architecture />
        <Cloud position={[-2.2, 0.5, 1.2]} scale={1.08} />
        <Cloud position={[1.85, -0.72, 1.65]} scale={0.8} />
        <Cloud position={[1.62, 1.42, 0.95]} scale={0.62} />
        <Sparkles count={26} scale={5.7} size={1.6} speed={0.12} color="#d9c6ff" />
      </Float>
      <ContactShadows position={[0, -2.58, 0]} opacity={0.34} scale={9} blur={2.5} far={4.5} color="#000419" />
    </group>
  );
}

function CameraMotion() {
  const { camera } = useThree();
  useEffect(() => { camera.position.set(0, 0.15, 11.6); }, [camera]);
  useFrame(({ clock }) => {
    const targetZ = 9.25 + Math.sin(clock.getElapsedTime() * 0.22) * 0.12;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.009);
  });
  return null;
}

function Scene({ focus }: { focus?: string }) {
  return (
    <>
      <color attach="background" args={["#020718"]} />
      <fog attach="fog" args={["#020718", 9, 19]} />
      <ambientLight intensity={0.66} color="#b7c7ff" />
      <directionalLight position={[-5, 4, 4]} intensity={2.7} color="#ffd2a1" />
      <pointLight position={[4, -2, 2]} intensity={1.7} color="#8fa6ff" />
      <Stars radius={80} depth={30} count={1600} factor={3} saturation={0} fade speed={0.28} />
      <CameraMotion />
      <Planet focus={focus} />
      <OrbitControls enablePan={false} minDistance={6.9} maxDistance={11.4} enableDamping dampingFactor={0.055} autoRotate autoRotateSpeed={0.18} />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={0.72} intensity={0.68} radius={0.55} />
        <Vignette eskil={false} offset={0.16} darkness={0.92} />
      </EffectComposer>
    </>
  );
}

export function AsterWorld({ focus, onExplore }: WorldProps) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lowEnd = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 6;
    setReduced(media.matches || lowEnd || window.innerWidth < 640);
  }, []);
  return (
    <div className="aster-canvas" onClick={onExplore} aria-label="可拖动旋转的 Aster Shore 星球">
      <Canvas dpr={reduced ? [1, 1.15] : [1, 1.6]} gl={{ antialias: !reduced, powerPreference: "high-performance" }} camera={{ fov: 40 }}>
        <Scene focus={focus} />
      </Canvas>
    </div>
  );
}
