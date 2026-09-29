"use client";
/**
 * The one 3D scene on the site (lazy chunk, client only). An isometric hotel
 * floor: rooms glow gold as their timed tasks close, and evidence particles
 * stream from closed rooms into the service-record column.
 */
import { Instance, Instances } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const COLS = 7;
const ROWS = 6;
const GAP = 1.18;
const LOOP = 14; // seconds per shift cycle
const GOLD = new THREE.Color("#d4a94f");
const IDLE = new THREE.Color("#1c3566");
const BLOCKED = new THREE.Color("#ff6b5b");
const COLUMN = new THREE.Vector3(5.6, 0.2, -2.4);

type Room = { x: number; z: number; closeAt: number; blocked: boolean };

function useRooms(): Room[] {
  return useMemo(() => {
    const rooms: Room[] = [];
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        const k = j * COLS + i;
        rooms.push({
          x: (i - (COLS - 1) / 2) * GAP,
          z: (j - (ROWS - 1) / 2) * GAP,
          closeAt: (((k * 37) % 43) / 43) * (LOOP * 0.8),
          blocked: k === 17 || k === 30,
        });
      }
    }
    return rooms;
  }, []);
}

function RoomTile({ room }: { room: Room }) {
  const ref = useRef<THREE.Object3D & { color: THREE.Color }>(null);
  const color = useMemo(() => new THREE.Color(), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime % LOOP;
    if (room.blocked) {
      ref.current.color.copy(BLOCKED);
      return;
    }
    const since = t - room.closeAt;
    const k = since < 0 ? 0 : Math.min(1, since / 0.6);
    color.copy(IDLE).lerp(GOLD, k);
    ref.current.color.copy(color);
    ref.current.scale.y = 1 + k * 0.35;
  });
  return <Instance ref={ref as never} position={[room.x, 0, room.z]} />;
}

function Particles({ rooms }: { rooms: Room[] }) {
  const count = 60;
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return g;
  }, []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, n) => ({
        room: rooms[(n * 7) % rooms.length],
        offset: (n / count) * 3,
        lift: 1.2 + ((n * 13) % 10) / 6,
        slot: n % 7,
      })),
    [rooms],
  );
  useFrame(({ clock }) => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    seeds.forEach((s, n) => {
      const cycle = t % LOOP;
      const active = !s.room.blocked && cycle > s.room.closeAt;
      const p = ((t + s.offset) % 3) / 3;
      if (!active) {
        pos.setXYZ(n, 0, -50, 0);
        return;
      }
      const e = p * p * (3 - 2 * p);
      const target = COLUMN.clone().setY(0.4 + s.slot * 0.42);
      const x = THREE.MathUtils.lerp(s.room.x, target.x, e);
      const z = THREE.MathUtils.lerp(s.room.z, target.z, e);
      const y = THREE.MathUtils.lerp(0.4, target.y, e) + Math.sin(e * Math.PI) * s.lift;
      pos.setXYZ(n, x, y, z);
    });
    pos.needsUpdate = true;
  });
  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.09} color="#f3d48f" transparent opacity={0.95} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function RecordColumn() {
  const rows = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!rows.current) return;
    const t = clock.elapsedTime;
    rows.current.children.forEach((child, n) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.35 + 0.45 * Math.max(0, Math.sin(t * 1.2 - n * 0.6));
    });
  });
  return (
    <group position={[COLUMN.x, 0, COLUMN.z]}>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[1.3, 3.4, 1.3]} />
        <meshBasicMaterial color="#d4a94f" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[1.32, 3.42, 1.32]} />
        <meshBasicMaterial color="#d4a94f" wireframe transparent opacity={0.35} />
      </mesh>
      <group ref={rows}>
        {Array.from({ length: 7 }, (_, n) => (
          <mesh key={n} position={[0, 0.4 + n * 0.42, 0.67]}>
            <planeGeometry args={[1.05, 0.26]} />
            <meshBasicMaterial color={n === 2 ? "#ff6b5b" : "#3ddc97"} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  const base = useMemo(() => new THREE.Vector3(9, 9, 9), []);
  useEffect(() => {
    camera.position.copy(base);
    camera.lookAt(0.8, 0.4, 0);
  }, [camera, base]);
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, base.x + pointer.x * 0.8, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, base.z - pointer.y * 0.6, 0.04);
    camera.lookAt(0.8, 0.4, 0);
  });
  return null;
}

export default function HeroScene({ active, onReady }: { active: boolean; onReady?: () => void }) {
  const rooms = useRooms();
  return (
    <Canvas
      orthographic
      camera={{ zoom: 38, near: 0.1, far: 100, position: [9, 9, 9] }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={active ? "always" : "never"}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 10, 6]} intensity={1.2} />
      <Rig />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <planeGeometry args={[COLS * GAP + 1, ROWS * GAP + 1]} />
        <meshBasicMaterial color="#38e1ff" transparent opacity={0.04} />
      </mesh>
      <gridHelper args={[14, 14, "#1d3a6b", "#122447"]} position={[0, -0.19, 0]} />
      <Instances limit={COLS * ROWS}>
        <boxGeometry args={[1, 0.3, 1]} />
        <meshLambertMaterial />
        {rooms.map((room, n) => (
          <RoomTile key={n} room={room} />
        ))}
      </Instances>
      <Particles rooms={rooms} />
      <RecordColumn />
    </Canvas>
  );
}
