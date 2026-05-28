import { Box, Cylinder, PAPER_TEXTURES, PaperBox, Sphere, colors, paperMat } from "./BedroomPrimitives";

// ── 高脚落地盆栽 ──────────────────────────────────────────────────
const TallPlant = () => (
  <group position={[-3.2, 0, 2.92]}>
    {/* 花架：4 条细腿 */}
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.1, 0.22, -0.1]} scale={[0.035, 0.44, 0.035]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[ 0.1, 0.22, -0.1]} scale={[0.035, 0.44, 0.035]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.1, 0.22,  0.1]} scale={[0.035, 0.44, 0.035]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[ 0.1, 0.22,  0.1]} scale={[0.035, 0.44, 0.035]} />
    {/* 花架：横梁加固 */}
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.28, -0.1]} scale={[0.22, 0.022, 0.022]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.28,  0.1]} scale={[0.22, 0.022, 0.022]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[-0.1, 0.28, 0]} scale={[0.022, 0.022, 0.22]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[ 0.1, 0.28, 0]} scale={[0.022, 0.022, 0.22]} />
    {/* 花架：托盘 */}
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.458, 0]} scale={[0.32, 0.028, 0.32]} />
    {/* 花盆（下宽上窄锥形） */}
    <Cylinder color="#c8956e" position={[0, 0.61, 0]}  args={[0.1, 0.13, 0.3,  12]} />
    {/* 盆沿 */}
    <Cylinder color="#a07050" position={[0, 0.762, 0]} args={[0.108, 0.108, 0.02, 12]} />
    {/* 土 */}
    <Cylinder color="#5a3820" position={[0, 0.774, 0]} args={[0.094, 0.094, 0.016, 12]} />
    {/* 主茎 */}
    <Cylinder color="#4a7a3a" position={[0, 1.07, 0]} args={[0.021, 0.017, 0.59, 8]} />
    {/* 侧枝 */}
    <Cylinder color="#4a7a3a" position={[-0.1,  1.15,  0.01]} rotation={[0, 0,  0.72]} args={[0.014, 0.011, 0.28, 6]} />
    <Cylinder color="#5a8a4a" position={[ 0.12, 1.2,  -0.01]} rotation={[0, 0, -0.68]} args={[0.014, 0.011, 0.25, 6]} />
    <Cylinder color="#4a7a3a" position={[ 0.02, 1.31,  0.05]} rotation={[0.25, 0, 0.2]}  args={[0.012, 0.009, 0.2,  6]} />
    <Cylinder color="#5a8a4a" position={[-0.04, 1.39, -0.04]} rotation={[0.2,  0,-0.15]} args={[0.011, 0.008, 0.18, 6]} />
    {/* 叶片 */}
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#72b055" position={[-0.2,  1.18,  0]}    rotation={[0.1,  0.2, -0.68]} scale={[0.2,  0.026, 0.072]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#8aca68" position={[ 0.22, 1.23,  0]}    rotation={[0.1, -0.2,  0.65]} scale={[0.19, 0.026, 0.07]}  />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#92bf75" position={[-0.07, 1.36, -0.06]} rotation={[0.25, 0.3, -0.24]} scale={[0.17, 0.024, 0.065]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#7ab560" position={[ 0.08, 1.38,  0.07]} rotation={[0.22,-0.3,  0.28]} scale={[0.16, 0.024, 0.062]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#a0cc80" position={[ 0,    1.47,  0]}    rotation={[0.08, 0,    0.06]} scale={[0.15, 0.023, 0.06]}  />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#82b86c" position={[-0.12, 1.43,  0.04]} rotation={[0.18, 0.2, -0.42]} scale={[0.14, 0.022, 0.057]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#6aaa50" position={[ 0.06, 1.5,  -0.03]} rotation={[0.15,-0.18, 0.32]} scale={[0.13, 0.022, 0.055]} />
  </group>
);

