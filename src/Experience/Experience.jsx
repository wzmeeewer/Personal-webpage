import React from "react";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three";
import { WebGPURenderer } from "three/webgpu";

import Scene from "./Scene";

extend(THREE);

const messageStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 20,
  display: "grid",
  placeItems: "center",
  padding: "24px",
  background: "linear-gradient(135deg, #fff5ea, #ffd9cc 48%, #ffe39b)",
  color: "#7c3f3b",
  fontFamily: "'Microsoft YaHei UI', 'PingFang SC', sans-serif",
  textAlign: "center",
};

const cardStyle = {
  maxWidth: "440px",
  padding: "22px 24px",
  border: "1px solid rgba(124, 63, 59, 0.18)",
  borderRadius: "8px",
  background: "rgba(255, 248, 238, 0.9)",
  boxShadow: "0 16px 36px rgba(124, 63, 59, 0.16)",
};

const SceneErrorMessage = ({ title = "3D 场景加载失败" }) => (
  <div role="alert" style={messageStyle}>
    <div style={cardStyle}>
      <h1 style={{ margin: "0 0 10px", fontSize: "22px" }}>{title}</h1>
      <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.7 }}>
        请使用 Chrome/Edge 访问，或确认浏览器已开启 WebGPU/WebGL。
      </p>
    </div>
  </div>
);

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("3D scene failed to render:", error);
  }

  render() {
    if (this.state.hasError) {
      return <SceneErrorMessage />;
    }

    return this.props.children;
  }
}

const createRenderer = async (props) => {
  let webgpuRenderer = null;

  // Attempt 1: WebGPU
  try {
    if (!globalThis.navigator?.gpu) {
      throw new Error("WebGPU is not available in this browser.");
    }

    webgpuRenderer = new WebGPURenderer({
      ...props,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    await webgpuRenderer.init();
    console.info("使用 WebGPU 渲染");
    return webgpuRenderer;
  } catch (webgpuError) {
    webgpuRenderer?.dispose?.();
    console.warn("WebGPU 初始化失败，已尝试降级到 WebGL。", webgpuError);
  }

  // Attempt 2: WebGL (high-performance, with depth buffer)
  try {
    const canvas = props.canvas ?? document.createElement("canvas");
    const ctx =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
    if (!ctx) throw new Error("No WebGL context available");

    const webglRenderer = new THREE.WebGLRenderer({
      ...props,
      antialias: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true,
    });
    console.info("使用 WebGL 渲染，推荐用 Chrome 获得 WebGPU 体验");
    return webglRenderer;
  } catch (webglError) {
    console.warn("WebGL high-performance 初始化失败，尝试兼容模式。", webglError);
  }

  // Attempt 3: WebGL fallback (default power, no logarithmic depth)
  try {
    const webglRenderer = new THREE.WebGLRenderer({
      ...props,
      antialias: false,
      powerPreference: "default",
      logarithmicDepthBuffer: false,
      failIfMajorPerformanceCaveat: false,
    });
    console.info("使用 WebGL 渲染，推荐用 Chrome 获得 WebGPU 体验");
    return webglRenderer;
  } catch (webglFallbackError) {
    console.error("WebGL 兼容模式也失败了。", webglFallbackError);
    throw webglFallbackError;
  }
};

const Experience = () => {
  const [rendererFailed, setRendererFailed] = React.useState(false);
  const rendererFactory = React.useCallback(async (props) => {
    try {
      return await createRenderer(props);
    } catch (error) {
      setRendererFailed(true);
      throw error;
    }
  }, []);

  if (rendererFailed) {
    return <SceneErrorMessage title="当前浏览器无法启动 3D 场景" />;
  }

  return (
    <SceneErrorBoundary>
      <Canvas
        id="canvas-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          transformOrigin: "center center",
          touchAction: "none",
        }}
        flat
        dpr={[1, 1.5]}
        gl={rendererFactory}
      >
        <React.Suspense fallback={null}>
          <Scene />
        </React.Suspense>
        <color attach="background" args={["#2a2520"]} />
      </Canvas>
    </SceneErrorBoundary>
  );
};

export default Experience;
