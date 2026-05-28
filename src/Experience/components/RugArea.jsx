import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useInteractionStore } from "../../store/useInteractionStore";
import {
  PAPER_TEXTURES,
  PaperBox,
} from "./BedroomPrimitives";

const RugArea = () => {
  const isHomeOpen = useInteractionStore((state) => state.activeArea === "home");
  const toggleArea = useInteractionStore((state) => state.toggleArea);
  const rugRef = useRef(null);

  useEffect(() => {
    if (!rugRef.current) return;

    gsap.to(rugRef.current.scale, {
      x: isHomeOpen ? 1.04 : 1,
      y: 1,
      z: isHomeOpen ? 1.04 : 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  }, [isHomeOpen]);

  return (
    <group
      ref={rugRef}
      position={[0.5, 0.02, 0.88]}
      onClick={(e) => { e.stopPropagation(); toggleArea("home"); }}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}
    >
      <PaperBox textureUrl={PAPER_TEXTURES.rugFabric} uvRepeat={[2, 1]} position={[0, -0.018, 0]} scale={[2.39, 0.028, 1.32]} />
      <PaperBox textureUrl={PAPER_TEXTURES.pink} uvRepeat={[2, 1]} position={[0, 0, 0]} scale={[2.35, 0.035, 1.28]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} uvRepeat={[2, 1]} position={[0, 0.025, 0]} scale={[1.85, 0.025, 0.92]} />
    </group>
  );
};

export default RugArea;