// ── 落地衣架 ─────────────────────────────────────────────────────
const CoatRack = () => (
  <group position={[-1.0, 0, 2.82]}>
    {/* 底座：十字撑脚 */}
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.026, 0]} scale={[0.54, 0.052, 0.058]} />
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.026, 0]} scale={[0.058, 0.052, 0.54]} />
    {/* 脚端小球 */}
    <Sphere color="#6b3a2a" position={[-0.26, 0.03, 0]}  scale={[0.032, 0.022, 0.045]} />
    <Sphere color="#6b3a2a" position={[ 0.26, 0.03, 0]}  scale={[0.032, 0.022, 0.045]} />
    <Sphere color="#6b3a2a" position={[0, 0.03, -0.26]}  scale={[0.045, 0.022, 0.032]} />
    <Sphere color="#6b3a2a" position={[0, 0.03,  0.26]}  scale={[0.045, 0.022, 0.032]} />
    {/* 主竖杆 */}
    <Cylinder color="#9b6045" position={[0, 0.88, 0]} args={[0.021, 0.021, 1.68, 10]} />
    {/* 顶部横杆 */}
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 1.73, 0]} scale={[0.62, 0.036, 0.036]} />
    {/* 挂钩（3 个，用小斜 Box 模拟弧形钩） */}
    <Box color="#9b6045" position={[-0.26, 1.77, 0.0]} rotation={[0.45, 0, 0]} scale={[0.022, 0.075, 0.022]} />
    <Box color="#9b6045" position={[   0,  1.77, 0.0]} rotation={[0.45, 0, 0]} scale={[0.022, 0.075, 0.022]} />
    <Box color="#9b6045" position={[ 0.26, 1.77, 0.0]} rotation={[0.45, 0, 0]} scale={[0.022, 0.075, 0.022]} />

    {/* ▸ 左钩：粉色挎包 */}
    <PaperBox textureUrl={PAPER_TEXTURES.pink} position={[-0.26, 1.54, 0.01]} scale={[0.16, 0.24, 0.07]} />
    {/* 包扣 */}
    <Box color="#d6a34e" position={[-0.26, 1.64, 0.046]} scale={[0.08, 0.022, 0.012]} />
    {/* 包带 */}
    <Box color="#e090a8" position={[-0.26, 1.67, 0.05]} scale={[0.007, 0.12, 0.005]} />

    {/* ▸ 中钩：帽子 */}
    <Cylinder color="#c87050" position={[0, 1.86, 0]} args={[0.088, 0.078, 0.065, 16]} />
    <Cylinder color="#c87050" position={[0, 1.826, 0]} args={[0.148, 0.148, 0.022, 16]} />
    <Box color="#8b4030" position={[0, 1.86, 0.095]} rotation={[0, 0, 0]} scale={[0.16, 0.009, 0.005]} />

    {/* ▸ 右钩：外套（主身 + 两袖） */}
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#b0c8e0" position={[0.26, 1.53, 0.01]} scale={[0.19, 0.3, 0.05]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#9ab8d0" position={[0.11, 1.49, 0.01]} rotation={[0, 0,  0.22]} scale={[0.07, 0.22, 0.04]} />
    <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#9ab8d0" position={[0.41, 1.49, 0.01]} rotation={[0, 0, -0.22]} scale={[0.07, 0.22, 0.04]} />
  </group>
);

// ── 饮水机（蓝白经典款） ─────────────────────────────────────────
const WaterCooler = () => (
  <group position={[0.8, 0, 2.92]}>
    {/* 底座 */}
    <Box color="#d0dce8" position={[0, 0.038, 0]} scale={[0.38, 0.076, 0.3]} />
    {/* 机身（奶白） */}
    <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0, 0.545, 0]} scale={[0.3, 0.94, 0.26]} />
    {/* 正面浅蓝面板 */}
    <Box color="#ddeef8" position={[0.155, 0.52, 0]} scale={[0.008, 0.78, 0.2]} />
    {/* 出水凹槽 */}
    <Box color="#c2d8e8" position={[0.155, 0.56, 0]} scale={[0.013, 0.2, 0.18]} />
    {/* 出水托盘 */}
    <Box color="#b0cad8" position={[0.162, 0.455, 0]} scale={[0.025, 0.022, 0.2]} />
    {/* 热水龙头（红） */}
    <Cylinder color="#e06060" position={[0.172, 0.58,  0.052]} rotation={[0, 0, Math.PI / 2]} args={[0.016, 0.016, 0.036, 8]} />
    {/* 冷水龙头（蓝） */}
    <Cylinder color="#4888d8" position={[0.172, 0.58, -0.052]} rotation={[0, 0, Math.PI / 2]} args={[0.016, 0.016, 0.036, 8]} />
    {/* 水桶（蓝色圆柱） */}
    <Cylinder color="#6ab8e8" position={[0, 1.1, 0]}   args={[0.098, 0.098, 0.4, 14]} />
    {/* 桶颈（机身接口） */}
    <Cylinder color="#4a96c8" position={[0, 0.92, 0]}  args={[0.054, 0.054, 0.06, 10]} />
    {/* 桶盖 */}
    <Cylinder color="#3a7ab0" position={[0, 1.302, 0]} args={[0.07, 0.07, 0.022, 14]} />
    {/* 桶把手（装饰性半环） */}
    <mesh position={[0.108, 1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.038, 0.007, 6, 14, Math.PI]} />
      {paperMat("#3a7ab0")}
    </mesh>
    {/* 机身品牌条纹（装饰） */}
    <Box color="#b8d8ee" position={[0.156, 0.76, 0]} scale={[0.009, 0.028, 0.2]} />
    <Box color="#b8d8ee" position={[0.156, 0.36, 0]} scale={[0.009, 0.028, 0.2]} />
  </group>
);

