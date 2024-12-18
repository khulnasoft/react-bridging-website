import { reactBridging } from "@react-bridging/dev/vite";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  ssr: {
    noExternal: ["@docsearch/react"],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [splitVendorChunkPlugin(), reactBridging(), tsconfigPaths()],
});
