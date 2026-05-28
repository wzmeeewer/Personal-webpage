import { Suspense } from "react";
import usePaperModel from "../utils/PaperModel";
import { PAPER_TEXTURES } from "./BedroomPrimitives";

const BASE = import.meta.env.BASE_URL;

function CatModel3DContent(props) {
  const scene = usePaperModel(`${BASE}models/cat.glb`, PAPER_TEXTURES.cream);
  return <primitive object={scene} {...props} />;
}

export default function CatModel3D(props) {
  return (
    <Suspense fallback={null}>
      <CatModel3DContent {...props} />
    </Suspense>
  );
}