// ── 低矮收纳柜 + 柜面装饰 ─────────────────────────────────────────
const StorageCabinet = () => (
  <group position={[3.0, 0, 2.86]}>
    {/* 柜体 */}
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.3, 0]} scale={[0.78, 0.58, 0.3]} />
    {/* 左柜门 */}
    <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[-0.18, 0.3, 0.154]} scale={[0.36, 0.5, 0.02]} />
    {/* 右柜门 */}
    <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[ 0.18, 0.3, 0.154]} scale={[0.36, 0.5, 0.02]} />
    {/* 柜门把手（黄铜） */}
    <Cylinder color={colors.brass} position={[-0.03, 0.3, 0.167]} rotation={[Math.PI / 2, 0, 0]} args={[0.01, 0.01, 0.022, 8]} />
    <Cylinder color={colors.brass} position={[ 0.37, 0.3, 0.167]} rotation={[Math.PI / 2, 0, 0]} args={[0.01, 0.01, 0.022, 8]} />
    {/* 柜顶面 */}
    <PaperBox textureUrl={PAPER_TEXTURES.wood} position={[0, 0.607, 0]} scale={[0.8, 0.036, 0.32]} />

    {/* ▸ 柜面物件 1：台灯 */}
    <group position={[-0.24, 0.625, 0.02]}>
      <Cylinder color={colors.deskDark} position={[0, 0.026, 0]} args={[0.04, 0.04, 0.022, 10]} />
      <Cylinder color={colors.deskDark} position={[0, 0.118, 0]} args={[0.009, 0.009, 0.16, 8]} />
      <mesh position={[0, 0.225, 0]}>
        <coneGeometry args={[0.1, 0.125, 16, 1, true]} />
        {paperMat(colors.lamp)}
      </mesh>
      <Sphere color={colors.lampWarm} position={[0, 0.19, 0]} scale={[0.038, 0.038, 0.038]} />
    </group>

    {/* ▸ 柜面物件 2：小相框（竖版） */}
    <group position={[0.08, 0.625, 0.055]}>
      <PaperBox textureUrl={PAPER_TEXTURES.wood}  position={[0.022, 0.135, 0]} scale={[0.04, 0.28, 0.21]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} position={[0.034, 0.135, 0]} scale={[0.018, 0.22, 0.16]} />
    </group>

    {/* ▸ 柜面物件 3：小多肉植物 */}
    <group position={[0.3, 0.625, -0.01]}>
      {/* 小花盆 */}
      <Cylinder color="#b8785a" position={[0, 0.072, 0]} args={[0.052, 0.065, 0.135, 10]} />
      <Cylinder color="#5a3820" position={[0, 0.145, 0]} args={[0.046, 0.046, 0.016, 10]} />
      {/* 多肉叶片（胖乎乎的小叶子） */}
      <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#88c060" position={[0,    0.19,  0]}    rotation={[0,    0,    0]}    scale={[0.06, 0.05, 0.06]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#70b050" position={[-0.05,0.18,  0.03]} rotation={[0.2, 0.1, -0.3]}  scale={[0.055,0.045,0.055]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#9ace72" position={[ 0.05,0.185,-0.03]} rotation={[0.2,-0.1,  0.3]}  scale={[0.055,0.045,0.055]} />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#70b050" position={[-0.04,0.2,  -0.04]} rotation={[0.3,-0.2, -0.25]} scale={[0.05, 0.04, 0.05]}  />
      <PaperBox textureUrl={PAPER_TEXTURES.cream} tintColor="#a8d880" position={[ 0.04,0.195, 0.04]} rotation={[0.3, 0.2,  0.25]} scale={[0.05, 0.04, 0.05]}  />
    </group>
  </group>
);

// ── 汇总组件 ──────────────────────────────────────────────────────
const FrontWallDecor = () => (
  <group>
    <TallPlant />
    <CoatRack />
    <WaterCooler />
    <StorageCabinet />
  </group>
);

export default FrontWallDecor;
