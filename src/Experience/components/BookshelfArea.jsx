import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInteractionStore } from "../../store/useInteractionStore";
import {
  Box,
  PAPER_TEXTURES,
  PaperBox,
  Sphere,
  PopObjectText,
  colors,
} from "./BedroomPrimitives";

const ShelfBook = ({
  color,
  accent = "#fff3d3",
  position,
  rotation = [0, 0, 0],
  scale = [0.14, 0.5, 0.28],
}) => (
  <group position={position} rotation={rotation}>
    <PaperBox
      textureUrl={PAPER_TEXTURES.linenBook}
      tintColor={color}
      position={[0, 0, 0]}
      scale={scale}
    />
    <Box
      color={accent}
      position={[0, scale[1] * 0.25, scale[2] * 0.52]}
      scale={[scale[0] * 0.66, scale[1] * 0.08, 0.012]}
    />
    <Box
      color="#fff9ec"
      position={[0, -scale[1] * 0.38, scale[2] * 0.52]}
      scale={[scale[0] * 0.72, scale[1] * 0.06, 0.012]}
    />
  </group>
);

const ShelfTape = ({ color = "#f8d79b", position, rotation, scale }) => (
  <group position={position} rotation={rotation}>
    <Box color={color} position={[0, 0, 0]} scale={scale} />
    <Box
      color="#fff3cb"
      position={[0, 0.012, 0.002]}
      scale={[scale[0] * 0.82, scale[1] * 0.28, scale[2] * 1.05]}
    />
  </group>
);

const ProjectHitBox = ({ position, scale }) => (
  <mesh position={position} scale={scale}>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
  </mesh>
);

const ShelfMiniLabel = ({ text, position }) => (
  <group position={position}>
    <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0, 0, 0]} scale={[0.42, 0.18, 0.035]} />
    <Box color="#b98062" position={[-0.18, 0, 0.022]} scale={[0.035, 0.12, 0.016]} />
    <PopObjectText
      text={text}
      position={[0.045, 0.015, 0.031]}
      scale={[0.29, 0.1, 1]}
      color="#7c3f3b"
      fontSize={72}
    />
    <Box color="#c49a6c" position={[0.04, -0.05, 0.026]} scale={[0.16, 0.012, 0.012]} />
  </group>
);

