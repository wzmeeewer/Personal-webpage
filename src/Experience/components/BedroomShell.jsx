import BedArea from "./BedArea";
import BookshelfArea from "./BookshelfArea";
import { PixelArtFrame, WindowPlant } from "./DecorativeObjects";
import DeskArea from "./DeskArea";
import DoorArea from "./DoorArea";
import FrontWallDecor from "./FrontWallDecor";
import MethodCards from "./MethodCards";
import RugArea from "./RugArea";
import WardrobeArea from "./WardrobeArea";
import { Box, Cylinder, PAPER_TEXTURES, PaperBox, PopObjectText, Sphere, colors, paperMat } from "./BedroomPrimitives";
import { useInteractionStore } from "../../store/useInteractionStore";

const ProjectShelfSign = () => (
  <group position={[0.08, 2.58, -2.34]} rotation={[0, 0, -0.01]}>
    <Box color="#9b6550" position={[0.04, -0.03, -0.035]} scale={[1.48, 0.46, 0.045]} />
    <PaperBox
      textureUrl={PAPER_TEXTURES.cream}
      tintColor="#fff8ea"
      position={[0, 0, 0]}
      scale={[1.44, 0.44, 0.055]}
    />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.23, 0.018]} scale={[1.52, 0.045, 0.07]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, -0.23, 0.018]} scale={[1.52, 0.045, 0.07]} />
    <Box color="#f2b6c5" position={[-0.55, 0.215, 0.05]} rotation={[0, 0, 0.08]} scale={[0.3, 0.045, 0.03]} />
    <Box color="#f8d79b" position={[0.55, 0.215, 0.05]} rotation={[0, 0, -0.08]} scale={[0.3, 0.045, 0.03]} />
    <PopObjectText
      text="项目经历"
      position={[0, -0.005, 0.07]}
      scale={[1.12, 1, 1]}
      color="#5b2f2b"
      fontSize={98}
    />
  </group>
);

const BedroomShell = () => {
  const setActiveArea = useInteractionStore((state) => state.setActiveArea);

  return (
  <group position={[0, 0, 0]} onClick={() => setActiveArea(null)}>
    <group scale={[1.4, 1.3, 1.3]}>
    <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[7, 5]} position={[0, -0.04, 0]} scale={[8.6, 0.08, 6.2]} />
    <PaperBox textureUrl={PAPER_TEXTURES.decorativeBack} uvRepeat={[7, 4]} position={[0, 2.15, -3.08]} scale={[8.6, 4.3, 0.12]} />
    <PaperBox textureUrl={PAPER_TEXTURES.pink} uvRepeat={[5, 4]} position={[-4.28, 2.15, 0]} scale={[0.12, 4.3, 6.2]} />
    <PaperBox textureUrl={PAPER_TEXTURES.yellow} uvRepeat={[5, 4]} position={[4.28, 2.15, 0]} scale={[0.12, 4.3, 6.2]} />
    <PaperBox textureUrl={PAPER_TEXTURES.warmOrange} uvRepeat={[7, 4]} position={[0, 2.15, 3.08]} scale={[8.6, 4.3, 0.12]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} uvRepeat={[7, 5]} position={[0, 4.28, 0]} scale={[8.6, 0.12, 6.2]} />

    <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[7, 1]} position={[0, 0.16, -3]} scale={[8.2, 0.12, 0.08]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[5, 1]} position={[-4.17, 0.16, 0]} scale={[0.08, 0.12, 5.8]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[5, 1]} position={[4.17, 0.16, 0]} scale={[0.08, 0.12, 5.8]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-3.55, 0.16, 3]} scale={[1.3, 0.12, 0.08]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} uvRepeat={[5, 1]} position={[0, 0.16, 3]} scale={[5.6, 0.12, 0.08]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[3.55, 0.16, 3]} scale={[1.3, 0.12, 0.08]} />

    <Box color={colors.floorLine} position={[0, 0.01, -0.95]} scale={[8.1, 0.012, 0.035]} />
    <Box color={colors.floorLine} position={[0, 0.012, 1.1]} scale={[8.1, 0.012, 0.035]} />
    <Box color={colors.floorLine} position={[-1.35, 0.014, 0]} rotation={[0, 0.02, 0]} scale={[0.035, 0.012, 5.8]} />
    <Box color={colors.floorLine} position={[1.45, 0.014, 0]} rotation={[0, -0.02, 0]} scale={[0.035, 0.012, 5.8]} />

    <group position={[-2.35, 2.55, -3]}>
      <PaperBox textureUrl={PAPER_TEXTURES.whiteWood} position={[0, 0, 0.03]} scale={[1.52, 1.18, 0.08]} />
      <Box color={colors.windowGlass} position={[0, 0, 0.08]} scale={[1.28, 0.92, 0.05]} />
      <PaperBox textureUrl={PAPER_TEXTURES.whiteWood} position={[0, 0, 0.13]} scale={[0.07, 1.05, 0.08]} />
      <PaperBox textureUrl={PAPER_TEXTURES.whiteWood} position={[0, 0, 0.13]} scale={[1.4, 0.07, 0.08]} />
    </group>

    <group position={[0, 3.65, -0.15]}>
      <Cylinder color={colors.deskDark} position={[0, 0.3, 0]} args={[0.025, 0.025, 0.64, 10]} />
      <mesh position={[0, -0.07, 0]}>
        <coneGeometry args={[0.46, 0.36, 18, 1, true]} />
        {paperMat(colors.lamp)}
      </mesh>
      <Sphere color={colors.lampWarm} position={[0, -0.22, 0]} scale={[0.18, 0.18, 0.18]} />
    </group>

    <DeskArea />
    <DoorArea />
    <BedArea />
    <RugArea />
    <WardrobeArea />
    <BookshelfArea />
    <ProjectShelfSign />
    <MethodCards />
    <WindowPlant />
    <PixelArtFrame />
    <FrontWallDecor />
    </group>
  </group>
  );
};

export default BedroomShell;
