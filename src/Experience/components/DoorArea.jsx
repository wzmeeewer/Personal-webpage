import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useInteractionStore } from "../../store/useInteractionStore";
import {
  Box,
  Cylinder,
  PAPER_TEXTURES,
  PaperBox,
  colors,
} from "./BedroomPrimitives";

// ── 门牌纹理："联系" 黄铜牌 ─────────────────────────────────────
const makeNameplateTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 384;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // 黄铜渐变底色
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0,   "#e8bc6a");
  grad.addColorStop(0.5, "#d6a34e");
  grad.addColorStop(1,   "#c49038");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 384, 128);

  // 内框线
  ctx.strokeStyle = "#b88030";
  ctx.lineWidth = 5;
  ctx.strokeRect(9, 9, 366, 110);

  // 文字（纠正右侧墙面水平镜像 + 加大字号）
  ctx.save();
  ctx.translate(192, 64);
  ctx.scale(-1, 1);
  ctx.fillStyle = "#3a2010";
  ctx.font = "700 88px 'Microsoft YaHei UI', 'PingFang SC', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("联系", 0, 0);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
};

const DoorArea = () => {
  const isDoorOpen = useInteractionStore((state) => state.activeArea === "contact");
  const toggleArea = useInteractionStore((state) => state.toggleArea);
  const doorLeafRef = useRef(null);
  const nameTex = useMemo(() => makeNameplateTexture(), []);

  useEffect(() => {
    if (!doorLeafRef.current) return;
    gsap.to(doorLeafRef.current.rotation, {
      // -1.32 rad ≈ 75°，绕合页轴真实开合
      y: isDoorOpen ? -1.32 : 0,
      duration: 0.60,
      ease: isDoorOpen ? "back.out(1.15)" : "power2.inOut",
      overwrite: true,
    });
  }, [isDoorOpen]);

  return (
    <group
      position={[4.18, 1.14, 1.45]}
      onClick={(e) => { e.stopPropagation(); toggleArea("contact"); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      {/* ── 门框（固定，嵌入右侧墙） ──────────── */}
      {/* 主门套板 */}
      <PaperBox textureUrl={PAPER_TEXTURES.darkWood} uvRepeat={[1, 2]}
        position={[-0.02, 0, 0]} scale={[0.1, 2.28, 1.18]} />
      {/* 线脚：顶压条 */}
      <PaperBox textureUrl={PAPER_TEXTURES.darkWood}
        position={[-0.072, 1.16, 0]} scale={[0.058, 0.062, 1.15]} />
      {/* 线脚：左压条 */}
      <PaperBox textureUrl={PAPER_TEXTURES.darkWood}
        position={[-0.072, 0, -0.558]} scale={[0.058, 2.2, 0.062]} />
      {/* 线脚：右压条 */}
      <PaperBox textureUrl={PAPER_TEXTURES.darkWood}
        position={[-0.072, 0,  0.558]} scale={[0.058, 2.2, 0.062]} />
      {/* 门槛条 */}
      <Box color="#4a3020"
        position={[-0.072, -1.135, 0]} scale={[0.058, 0.052, 1.15]} />

      {/* ── 门扇（旋转轴在合页侧 z=+0.443）─────── */}
      {/* 把 ref 组的原点移到合页位置，内层偏移 -0.443 还原内容位置 */}
      <group ref={doorLeafRef} position={[-0.078, -0.04, 0.443]}>
        <group position={[0, 0, -0.443]}>
          {/* 门扇主体（深色木纹） */}
          <PaperBox textureUrl={PAPER_TEXTURES.darkWood} uvRepeat={[1, 2]}
            position={[0, 0, 0]} scale={[0.062, 2.06, 0.93]} />

          {/* 上面板（浅色，现代感） */}
          <PaperBox textureUrl={PAPER_TEXTURES.cream}
            position={[-0.048, 0.47, 0]} scale={[0.028, 0.82, 0.72]} />
          {/* 中间横档 */}
          <Box color="#3a2815"
            position={[-0.048, 0.04, 0]} scale={[0.032, 0.058, 0.74]} />
          {/* 下面板（浅色） */}
          <PaperBox textureUrl={PAPER_TEXTURES.cream}
            position={[-0.048, -0.44, 0]} scale={[0.028, 0.82, 0.72]} />

          {/* 门扇侧边线（加强轮廓感） */}
          <Box color="#2e1e10" position={[-0.038, 0, -0.448]} scale={[0.038, 2.02, 0.026]} />
          <Box color="#2e1e10" position={[-0.038, 0,  0.448]} scale={[0.038, 2.02, 0.026]} />

          {/* ── 门牌："联系" ──────────────────────── */}
          <mesh
            position={[-0.092, 0.47, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[0.28, 0.1, 1]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={nameTex} side={THREE.DoubleSide} toneMapped={false} />
          </mesh>

          {/* ── 现代竖条长杆把手 ──────────────────── */}
          {/* 主握杆 */}
          <Box color="#1e1410" position={[-0.115, 0, -0.32]} scale={[0.015, 0.36, 0.015]} />
          {/* 上端连接臂 */}
          <Box color="#1e1410" position={[-0.075, 0.18,  -0.32]} scale={[0.062, 0.013, 0.013]} />
          {/* 下端连接臂 */}
          <Box color="#1e1410" position={[-0.075, -0.18, -0.32]} scale={[0.062, 0.013, 0.013]} />
          {/* 固定螺丝头（黄铜色小圆） */}
          <Cylinder color={colors.brass}
            position={[-0.076, 0.18,  -0.32]}
            rotation={[0, 0, Math.PI / 2]}
            args={[0.011, 0.011, 0.016, 8]} />
          <Cylinder color={colors.brass}
            position={[-0.076, -0.18, -0.32]}
            rotation={[0, 0, Math.PI / 2]}
            args={[0.011, 0.011, 0.016, 8]} />

          {/* ── 合页（铰链）×2 ── 现位于旋转轴处 ── */}
          <Box color={colors.brass}
            position={[-0.038, 0.56,  0.443]} scale={[0.048, 0.115, 0.022]} />
          <Box color={colors.brass}
            position={[-0.038, -0.56, 0.443]} scale={[0.048, 0.115, 0.022]} />
          {/* 合页螺丝纹（装饰线） */}
          <Box color="#b88830"
            position={[-0.038, 0.56,  0.443]} scale={[0.05, 0.008, 0.024]} />
          <Box color="#b88830"
            position={[-0.038, -0.56, 0.443]} scale={[0.05, 0.008, 0.024]} />
        </group>
      </group>
    </group>
  );
};

export default DoorArea;