const PapercraftBookshelf = ({ openProjects }) => {
  return (
    <group>
      <PaperBox textureUrl={PAPER_TEXTURES.decorativeBack} uvRepeat={[1, 2]} position={[0, 1.18, -0.04]} scale={[1.48, 2.28, 0.08]} />
      {/* 书架背面封板 — 防止相机看到书架反面 */}
      <PaperBox
        textureUrl={PAPER_TEXTURES.cardboard}
        position={[0, 1.18, -0.28]}
        scale={[1.68, 2.44, 0.08]}
      />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[1, 2]} position={[-0.78, 1.18, 0.05]} scale={[0.15, 2.44, 0.48]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[1, 2]} position={[0.78, 1.18, 0.05]} scale={[0.15, 2.44, 0.48]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[2, 1]} position={[0, 2.36, 0.06]} scale={[1.68, 0.16, 0.5]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[2, 1]} position={[0, 0.04, 0.06]} scale={[1.68, 0.16, 0.5]} />

      {[0.64, 1.23, 1.82].map((height) => (
        <group key={height}>
          <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[2, 1]} position={[0, height, 0.08]} scale={[1.42, 0.11, 0.44]} />
          <Box color="#9d6348" position={[0, height - 0.055, 0.31]} scale={[1.36, 0.05, 0.08]} />
          <Box color="#e7b98e" position={[0, height + 0.048, 0.315]} scale={[1.32, 0.028, 0.045]} />
        </group>
      ))}

      <PaperBox textureUrl={PAPER_TEXTURES.darkWood} position={[-0.78, 1.18, 0.32]} scale={[0.08, 2.28, 0.08]} />
      <PaperBox textureUrl={PAPER_TEXTURES.darkWood} position={[0.78, 1.18, 0.32]} scale={[0.08, 2.28, 0.08]} />
      <Box color="#f1c89d" position={[-0.66, 1.18, 0.34]} scale={[0.035, 2.08, 0.04]} />
      <Box color="#f1c89d" position={[0.66, 1.18, 0.34]} scale={[0.035, 2.08, 0.04]} />

      <group
        onClick={(e) => { e.stopPropagation(); openProjects(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <ShelfBook color={colors.bookRose} position={[-0.49, 0.36, 0.28]} scale={[0.13, 0.48, 0.29]} />
        <ShelfBook color={colors.bookBlue} position={[-0.33, 0.35, 0.26]} scale={[0.14, 0.52, 0.3]} />
        <ShelfBook color={colors.bookYellow} position={[-0.16, 0.38, 0.28]} scale={[0.13, 0.58, 0.29]} />
        <ShelfBook color={colors.bookYellow} position={[-0.53, 0.96, 0.28]} scale={[0.13, 0.5, 0.29]} />
        <ShelfBook color={colors.bookGreen} position={[-0.36, 0.94, 0.27]} scale={[0.14, 0.46, 0.3]} />
        <ShelfBook color={colors.bookRose} position={[-0.19, 0.98, 0.28]} scale={[0.14, 0.54, 0.29]} />
        <ShelfBook color={colors.bookBlue} position={[-0.47, 1.55, 0.28]} scale={[0.13, 0.47, 0.29]} />
        <ShelfBook color={colors.bookRose} position={[-0.3, 1.55, 0.28]} scale={[0.13, 0.48, 0.29]} />
        <ShelfBook color={colors.bookYellow} position={[-0.13, 1.58, 0.28]} scale={[0.13, 0.54, 0.29]} />
        <ShelfMiniLabel text="项目 01" position={[-0.34, 1.9, 0.36]} />
        <ProjectHitBox position={[-0.34, 0.98, 0.28]} scale={[0.72, 1.55, 0.36]} />
      </group>

      <group
        onClick={(e) => { e.stopPropagation(); openProjects(); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <ShelfBook color={colors.bookGreen} position={[0.03, 0.35, 0.27]} scale={[0.15, 0.49, 0.3]} />
        <ShelfBook color={colors.bookBlue} position={[0.23, 0.35, 0.27]} rotation={[0, 0, -0.1]} scale={[0.14, 0.5, 0.3]} />
        <ShelfBook color={colors.bookRose} position={[0.46, 0.33, 0.28]} scale={[0.18, 0.42, 0.29]} />
        <ShelfBook color={colors.bookBlue} position={[0.05, 0.89, 0.29]} rotation={[0, 0, 0.1]} scale={[0.16, 0.43, 0.29]} />
        <ShelfBook color="#fff7e8" accent="#f2d1aa" position={[0.39, 0.9, 0.25]} scale={[0.36, 0.36, 0.25]} />
        <ShelfBook color={colors.bookGreen} position={[0.08, 1.54, 0.27]} scale={[0.15, 0.45, 0.29]} />
        <ShelfBook color="#fff7e8" accent="#f1c49d" position={[0.4, 1.48, 0.26]} scale={[0.38, 0.34, 0.25]} />
        <ShelfMiniLabel text="项目 02" position={[0.32, 1.9, 0.36]} />
        <ProjectHitBox position={[0.28, 0.98, 0.28]} scale={[0.78, 1.55, 0.36]} />
      </group>

      <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor="#fff8e9" position={[-0.38, 2.08, 0.2]} rotation={[0, 0, -0.04]} scale={[0.46, 0.28, 0.3]} />
      <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor={colors.bookBlue} position={[0.24, 2.08, 0.19]} scale={[0.58, 0.32, 0.32]} />
      <ShelfTape position={[-0.5, 2.24, 0.35]} rotation={[0, 0, 0.1]} scale={[0.28, 0.04, 0.025]} />
      <ShelfTape color="#f5b3c1" position={[0.55, 2.2, 0.35]} rotation={[0, 0, -0.12]} scale={[0.3, 0.04, 0.025]} />
      <Sphere color="#f4a8b7" position={[-0.66, 2.27, 0.35]} scale={[0.045, 0.045, 0.045]} />
      <Sphere color="#8fb9de" position={[0.68, 2.27, 0.35]} scale={[0.04, 0.04, 0.04]} />

    </group>
  );
};

const BookshelfArea = () => {
  const isProjectBookOpen = useInteractionStore((state) => state.activeArea === "projects");
  const toggleArea = useInteractionStore((state) => state.toggleArea);
  const setActiveArea = useInteractionStore((state) => state.setActiveArea);
  const projectBookRef = useRef(null);
  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);

  useEffect(() => {
    if (!projectBookRef.current || !leftPageRef.current || !rightPageRef.current) {
      return;
    }

    const ease = isProjectBookOpen ? "back.out(1.2)" : "power2.inOut";

    // 书向观者方向滑出：上抬 + 前推
    gsap.to(projectBookRef.current.position, {
      y: isProjectBookOpen ? 2.42 : 2.1,
      z: isProjectBookOpen ? 0.62 : 0.2,
      duration: 0.60,
      ease,
      overwrite: true,
    });
    // 书仰起，朝向观者（绕 X 轴）—— 像从架上拿起来展示封面
    gsap.to(projectBookRef.current.rotation, {
      x: isProjectBookOpen ? -0.42 : 0,
      duration: 0.60,
      ease,
      overwrite: true,
    });
    gsap.to(projectBookRef.current.scale, {
      x: isProjectBookOpen ? 1.12 : 1,
      y: isProjectBookOpen ? 1.12 : 1,
      z: isProjectBookOpen ? 1.08 : 1,
      duration: 0.60,
      ease,
      overwrite: true,
    });
    // 书页展开（配合仰起后自然向两侧打开）
    gsap.to(leftPageRef.current.rotation, {
      y: isProjectBookOpen ? 0.78 : 0,
      duration: 0.72,
      ease,
      overwrite: true,
    });
    gsap.to(rightPageRef.current.rotation, {
      y: isProjectBookOpen ? -0.78 : 0,
      duration: 0.72,
      ease,
      overwrite: true,
    });
  }, [isProjectBookOpen]);

  return (
    <group position={[0.05, 0.02, -2.78]}>
      <PapercraftBookshelf openProjects={() => setActiveArea("projects")} />

      <group
        ref={projectBookRef}
        position={[0, 2.1, 0.2]}
        onClick={(e) => { e.stopPropagation(); toggleArea("projects"); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <PaperBox textureUrl={PAPER_TEXTURES.linenBook} tintColor={colors.bookCover} position={[0, 0, -0.03]} scale={[1.18, 0.28, 0.09]} />
        <group ref={leftPageRef} position={[-0.03, 0, 0.02]}>
          <Box color={colors.bookPage} position={[-0.29, 0, 0]} scale={[0.56, 0.25, 0.035]} />
        </group>
        <group ref={rightPageRef} position={[0.03, 0, 0.02]}>
          <Box color={colors.bookBlue} position={[0.27, 0, 0]} scale={[0.52, 0.25, 0.035]} />
        </group>
        <Box color={colors.bookshelfDark} position={[0, -0.17, -0.035]} scale={[1.22, 0.05, 0.12]} />
      </group>
    </group>
  );
};

export default BookshelfArea;
