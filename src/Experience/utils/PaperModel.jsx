import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { PAPER_TEXTURES } from "../components/BedroomPrimitives";

/**
 * usePaperModel — loads a GLB and replaces every mesh material with a
 * flat MeshBasicMaterial that uses a paper texture, tinted by the
 * mesh's original diffuse colour so that body-part variation is kept.
 *
 * @param {string} glbPath         Path to the GLB file (relative to /public).
 * @param {string} paperTextureUrl One of the PAPER_TEXTURES values.
 * @param {string} tintColor       Optional hex multiplier (default white = no global tint).
 */
function usePaperModel(glbPath, paperTextureUrl = PAPER_TEXTURES.cream, tintColor = "#ffffff") {
  const { scene } = useGLTF(glbPath);
  const paperTex = useTexture(paperTextureUrl);

  const paperScene = useMemo(() => {
    const cloned = scene.clone(true);

    cloned.traverse((child) => {
      if (!child.isMesh || !child.material) return;

      const originalMat = Array.isArray(child.material)
        ? child.material[0]
        : child.material;

      // Blend original colour with the global tint so parts stay distinct
      const origColor = originalMat.color
        ? new THREE.Color().copy(originalMat.color)
        : new THREE.Color(1, 1, 1);
      const globalTint = new THREE.Color(tintColor);
      const blended = origColor.multiply(globalTint);

      const tex = paperTex.clone();
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;

      child.material = new THREE.MeshBasicMaterial({
        map: tex,
        color: blended,
        side: THREE.DoubleSide,
        toneMapped: false,
      });

      child.castShadow = false;
      child.receiveShadow = false;
    });

    return cloned;
  }, [scene, paperTex, tintColor]);

  return paperScene;
}

export default usePaperModel;
