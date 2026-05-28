import { useMemo } from "react";
import * as THREE from "three";
import { Box, Cylinder, PAPER_TEXTURES, PaperBox, colors } from "./BedroomPrimitives";

// ── PixelArtFrame ──────────────────────────────────────────────────────────
const makePixelArtTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const cell = 16;
  const pixels = [
    "................",
    ".....O....O.....",
    "....OPO..OPO....",
    "....OOOOOOOO....",
    "...OOOKOOKOOO...",
    "....OOOOPOOO....",
    "..OOOOOOOOOOOO..",
    "..OOOOWWWWOOOO..",
    "..OOOOWWWWOOOO..",
    "..OOOOOWWOOOOO..",
    "...OOOOOOOOOO...",
    "....OOO..OOO....",
    "....OO....OO....",
    "....OO....OO....",
    "................",
    "................",
  ];
  const palette = {
    ".": "#fff6e8",
    O: "#f4a460",
    P: "#f2a7bb",
    W: "#fff5e6",
    K: "#2f241f",
  };

  pixels.forEach((row, y) => {
    row.split("").forEach((key, x) => {
      ctx.fillStyle = palette[key];
      ctx.fillRect(x * cell, y * cell, cell, cell);
    });
  });

  ctx.strokeStyle = "#a86a55";
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, 248, 248);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
};

export const PixelArtFrame = () => {
  const texture = useMemo(() => makePixelArtTexture(), []);

  return (
    <group position={[-3.98, 2.25, -1.2]} rotation={[0.02, 0, -0.035]}>
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0.02, 0, 0]} scale={[0.05, 0.88, 1.42]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0.06, 0, 0]} scale={[0.042, 0.76, 1.26]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.09, 0.42, 0]} scale={[0.05, 0.07, 1.42]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.09, -0.42, 0]} scale={[0.05, 0.07, 1.42]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.09, 0, -0.71]} scale={[0.05, 0.84, 0.07]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.09, 0, 0.71]} scale={[0.05, 0.84, 0.07]} />
      <mesh position={[0.122, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[0.64, 0.64, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
};

// ── WindowPlant ────────────────────────────────────────────────────────────
export const WindowPlant = () => (
  <group position={[-1.35, 0.18, -2.82]}>
    <group position={[0, 0.16, 0]}>
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0, 0.105]} scale={[0.28, 0.28, 0.045]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0, -0.105]} scale={[0.24, 0.28, 0.045]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.13, 0, 0]} rotation={[0, 0.08, 0]} scale={[0.045, 0.28, 0.24]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.13, 0, 0]} rotation={[0, -0.08, 0]} scale={[0.045, 0.28, 0.24]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.155, 0]} scale={[0.32, 0.035, 0.28]} />
    </group>
    <Cylinder color="#7a9d64" position={[0, 0.42, 0]} args={[0.035, 0.03, 0.36, 8]} />
    <Cylinder color="#7a9d64" position={[-0.08, 0.56, 0.01]} rotation={[0, 0, -0.75]} args={[0.018, 0.016, 0.26, 6]} />
    <Cylinder color="#82b56e" position={[0.09, 0.58, -0.01]} rotation={[0, 0, 0.62]} args={[0.018, 0.016, 0.24, 6]} />
    <Cylinder color="#7a9d64" position={[0.02, 0.66, 0.02]} rotation={[0.22, 0, 0.22]} args={[0.014, 0.012, 0.2, 6]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#92bf75" position={[-0.17, 0.58, 0]} rotation={[0.1, 0.2, -0.62]} scale={[0.15, 0.035, 0.06]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#82b56e" position={[0.18, 0.58, 0.02]} rotation={[0.1, -0.2, 0.62]} scale={[0.15, 0.035, 0.06]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#b8d4a0" position={[0.02, 0.72, -0.02]} rotation={[0.18, 0.2, 0.18]} scale={[0.14, 0.035, 0.06]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#7a9d64" position={[-0.07, 0.69, 0.06]} rotation={[0.18, -0.25, -0.35]} scale={[0.12, 0.03, 0.055]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#92bf75" position={[0.11, 0.69, -0.07]} rotation={[0.2, 0.3, 0.36]} scale={[0.12, 0.03, 0.055]} />
    <Box color={colors.bookGreen} position={[-0.1, 0.51, -0.04]} rotation={[0, 0.2, -0.45]} scale={[0.1, 0.028, 0.05]} />
    <Box color="#82b56e" position={[0.09, 0.49, 0.06]} rotation={[0, -0.18, 0.42]} scale={[0.1, 0.028, 0.05]} />
  </group>
);
