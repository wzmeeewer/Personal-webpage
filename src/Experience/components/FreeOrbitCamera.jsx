import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useCameraStore } from "../../store/useCameraStore";
import { useResponsiveStore } from "../../store/useResponsiveStore";
import gsap from "gsap";

const CAMERA_VIEWS = {
  home: {
    position: [0, 3.8, 3.2],
    target: [0, 2.8, 0],
  },
  about: {
    position: [-2.0, 3.2, 1.8],
    target: [-5.63, 1.9, 1.46],
  },
  projects: {
    position: [0, 3.45, -0.75],
    target: [0.07, 2.25, -3.0],
  },
  methods: {
    position: [2.2, 3.2, -1.6],
    target: [5.71, 2.73, -1.43],
  },
  notes: {
    position: [-1.8, 2.6, -1.0],
    target: [-3.29, 1.17, -2.70],
  },
  contact: {
    position: [2.5, 3.0, 2.0],
    target: [5.85, 1.63, 1.89],
  },
};

const FreeOrbitCamera = () => {
  const cameraRef = useRef();
  const controlsRef = useRef();
  const zoom = useCameraStore((state) => state.zoom);
  const activeView = useCameraStore((state) => state.activeView);
  const isMobile = useResponsiveStore((state) => state.isMobile);

  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.zoom = zoom;
    cameraRef.current.updateProjectionMatrix();
  }, [zoom]);

  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const view = CAMERA_VIEWS[activeView];
    if (!camera || !controls || !view) return;
    const distanceMultiplier = isMobile ? 1.22 : 1;
    const position = view.position.map((value) => value * distanceMultiplier);

    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    gsap.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1.15,
      ease: "power2.inOut",
    });

    gsap.to(controls.target, {
      x: view.target[0],
      y: view.target[1],
      z: view.target[2],
      duration: 1.15,
      ease: "power2.inOut",
    });
  }, [activeView, isMobile]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        fov={isMobile ? 58 : 50}
        position={isMobile ? [0, 5.0, 4.2] : [0, 3.8, 3.2]}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, 2.8, 0]}
        enableDamping
        dampingFactor={0.06}
        enablePan={false}
        rotateSpeed={isMobile ? 0.35 : 0.45}
        zoomSpeed={0.7}
        minDistance={isMobile ? 1.5 : 1.5}
        maxDistance={isMobile ? 2.8 : 2.5}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.55}
      />
    </>
  );
};

export default FreeOrbitCamera;
