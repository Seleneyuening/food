"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type { Group } from "three";

function DriftingStars({ lowPower }: { lowPower: boolean }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current || lowPower) return;
    group.current.rotation.z += delta * 0.0034;
    group.current.rotation.y += delta * 0.0015;
  });

  return (
    <group ref={group}>
      <Stars
        radius={70}
        depth={24}
        count={lowPower ? 260 : 720}
        factor={lowPower ? 2.1 : 2.7}
        saturation={0.08}
        fade
        speed={lowPower ? 0 : 0.38}
      />
    </group>
  );
}

export function LivingAtmosphere({ lowPower }: { lowPower: boolean }) {
  return (
    <div className="replica-atmosphere" aria-hidden="true">
      <Canvas
        dpr={lowPower ? 0.75 : 1}
        frameloop={lowPower ? "demand" : "always"}
        camera={{ fov: 58, position: [0, 0, 5] }}
        gl={{ alpha: true, antialias: false, powerPreference: lowPower ? "low-power" : "high-performance" }}
      >
        <DriftingStars lowPower={lowPower} />
      </Canvas>
    </div>
  );
}
