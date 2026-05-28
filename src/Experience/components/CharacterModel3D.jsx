import { Suspense } from "react";
import usePaperModel from "../utils/PaperModel";
import { PAPER_TEXTURES } from "./BedroomPrimitives";

const BASE = import.meta.env.BASE_URL;

function CharacterModel3DContent(props) {
  const scene = usePaperModel(`${BASE}models/character.glb`, PAPER_TEXTURES.cream);
  return <primitive object={scene} {...props} />;
}

export default function CharacterModel3D(props) {
  return (
    <Suspense fallback={null}>
      <CharacterModel3DContent {...props} />
    </Suspense>
  );
}
