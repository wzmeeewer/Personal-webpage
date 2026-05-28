import React, { useEffect } from "react";

import FreeOrbitCamera from "./components/FreeOrbitCamera";
import BedroomShell from "./components/BedroomShell";
import { useExperienceStore } from "../store/useExperienceStore";

const SceneReadySentinel = () => {
  const setIsSceneReady = useExperienceStore((state) => state.setIsSceneReady);
  useEffect(() => {
    setIsSceneReady(true);
  }, [setIsSceneReady]);
  return null;
};

const Scene = () => {
  return (
    <>
      <FreeOrbitCamera />
      <BedroomShell />
      <SceneReadySentinel />
    </>
  );
};

export default Scene;
