/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";

export const colors = {
  floor: "#f4d3b6",
  floorLine: "#d9aa83",
  backWall: "#ffd9cc",
  leftWall: "#f8b9c6",
  rightWall: "#ffe39b",
  ceiling: "#fff0df",
  trim: "#d99b7c",
  windowFrame: "#ffffff",
  windowGlass: "#b8d7ee",
  door: "#f2bd91",
  doorInset: "#f8d5b8",
  bedBase: "#e7b087",
  mattress: "#fff7ec",
  blanket: "#f4aebd",
  blanketEdge: "#ed8fa8",
  pillow: "#fffdf7",
  shadow: "#c1846f",
  rug: "#f6c3ca",
  brass: "#d6a34e",
  desk: "#d19a70",
  deskDark: "#9b6550",
  chair: "#c98678",
  wardrobe: "#e6b180",
  wardrobeDoor: "#f6cfaa",
  wardrobeTrim: "#a66b58",
  skin: "#efc4aa",
  hair: "#654336",
  shirt: "#f1a6ba",
  pants: "#9fb9d7",
  bookCover: "#8db7e2",
  bookPage: "#fff7e8",
  bookshelf: "#d99a6d",
  bookshelfDark: "#9d6850",
  shelfBack: "#ffe0c8",
  bookRose: "#e98aa2",
  bookBlue: "#83b3d8",
  bookYellow: "#f4cc76",
  bookGreen: "#a7c99a",
  lamp: "#fff3cc",
  lampWarm: "#fff0b7",
};

export const labelRotation = {
  rightWall: [0, -Math.PI / 2, 0],
  leftWall: [0, Math.PI / 2, 0],
  floor: [-Math.PI / 2, 0, 0],
};

export const paperMat = (color) => (
  <meshBasicMaterial color={color} side={THREE.DoubleSide} toneMapped={false} />
);

const BASE = import.meta.env.BASE_URL;

export const PAPER_TEXTURES = {
  wood: `${BASE}textures/paper/wood.webp`,
  cream: `${BASE}textures/paper/cream_paper.webp`,
  pink: `${BASE}textures/paper/pink_paper.webp`,
  yellow: `${BASE}textures/paper/yellow_paper.webp`,
  warmOrange: `${BASE}textures/paper/warm_orange_paper.webp`,
  decorativeBack: `${BASE}textures/paper/decorative_back.webp`,
  quiltFabric:  `${BASE}textures/paper/quilt_fabric.webp`,
  pillowFabric: `${BASE}textures/paper/pillow_fabric.webp`,
  rugFabric:    `${BASE}textures/paper/rug_fabric.webp`,
  darkWood:     `${BASE}textures/paper/dark_wood.webp`,
  whiteWood:    `${BASE}textures/paper/white_wood.webp`,
  linenBook:    `${BASE}textures/paper/linen_book.webp`,
  cardboard:    `${BASE}textures/paper/cardboard.webp`,
  shirtFabric:  `${BASE}textures/paper/shirt_fabric.webp`,
};

export const Box = ({ color, position, rotation, scale }) => (
  <mesh position={position} rotation={rotation} scale={scale}>
    <boxGeometry args={[1, 1, 1]} />
    {paperMat(color)}
  </mesh>
);

const calculateRepeat = (scale, uvRepeat) => {
  if (uvRepeat) return uvRepeat;
  if (!scale) return [1, 1];

  return [
    Math.max(1, Math.ceil(Math.abs(scale[0]) / 1.2)),
    Math.max(1, Math.ceil(Math.abs(scale[1]) / 1.2)),
  ];
};

