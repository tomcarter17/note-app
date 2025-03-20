import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import oxlint from "vite-plugin-oxlint";

export default defineConfig({
  plugins: [oxlint(), react(), tsconfigPaths()],
});
