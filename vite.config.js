import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const formatSize = (bytes) => `${(bytes / 1024).toFixed(2)} kB`;

const compressionReport = () => ({
  name: "portfolio-compression-report",
  apply: "build",
  closeBundle() {
    const assetsDir = join(process.cwd(), "dist", "assets");

    try {
      const files = readdirSync(assetsDir)
        .map((name) => join(assetsDir, name))
        .filter((file) => statSync(file).isFile())
        .filter((file) => /\.(js|css)$/.test(file));

      files.forEach((file) => {
        const source = readFileSync(file);
        const relativeName = file.replace(`${process.cwd()}\\dist\\`, "").replaceAll("\\", "/");
        console.info(
          `[compression] ${relativeName} gzip ${formatSize(gzipSync(source).length)} / brotli ${formatSize(
            brotliCompressSync(source).length,
          )}`,
        );
      });
    } catch (error) {
      console.warn("[compression] 压缩体积统计失败。", error);
    }
  },
});

// https://vite.dev/config/
export default defineConfig({
  base: "/Personal-webpage/",
  plugins: [react(), compressionReport()],
  build: {
    chunkSizeWarningLimit: 1800,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three";
          }

          if (id.includes("node_modules/@react-three")) {
            return "react-three";
          }

          if (id.includes("node_modules/gsap")) {
            return "animation";
          }

          return undefined;
        },
      },
    },
  },
});
