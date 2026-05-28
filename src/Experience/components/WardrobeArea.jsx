import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { about } from "../../data/profileData";
import { useInteractionStore } from "../../store/useInteractionStore";
import {
  Box,
  PAPER_TEXTURES,
  PaperBox,
  PopObjectText,
  colors,
  labelRotation,
} from "./BedroomPrimitives";

// ── 门板竖排标签纹理 ──────────────────────────────────────────
const makeDoorLabelTexture = (text) => {
  const W = 128, H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, W, H);

  const chars = [...text];
  const totalH = chars.length * 80;
  const startY = (H - totalH) / 2 + 50;

  ctx.font = "700 64px 'Microsoft YaHei UI', 'PingFang SC', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  chars.forEach((ch, i) => {
    const y = startY + i * 80;
    // 深色描边
    ctx.strokeStyle = "rgba(50, 25, 8, 0.45)";
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.strokeText(ch, W / 2, y);
    // 奶白填充
    ctx.fillStyle = "#f6e8c8";
    ctx.fillText(ch, W / 2, y);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
};

const makeMirrorTextTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#d8e8f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.34)";
  ctx.beginPath();
  ctx.moveTo(72, 0);
  ctx.lineTo(268, 0);
  ctx.lineTo(118, 1024);
  ctx.lineTo(0, 1024);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#834a40";
  ctx.font = "700 44px 'Microsoft YaHei UI', 'PingFang SC', sans-serif";
  ctx.fillText(about.title, 74, 120);

  ctx.font = "500 32px 'Microsoft YaHei UI', 'PingFang SC', sans-serif";
  ctx.fillStyle = "#6f554d";
  const lines = [
    "把图像观察拆成规则。",
    "把数据质量落到流程。",
    "让 AI 更懂图像。",
  ];

  lines.forEach((line, index) => {
    ctx.fillText(line, 74, 220 + index * 62);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};

const MirrorText = () => {
  const texture = useMemo(() => makeMirrorTextTexture(), []);

  return (
    <>
      <mesh position={[0.366, 1.32, 0]} rotation={labelRotation.leftWall} scale={[0.78, 1.02, 1]}>
        <planeGeometry args={[1, 1.35]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.374, 1.32, 0]} rotation={labelRotation.leftWall} scale={[0.78, 1.02, 1]}>
        <planeGeometry args={[1, 1.35]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

const WardrobeFrontPlaque = () => (
  <group position={[0.335, 1.66, 0]} rotation={[0, 0, -0.012]}>
    <Box color="#7a4a36" position={[-0.018, -0.02, 0.025]} scale={[0.035, 0.38, 0.78]} />
    <PaperBox
      textureUrl={PAPER_TEXTURES.cream}
      tintColor="#fff3df"
      position={[0, 0, 0]}
      scale={[0.04, 0.34, 0.72]}
    />
    <Box color="#f2b6c5" position={[0.035, 0.16, -0.23]} rotation={[0, Math.PI / 2, 0.08]} scale={[0.2, 0.035, 0.024]} />
    <Box color="#f8d79b" position={[0.035, 0.16, 0.23]} rotation={[0, Math.PI / 2, -0.08]} scale={[0.2, 0.035, 0.024]} />
    <PopObjectText
      text="关于我"
      position={[0.036, -0.005, 0]}
      rotation={[0, Math.PI / 2, 0]}
      scale={[0.62, 0.9, 1]}
      color="#5b2f2b"
      fontSize={96}
    />
  </group>
);

// ── 单扇推拉门（可复用）─────────────────────────────────────────
// handleSide: +1 = 把手在右侧（左门内边）, -1 = 把手在左侧（右门内边）
// label: 可选，竖排文字标签
const SlidingDoorLeaf = ({ handleSide = 1, label = null }) => (
  <group>
    {/* 门扇主体（深色木纹框）*/}
    <PaperBox
      textureUrl={PAPER_TEXTURES.darkWood}
      uvRepeat={[1, 3]}
      position={[0, 0, 0]}
      scale={[0.055, 1.84, 0.57]}
    />

    {/* 上嵌板（奶油纸纹，微内凹）*/}
    <PaperBox
      textureUrl={PAPER_TEXTURES.cream}
      position={[-0.027, 0.52, 0]}
      scale={[0.030, 0.72, 0.43]}
    />

    {/* 中横档（加强框架感）*/}
    <Box
      color="#1c1008"
      position={[-0.027, 0.08, 0]}
      scale={[0.034, 0.062, 0.49]}
    />

    {/* 下嵌板（奶油纸纹）*/}
    <PaperBox
      textureUrl={PAPER_TEXTURES.cream}
      position={[-0.027, -0.45, 0]}
      scale={[0.030, 0.78, 0.43]}
    />

    {/* 暗槽把手（内侧边缘凹槽）*/}
    <Box
      color="#0a0604"
      position={[-0.040, 0.02, handleSide * 0.228]}
      scale={[0.065, 0.22, 0.040]}
    />
    {/* 把手上沿高光（增加立体感）*/}
    <Box
      color="#3a2415"
      position={[-0.038, 0.13, handleSide * 0.228]}
      scale={[0.068, 0.010, 0.042]}
    />
    {/* 把手下沿高光 */}
    <Box
      color="#3a2415"
      position={[-0.038, -0.09, handleSide * 0.228]}
      scale={[0.068, 0.010, 0.042]}
    />

    {/* 门板竖排文字标签 */}
    {label && (
      <mesh
        position={[0.032, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.38, 1.3, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={label}
          side={THREE.FrontSide}
          transparent={true}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    )}
  </group>
);

const WardrobeArea = () => {
  const isWardrobeOpen = useInteractionStore((state) => state.activeArea === "about");
  const toggleArea = useInteractionStore((state) => state.toggleArea);
  const wardrobeLeftDoorRef  = useRef(null);
  const wardrobeRightDoorRef = useRef(null);
  const labelLeft  = useMemo(() => makeDoorLabelTexture("关于"), []);
  const labelRight = useMemo(() => makeDoorLabelTexture("我"),   []);

  useEffect(() => {
    if (!wardrobeLeftDoorRef.current || !wardrobeRightDoorRef.current) return;

    // 推拉动画：Z 轴平移（不再旋转）
    const ease = isWardrobeOpen ? "power2.out" : "power2.inOut";
    gsap.to(wardrobeLeftDoorRef.current.position, {
      z: isWardrobeOpen ? -0.62 : -0.31,
      duration: 0.65,
      ease,
      overwrite: true,
    });
    gsap.to(wardrobeRightDoorRef.current.position, {
      z: isWardrobeOpen ? 0.62 : 0.31,
      duration: 0.65,
      ease,
      overwrite: true,
    });
  }, [isWardrobeOpen]);

  return (
    <group
      position={[-4.02, 0.04, 1.12]}
      onClick={(e) => { e.stopPropagation(); toggleArea("about"); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      {/* ── 柜体主箱 ──────────────────────────────────────────── */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.darkWood}
        uvRepeat={[1, 2]}
        position={[0, 1.12, 0]}
        scale={[0.50, 2.22, 1.35]}
      />
      {/* 背面封板 */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.cardboard}
        position={[0.04, 1.12, 0]}
        scale={[0.08, 2.22, 1.35]}
      />
      {/* 内部装饰背板 */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.decorativeBack}
        uvRepeat={[1, 2]}
        position={[0.29, 1.13, 0]}
        scale={[0.04, 1.86, 1.12]}
      />

      {/* ── 两侧立柱（门框）─────────────────────────────────── */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.darkWood}
        position={[0.31, 1.20, -0.61]}
        scale={[0.072, 1.95, 0.09]}
      />
      <PaperBox
        textureUrl={PAPER_TEXTURES.darkWood}
        position={[0.31, 1.20, 0.61]}
        scale={[0.072, 1.95, 0.09]}
      />

      {/* ── 导轨系统 ──────────────────────────────────────────── */}
      {/* 顶部导轨槽 */}
      <Box
        color="#18100a"
        position={[0.298, 2.185, 0]}
        scale={[0.052, 0.050, 1.20]}
      />
      {/* 底部导轨槽 */}
      <Box
        color="#18100a"
        position={[0.298, 0.215, 0]}
        scale={[0.052, 0.050, 1.20]}
      />

      {/* ── 顶部飞檐 ──────────────────────────────────────────── */}
      {/* 主飞檐板 */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.darkWood}
        position={[0.04, 2.305, 0]}
        scale={[0.64, 0.115, 1.45]}
      />
      {/* 飞檐前沿探出线脚 */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.darkWood}
        position={[-0.09, 2.305, 0]}
        scale={[0.065, 0.10, 1.45]}
      />
      {/* 飞檐下压条 */}
      <Box
        color="#1c1008"
        position={[-0.06, 2.245, 0]}
        scale={[0.035, 0.020, 1.40]}
      />

      {/* ── 底部踢脚板 ────────────────────────────────────────── */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.darkWood}
        position={[0.07, 0.115, 0]}
        scale={[0.56, 0.17, 1.40]}
      />

      {/* ── 左门扇（向左滑开）────────────────────────────────── */}
      {/* handleSide=+1 → 把手在右侧（内侧）*/}
      <group ref={wardrobeLeftDoorRef} position={[0.27, 1.15, -0.31]}>
        <SlidingDoorLeaf handleSide={1} label={labelLeft} />
      </group>

      {/* ── 右门扇（向右滑开）────────────────────────────────── */}
      {/* handleSide=-1 → 把手在左侧（内侧）*/}
      <group ref={wardrobeRightDoorRef} position={[0.27, 1.15, 0.31]}>
        <SlidingDoorLeaf handleSide={-1} label={labelRight} />
      </group>
      {!isWardrobeOpen && <WardrobeFrontPlaque />}
      {isWardrobeOpen && (
        <>
          <PaperBox textureUrl={PAPER_TEXTURES.cream}  position={[0.34, 1.32, 0]}     scale={[0.04, 1.54, 0.9]}  />
          <PaperBox textureUrl={PAPER_TEXTURES.wood}   position={[0.37, 2.11, 0]}     scale={[0.055, 0.055, 0.98]} />
          <PaperBox textureUrl={PAPER_TEXTURES.wood}   position={[0.37, 0.53, 0]}     scale={[0.055, 0.055, 0.98]} />
          <PaperBox textureUrl={PAPER_TEXTURES.wood}   position={[0.37, 1.32, -0.48]} scale={[0.055, 1.54, 0.055]} />
          <PaperBox textureUrl={PAPER_TEXTURES.wood}   position={[0.37, 1.32,  0.48]} scale={[0.055, 1.54, 0.055]} />
          <MirrorText />
          <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor="#f4aebd"          position={[0.41, 2.02, -0.40]} rotation={[0, 0,  0.08]} scale={[0.038, 0.13, 0.16]} />
          <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor="#ffe39b"          position={[0.41, 0.66,  0.38]} rotation={[0, 0, -0.06]} scale={[0.038, 0.12, 0.14]} />
          <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor="#8db7e2"          position={[0.41, 1.98,  0.40]} rotation={[0, 0, -0.04]} scale={[0.038, 0.10, 0.13]} />
          <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor={colors.bookRose}  position={[0.39, 1.35, -0.45]} scale={[0.04, 0.48, 0.25]} />
          <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor={colors.bookBlue}  position={[0.40, 1.12, -0.39]} scale={[0.04, 0.34, 0.22]} />
          <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor={colors.bookGreen} position={[0.39, 1.48,  0.42]} scale={[0.04, 0.42, 0.24]} />
        </>
      )}

    </group>
  );
};

export default WardrobeArea;
