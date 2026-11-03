"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CITIES, HOME_BASE, arcPoints, buildLandDots, toVec } from "./globeData";

const DOT_DARK = new THREE.Color("#8fe3cf");
const DOT_LIGHT = new THREE.Color("#0b3a33");
const RIM_DARK = new THREE.Color("#4fc0a6");
const RIM_LIGHT = new THREE.Color("#146b58");
const ARC_DARK = new THREE.Color("#d9b75a");
const ARC_LIGHT = new THREE.Color("#7c6118");
const DEG = Math.PI / 180;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

const dotVert = /* glsl */ `
  uniform float uPx;
  attribute float aRand;
  varying float vRand;
  void main() {
    vRand = aRand;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uPx * (7.0 + aRand * 3.0) / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const dotFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  varying float vRand;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float tw = 0.78 + 0.22 * sin(uTime * 1.4 + vRand * 40.0);
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.2, d) * tw * 0.95);
  }
`;
const rimVert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const rimFrag = /* glsl */ `
  uniform vec3 uColor;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.6);
    gl_FragColor = vec4(uColor, f * 0.5);
  }
`;

function Scene({ low }: { low: boolean }) {
  const { viewport } = useThree();
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const mover = useRef<THREE.Group>(null);
  const dotMat = useRef<THREE.ShaderMaterial>(null);
  const rimMat = useRef<THREE.ShaderMaterial>(null);
  const ping = useRef<THREE.Mesh>(null);
  const arcRefs = useRef<(THREE.Line | null)[]>([]);
  const state = useRef({ dark: 1, isDark: true, frame: 0, progress: 0 });

  const dots = useMemo(() => buildLandDots(low ? 5200 : 11500), [low]);
  const rand = useMemo(() => {
    const r = new Float32Array(dots.length / 3);
    for (let i = 0; i < r.length; i++) r[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    return r.map(Math.abs);
  }, [dots]);
  const [dotUniforms] = useState(() => ({
    uPx: { value: 1 },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color() },
  }));
  const [rimUniforms] = useState(() => ({ uColor: { value: new THREE.Color() } }));
  const arcs = useMemo(
    () =>
      CITIES.map((c) => {
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(arcPoints(HOME_BASE, c), 3));
        const m = new THREE.LineBasicMaterial({ color: "#d9b75a", transparent: true, opacity: 0.8 });
        return new THREE.Line(g, m);
      }),
    [],
  );
  const base = useMemo(() => toVec(HOME_BASE[0], HOME_BASE[1]), []);
  const baseQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(...base)),
    [base],
  );

  useFrame(({ clock, pointer, gl }, delta) => {
    const s = state.current;
    const time = clock.elapsedTime;
    const px = gl.getPixelRatio() * gl.domElement.clientHeight * 0.0016;
    dotMat.current!.uniforms.uPx.value = px;
    dotMat.current!.uniforms.uTime.value = time;

    // page progress and the theme under the viewport centre
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    s.progress += (clamp01(window.scrollY / max) - s.progress) * Math.min(1, delta * 3.5);
    if (s.frame++ % 8 === 0) {
      const mid = window.innerHeight / 2;
      let dark = true;
      document.querySelectorAll<HTMLElement>("[data-theme]").forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top <= mid && b.bottom >= mid) dark = el.dataset.theme === "dark";
      });
      s.isDark = dark;
    }
    s.dark += ((s.isDark ? 1 : 0) - s.dark) * Math.min(1, delta * 5);
    dotMat.current!.uniforms.uColor.value.copy(DOT_LIGHT).lerp(DOT_DARK, s.dark);
    rimMat.current!.uniforms.uColor.value.copy(RIM_LIGHT).lerp(RIM_DARK, s.dark);
    const arcColor = ARC_LIGHT.clone().lerp(ARC_DARK, s.dark);

    const p = s.progress;
    // Travel: drifts across the page and breathes in size as you scroll start to end.
    const side = Math.cos(p * Math.PI * 2.2);
    const x = low ? 0 : viewport.width * 0.3 * side;
    const y = low ? viewport.height * 0.2 : Math.sin(p * Math.PI * 2.2) * viewport.height * 0.1;
    const scale = (low ? 0.62 : 1) * (0.92 + Math.sin(p * Math.PI) * 0.22);
    const m = mover.current!;
    m.position.x += (x - m.position.x) * Math.min(1, delta * 3);
    m.position.y += (y - m.position.y) * Math.min(1, delta * 3);
    m.scale.setScalar(m.scale.x + (scale - m.scale.x) * Math.min(1, delta * 3));

    // Spin: starts facing the UAE, makes a full turn over the page, plus slow idle rotation.
    spin.current!.rotation.y = -HOME_BASE[0] * DEG + p * Math.PI * 2 + time * 0.06;
    tilt.current!.rotation.x = 0.42 - p * 0.3 + pointer.y * 0.08;
    tilt.current!.rotation.z = -0.18 + pointer.x * 0.06;

    // pulse ring on the home base
    if (ping.current) {
      const k = (time * 0.6) % 1;
      ping.current.scale.setScalar(0.6 + k * 2.2);
      (ping.current.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.7;
    }

    // arcs grow out of the base, hold, then fade
    arcRefs.current.forEach((line, i) => {
      if (!line) return;
      const c = (time * 0.22 + i * 0.27) % 1.5;
      const grow = clamp01(c / 0.65);
      const fade = c > 1.05 ? 1 - clamp01((c - 1.05) / 0.45) : 1;
      line.geometry.setDrawRange(0, Math.floor(grow * 73));
      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity = fade * 0.85;
      mat.color.copy(arcColor);
    });
  });

  return (
    <group ref={mover}>
      <group ref={tilt}>
        <group ref={spin}>
          {/* hides dots and arcs on the far side */}
          <mesh renderOrder={-1}>
            <sphereGeometry args={[0.992, 48, 48]} />
            <meshBasicMaterial colorWrite={false} />
          </mesh>
          <points frustumCulled={false}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[dots, 3]} />
              <bufferAttribute attach="attributes-aRand" args={[rand, 1]} />
            </bufferGeometry>
            <shaderMaterial
              ref={dotMat}
              vertexShader={dotVert}
              fragmentShader={dotFrag}
              uniforms={dotUniforms}
              transparent
              depthWrite={false}
            />
          </points>

          {arcs.map((l, i) => (
            <primitive
              key={i}
              object={l}
              ref={(o: THREE.Line | null) => {
                arcRefs.current[i] = o;
              }}
            />
          ))}

          {/* home base marker */}
          <group position={base} quaternion={baseQuat}>
            <mesh>
              <sphereGeometry args={[0.022, 16, 16]} />
              <meshBasicMaterial color="#d9b75a" />
            </mesh>
            <mesh ref={ping}>
              <ringGeometry args={[0.03, 0.036, 40]} />
              <meshBasicMaterial color="#d9b75a" transparent opacity={0.6} depthWrite={false} />
            </mesh>
          </group>
        </group>

        {/* atmosphere rim */}
        <mesh scale={1.035}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial
            ref={rimMat}
            vertexShader={rimVert}
            fragmentShader={rimFrag}
            uniforms={rimUniforms}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// @react-three/fiber 9.x still creates a THREE.Clock, which three 0.18x warns about on every mount.
// Drop only that message (once) until R3F moves to THREE.Timer; remove this when it does.
if (typeof window !== "undefined" && !(window as { __clockWarnMuted?: boolean }).__clockWarnMuted) {
  (window as { __clockWarnMuted?: boolean }).__clockWarnMuted = true;
  const warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    warn(...args);
  };
}

export default function GlobeCanvas({ low }: { low: boolean }) {
  return (
    <Canvas
      dpr={low ? 1 : [1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Scene low={low} />
    </Canvas>
  );
}