const EdgePlane = ({ position, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <planeGeometry args={[1, 1]} />
    <meshBasicMaterial
      color="#8a6a5a"
      side={THREE.DoubleSide}
      toneMapped={false}
      opacity={0.46}
      transparent
      depthWrite={false}
    />
  </mesh>
);

const TexturedPaperBox = ({ textureUrl, position, rotation, scale, uvRepeat, tintColor = "#ffffff" }) => {
  const sourceTexture = useTexture(textureUrl);
  const texture = useMemo(() => {
    const clonedTexture = sourceTexture.clone();
    clonedTexture.colorSpace = THREE.SRGBColorSpace;
    clonedTexture.wrapS = THREE.RepeatWrapping;
    clonedTexture.wrapT = THREE.RepeatWrapping;
    const repeat = calculateRepeat(scale, uvRepeat);
    clonedTexture.repeat.set(repeat[0], repeat[1]);
    clonedTexture.anisotropy = 8;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [sourceTexture, scale, uvRepeat]);

  const thinX = scale && Math.abs(scale[0]) < 0.15;
  const thinY = scale && Math.abs(scale[1]) < 0.15;
  const thinZ = scale && Math.abs(scale[2]) < 0.15;
  const hasThinAxis = thinX || thinY || thinZ;

  const boxMesh = (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={texture} color={tintColor} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );

  if (!hasThinAxis) {
    return (
      <mesh position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial map={texture} color={tintColor} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    );
  }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {boxMesh}
      {thinX && (
        <>
          <EdgePlane position={[0, 0.512, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <EdgePlane position={[0, -0.512, 0]} rotation={[Math.PI / 2, 0, 0]} />
          <EdgePlane position={[0, 0, 0.512]} rotation={[0, 0, 0]} />
          <EdgePlane position={[0, 0, -0.512]} rotation={[0, Math.PI, 0]} />
        </>
      )}
      {thinY && (
        <>
          <EdgePlane position={[0.512, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
          <EdgePlane position={[-0.512, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
          <EdgePlane position={[0, 0, 0.512]} rotation={[0, 0, 0]} />
          <EdgePlane position={[0, 0, -0.512]} rotation={[0, Math.PI, 0]} />
        </>
      )}
      {thinZ && (
        <>
          <EdgePlane position={[0.512, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
          <EdgePlane position={[-0.512, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
          <EdgePlane position={[0, 0.512, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <EdgePlane position={[0, -0.512, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </>
      )}
    </group>
  );
};

export const PaperBox = ({ textureUrl, position, rotation, scale, uvRepeat, tintColor }) => (
  <React.Suspense fallback={<Box color="#ddd0c0" position={position} rotation={rotation} scale={scale} />}>
    <TexturedPaperBox
      textureUrl={textureUrl}
      position={position}
      rotation={rotation}
      scale={scale}
      uvRepeat={uvRepeat}
      tintColor={tintColor}
    />
  </React.Suspense>
);

const getNoteFontSize = (value, fallback) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

const wrapCanvasText = (ctx, text, maxWidth) => {
  const lines = [];

  String(text || "")
    .split("\n")
    .forEach((paragraph) => {
      let currentLine = "";
      paragraph.split("").forEach((char) => {
        const testLine = `${currentLine}${char}`;
        if (ctx.measureText(testLine).width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = char;
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) lines.push(currentLine);
    });

  return lines;
};

const makePaperNoteTexture = ({ title, body, tags = [], bodyFontSize }) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  const bodySize = getNoteFontSize(bodyFontSize, 32);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#7c3f3b";
  ctx.font = "700 48px 'Microsoft YaHei UI', 'PingFang SC', sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(title, 72, 62);

  ctx.fillStyle = "#8b5a4e";
  ctx.font = `500 ${bodySize}px 'Microsoft YaHei UI', 'PingFang SC', sans-serif`;
  const lines = wrapCanvasText(ctx, body, 870).slice(0, 10);
  lines.forEach((line, index) => {
    ctx.fillText(line, 72, 150 + index * (bodySize + 16));
  });

  let chipX = 72;
  let chipY = 590;
  ctx.font = "700 26px 'Microsoft YaHei UI', 'PingFang SC', sans-serif";
  tags.forEach((tag) => {
    const width = Math.min(276, ctx.measureText(tag).width + 42);
    if (chipX + width > 952) {
      chipX = 72;
      chipY += 46;
    }

    ctx.fillStyle = "rgba(255, 211, 146, 0.72)";
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, width, 34, 14);
    ctx.fill();
    ctx.fillStyle = "#7c3f3b";
    ctx.fillText(tag, chipX + 21, chipY + 4);
    chipX += width + 14;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
};

export const PaperNoteCard = ({
  title,
  body,
  tags = [],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  bodyFontSize,
}) => {
  const groupRef = useRef(null);
  const texture = useMemo(
    () => makePaperNoteTexture({ title, body, tags, bodyFontSize }),
    [body, bodyFontSize, tags, title],
  );

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.5 * scale[0], y: 0.5 * scale[1], z: 0.5 * scale[2] },
      {
        x: scale[0],
        y: scale[1],
        z: scale[2],
        duration: 0.28,
        ease: "back.out(1.8)",
      },
    );
  }, [scale]);

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <Box color="#ddc7ad" position={[0.045, -0.045, -0.04]} scale={[2.22, 1.54, 0.035]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0, 0, 0]} scale={[2.08, 1.42, 0.04]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0, 0.74, 0.012]} scale={[2.22, 0.055, 0.065]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0, -0.74, 0.012]} scale={[2.22, 0.055, 0.065]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[-1.1, 0, 0.012]} scale={[0.055, 1.5, 0.065]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[1.1, 0, 0.012]} scale={[0.055, 1.5, 0.065]} />
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[1.92, 1.28]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export const Cylinder = ({ color, position, rotation, args }) => (
  <mesh position={position} rotation={rotation}>
    <cylinderGeometry args={args} />
    {paperMat(color)}
  </mesh>
);

export const Sphere = ({ color, position, scale }) => (
  <mesh position={position} scale={scale}>
    <sphereGeometry args={[1, 16, 12]} />
    {paperMat(color)}
  </mesh>
);

export const setHoverState = (event, setter, value) => {
  event.stopPropagation();
  setter(value);
  document.body.style.cursor = value ? "pointer" : "auto";
};

const makeInkTexture = ({ text, color = "#8b4a42", fontSize = 92 }) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 384;
  const ctx = canvas.getContext("2d");
  const actualFontSize = fontSize * 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `900 ${actualFontSize}px 'Microsoft YaHei UI', 'PingFang SC', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(255, 247, 232, 0.72)";
  ctx.lineWidth = Math.max(8, actualFontSize * 0.08);
  ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = color;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
};

const ObjectText = ({
  text,
  position,
  rotation = [0, 0, 0],
  scale = [0.4, 0.15, 1],
  color,
  fontSize,
}) => {
  const texture = useMemo(
    () => makeInkTexture({ text, color, fontSize }),
    [text, color, fontSize],
  );

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 0.375]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
};

export const PopObjectText = (props) => {
  const groupRef = useRef(null);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.55, y: 0.55, z: 0.55 },
      { x: 1, y: 1, z: 1, duration: 0.28, ease: "back.out(1.8)" },
    );
  }, []);

  return (
    <group ref={groupRef}>
      <ObjectText {...props} />
    </group>
  );
};
