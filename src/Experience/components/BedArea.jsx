import { Box, PAPER_TEXTURES, PaperBox, colors } from "./BedroomPrimitives";

const PaperCat = () => {
  const furTexture = PAPER_TEXTURES.cream;
  const furColor = "#f4a460";
  const shadowFur = "#e89a56";

  return (
  <group position={[0.38, 0.94, 0.35]} rotation={[0, -0.24, 0]}>
    <PaperBox textureUrl={furTexture} tintColor={furColor} position={[0, 0, 0]} scale={[0.34, 0.16, 0.24]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[-0.03, 0.055, 0.126]} scale={[0.18, 0.075, 0.026]} />
    <PaperBox textureUrl={furTexture} tintColor={furColor} position={[-0.23, 0.09, 0]} rotation={[0, 0, -0.05]} scale={[0.22, 0.2, 0.2]} />
    <PaperBox textureUrl={furTexture} tintColor={shadowFur} position={[-0.18, 0.055, 0.045]} rotation={[0.04, 0.05, 0.04]} scale={[0.2, 0.18, 0.22]} />
    <PaperBox textureUrl={furTexture} tintColor={furColor} position={[0.22, 0.03, 0.02]} rotation={[0, 0, 0.08]} scale={[0.15, 0.11, 0.14]} />

    <PaperBox textureUrl={furTexture} tintColor={furColor} position={[-0.31, 0.22, -0.07]} rotation={[0, 0, 0.72]} scale={[0.075, 0.115, 0.04]} />
    <PaperBox textureUrl={furTexture} tintColor={furColor} position={[-0.31, 0.22, 0.07]} rotation={[0, 0, -0.72]} scale={[0.075, 0.115, 0.04]} />
    <Box color="#f2a7bb" position={[-0.315, 0.2, -0.073]} rotation={[0, 0, 0.64]} scale={[0.035, 0.055, 0.018]} />
    <Box color="#f2a7bb" position={[-0.315, 0.2, 0.073]} rotation={[0, 0, -0.64]} scale={[0.035, 0.055, 0.018]} />

    <PaperBox textureUrl={furTexture} tintColor={shadowFur} position={[0.32, 0.06, 0.04]} rotation={[0.28, 0.3, -0.48]} scale={[0.05, 0.18, 0.045]} />
    <PaperBox textureUrl={furTexture} tintColor={furColor} position={[0.39, 0.13, 0.08]} rotation={[0.34, 0.18, -0.74]} scale={[0.045, 0.17, 0.04]} />
    <PaperBox textureUrl={furTexture} tintColor={furColor} position={[0.43, 0.2, 0.11]} rotation={[0.42, 0.08, -0.98]} scale={[0.04, 0.14, 0.036]} />

    <Box color="#fff8ed" position={[-0.342, 0.115, -0.055]} scale={[0.02, 0.027, 0.027]} />
    <Box color="#fff8ed" position={[-0.342, 0.115, 0.055]} scale={[0.02, 0.027, 0.027]} />
    <Box color="#2f241f" position={[-0.354, 0.115, -0.055]} scale={[0.012, 0.012, 0.012]} />
    <Box color="#2f241f" position={[-0.354, 0.115, 0.055]} scale={[0.012, 0.012, 0.012]} />
    <Box color="#f2a7bb" position={[-0.34, 0.064, 0]} scale={[0.025, 0.019, 0.019]} />

    <Box color="#fff5e6" position={[-0.365, 0.075, -0.095]} rotation={[0, 0, 0.2]} scale={[0.005, 0.005, 0.17]} />
    <Box color="#fff5e6" position={[-0.365, 0.075, 0.095]} rotation={[0, 0, -0.2]} scale={[0.005, 0.005, 0.17]} />
  </group>
  );
};

const BedArea = () => (
  <group position={[2.25, 0.12, -1.78]} rotation={[0, -0.04, 0]}>
    <PaperBox textureUrl={PAPER_TEXTURES.wood} tintColor="#e7b087" uvRepeat={[2, 1]} position={[0, 0.72, -1.04]} scale={[1.46, 1.05, 0.12]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} tintColor="#e7b087" uvRepeat={[2, 2]} position={[0, 0.28, 0]} scale={[1.35, 0.38, 2.25]} />
    <Box color={colors.shadow} position={[0, 0.15, 0.05]} scale={[1.1, 0.18, 2.05]} />
    <Box color="#e8d8c5" position={[0, 0.415, 0]} scale={[1.24, 0.035, 2.12]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#fff7ec" uvRepeat={[2, 2]} position={[0, 0.57, 0]} scale={[1.22, 0.28, 2.1]} />
    <Box color="#d99cab" position={[0.12, 0.645, 0.28]} scale={[0.8, 0.035, 1.38]} />
    <PaperBox textureUrl={PAPER_TEXTURES.quiltFabric} uvRepeat={[1, 2]} position={[0.12, 0.75, 0.28]} scale={[0.78, 0.18, 1.36]} />
    <Box color="#ed8fa8" position={[-0.28, 0.855, 0.28]} scale={[0.035, 0.028, 1.24]} />
    <Box color="#ffd6dc" position={[0.14, 0.852, 0.9]} scale={[0.68, 0.02, 0.035]} />
    <PaperBox textureUrl={PAPER_TEXTURES.quiltFabric} uvRepeat={[1, 1]} position={[0.12, 0.86, -0.4]} scale={[0.8, 0.07, 0.08]} />
    <PaperBox textureUrl={PAPER_TEXTURES.quiltFabric} uvRepeat={[1, 2]} position={[0.52, 0.86, 0.28]} scale={[0.08, 0.07, 1.36]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#fffdf7" position={[-0.32, 0.79, -0.72]} scale={[0.42, 0.16, 0.34]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#fffdf7" position={[0.28, 0.79, -0.72]} scale={[0.42, 0.16, 0.34]} />
    <PaperCat />
    <Box color={colors.shadow} position={[-0.5, 0.08, -0.88]} scale={[0.12, 0.22, 0.12]} />
    <Box color={colors.shadow} position={[0.5, 0.08, -0.88]} scale={[0.12, 0.22, 0.12]} />
    <Box color={colors.shadow} position={[-0.5, 0.08, 0.88]} scale={[0.12, 0.22, 0.12]} />
    <Box color={colors.shadow} position={[0.5, 0.08, 0.88]} scale={[0.12, 0.22, 0.12]} />
  </group>
);

export default BedArea;
