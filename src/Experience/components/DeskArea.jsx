import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInteractionStore } from "../../store/useInteractionStore";
import {
  Box,
  Cylinder,
  PAPER_TEXTURES,
  PaperBox,
  PopObjectText,
  colors,
  paperMat,
} from "./BedroomPrimitives";

const DeskArea = () => {
  const isDeskBookOpen = useInteractionStore((state) => state.activeArea === "notes");
  const toggleArea = useInteractionStore((state) => state.toggleArea);
  const deskBookRef = useRef(null);
  const deskLeftPageRef = useRef(null);
  const deskRightPageRef = useRef(null);

  useEffect(() => {
    if (!deskBookRef.current || !deskLeftPageRef.current || !deskRightPageRef.current) {
      return;
    }

    const ease = isDeskBookOpen ? "back.out(1.4)" : "power2.inOut";
    gsap.to(deskBookRef.current.position, {
      y: isDeskBookOpen ? 0.88 : 0.8,
      duration: 0.45,
      ease,
      overwrite: true,
    });
    gsap.to(deskLeftPageRef.current.rotation, {
      z: isDeskBookOpen ? 0.18 : 0.08,
      duration: 0.45,
      ease,
      overwrite: true,
    });
    gsap.to(deskRightPageRef.current.rotation, {
      z: isDeskBookOpen ? -0.18 : -0.08,
      duration: 0.45,
      ease,
      overwrite: true,
    });
  }, [isDeskBookOpen]);

  return (
    <group
      position={[-2.35, 0, -2.08]}
      onClick={(e) => { e.stopPropagation(); toggleArea("notes"); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      <Box color="#8f5a43" position={[0, 0.69, 0]} scale={[1.64, 0.035, 0.62]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[2, 1]} position={[0, 0.74, 0]} scale={[1.6, 0.08, 0.58]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.68, 0.36, -0.2]} scale={[0.08, 0.72, 0.08]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.68, 0.36, -0.2]} scale={[0.08, 0.72, 0.08]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.68, 0.36, 0.2]} scale={[0.08, 0.72, 0.08]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.68, 0.36, 0.2]} scale={[0.08, 0.72, 0.08]} />

      <group ref={deskBookRef} position={[0, 0.8, 0.04]}>
        <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0, 0, 0]} scale={[0.66, 0.035, 0.42]} />
        <group ref={deskLeftPageRef} position={[-0.18, 0.035, -0.01]} rotation={[0, 0, 0.08]}>
          <Box color={colors.bookPage} position={[0, 0, 0]} scale={[0.28, 0.02, 0.36]} />
        </group>
        <group ref={deskRightPageRef} position={[0.18, 0.035, -0.01]} rotation={[0, 0, -0.08]}>
          <Box color={colors.bookPage} position={[0, 0, 0]} scale={[0.28, 0.02, 0.36]} />
        </group>
        <PopObjectText
          text="工作笔记"
          position={[0, 0.078, 0.045]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.52, 0.52, 1]}
          color="#5b2f2b"
          fontSize={84}
        />
      </group>

      <Box color={colors.blanket} position={[0.5, 0.82, -0.08]} scale={[0.24, 0.035, 0.18]} />
      <group position={[0.62, 0.84, 0.16]}>
        <Cylinder color="#e8d5c0" position={[0, 0.005, 0]} args={[0.105, 0.105, 0.018, 18]} />
        <Cylinder color="#fff8ed" position={[0, 0.09, 0]} args={[0.074, 0.06, 0.16, 18]} />
        <Cylinder color="#6b3a2a" position={[0, 0.176, 0]} args={[0.052, 0.052, 0.012, 18]} />
        <mesh position={[0, 0.183, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.062, 0.006, 8, 24]} />
          {paperMat("#8c5a45")}
        </mesh>
        <Box color="#fff8ed" position={[0.088, 0.105, 0]} rotation={[0, 0, -0.34]} scale={[0.028, 0.085, 0.024]} />
        <Box color="#fff8ed" position={[0.104, 0.065, 0]} rotation={[0, 0, 0.34]} scale={[0.028, 0.075, 0.024]} />
      </group>

      <PaperBox textureUrl={PAPER_TEXTURES.pink} position={[0, 0.42, 0.68]} scale={[0.56, 0.12, 0.46]} />
      <PaperBox textureUrl={PAPER_TEXTURES.pink} position={[0, 0.82, 0.9]} scale={[0.58, 0.78, 0.09]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.21, 0.19, 0.56]} scale={[0.06, 0.38, 0.06]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.21, 0.19, 0.56]} scale={[0.06, 0.38, 0.06]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.21, 0.19, 0.8]} scale={[0.06, 0.38, 0.06]} />
      <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.21, 0.19, 0.8]} scale={[0.06, 0.38, 0.06]} />

      {/* 纸艺木凳 */}
      <group position={[0, 0, 0.58]}>
        <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.42, 0]} scale={[0.26, 0.04, 0.26]} />
        <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.10, 0.21, -0.10]} scale={[0.035, 0.42, 0.035]} />
        <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.10, 0.21, -0.10]} scale={[0.035, 0.42, 0.035]} />
        <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.10, 0.21, 0.10]} scale={[0.035, 0.42, 0.035]} />
        <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0.10, 0.21, 0.10]} scale={[0.035, 0.42, 0.035]} />
      </group>

    </group>
  );
};

export default DeskArea;
