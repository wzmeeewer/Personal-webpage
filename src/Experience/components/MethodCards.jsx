import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useInteractionStore } from "../../store/useInteractionStore";
import {
  PAPER_TEXTURES,
  PaperBox,
} from "./BedroomPrimitives";

// ── 斜向文字纹理："能力与方法" ───────────────────────────────────────
const makeMethodLabelTexture = () => {
  const W = 512, H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // 透明底
  ctx.clearRect(0, 0, W, H);

  // 纹理在右侧墙面会被水平镜像显示，用 scale(-1,1) 补偿；
  // 阶梯从左上→右下（从 methods 视角），文字顺阶梯方向（+0.70 rad ≈ 40°）
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.scale(-1, 1);   // 补偿显示镜像，使字符正向可读
  ctx.rotate(0.70);   // 屏幕上呈左上→右下方向

  // 文字描边（浅色光晕，增强可读性）
  ctx.strokeStyle = "rgba(255, 240, 255, 0.55)";
  ctx.lineWidth = 8;
  ctx.lineJoin = "round";
  ctx.font = "800 72px 'Microsoft YaHei UI', 'PingFang SC', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText("能力与方法", 0, 0);

  // 主文字（深紫）
  ctx.fillStyle = "#3a1880";
  ctx.fillText("能力与方法", 0, 0);

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
};

const MethodCards = () => {
  const isMethodOpen = useInteractionStore((state) => state.activeArea === "methods");
  const toggleArea = useInteractionStore((state) => state.toggleArea);
  const methodTopRef = useRef(null);
  const methodMiddleRef = useRef(null);
  const methodBottomRef = useRef(null);
  const labelTex = useMemo(() => makeMethodLabelTexture(), []);

  useEffect(() => {
    if (!methodTopRef.current || !methodMiddleRef.current || !methodBottomRef.current) {
      return;
    }

    const ease = isMethodOpen ? "back.out(1.35)" : "power2.inOut";
    gsap.to(methodTopRef.current.position, {
      y: isMethodOpen ? 0.34 : 0.26,
      z: isMethodOpen ? -0.42 : -0.28,
      duration: 0.45,
      ease,
      overwrite: true,
    });
    gsap.to(methodMiddleRef.current.position, {
      x: isMethodOpen ? -0.06 : 0,
      duration: 0.45,
      ease,
      overwrite: true,
    });
    gsap.to(methodBottomRef.current.position, {
      y: isMethodOpen ? -0.32 : -0.22,
      z: isMethodOpen ? 0.42 : 0.28,
      duration: 0.45,
      ease,
      overwrite: true,
    });
  }, [isMethodOpen]);

  return (
    <group
      position={[4.08, 2.1, -1.1]}
      onClick={(e) => { e.stopPropagation(); toggleArea("methods"); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      {/* ── 三张紫色卡片（阶梯排列）──────────────────────────── */}
      <group ref={methodTopRef} position={[0, 0.26, -0.28]}>
        <PaperBox
          textureUrl={PAPER_TEXTURES.cream}
          tintColor="#ddd0f0"
          position={[0, 0, 0]}
          scale={[0.08, 0.64, 0.36]}
        />
      </group>
      <group ref={methodMiddleRef} position={[0, 0.02, 0]}>
        <PaperBox
          textureUrl={PAPER_TEXTURES.cream}
          tintColor="#ddd0f0"
          position={[0, 0, 0]}
          scale={[0.08, 0.64, 0.36]}
        />
      </group>
      <group ref={methodBottomRef} position={[0, -0.22, 0.28]}>
        <PaperBox
          textureUrl={PAPER_TEXTURES.cream}
          tintColor="#ddd0f0"
          position={[0, 0, 0]}
          scale={[0.08, 0.64, 0.36]}
        />
      </group>

      {/* ── 斜向文字标签："能力与方法" ─────────────────────────── */}
      {/* 覆盖三张卡片的整体范围；中心对齐阶梯中点 */}
      <mesh
        position={[-0.05, 0.02, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.92, 1.12, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={labelTex}
          side={THREE.DoubleSide}
          transparent={true}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default MethodCards;
