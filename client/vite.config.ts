import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = loadEnv(mode, process.cwd(), "");

  console.log("process.env", process.env)

  return {
    server: {
      proxy: {
        "/api/": {
          target: process.env.DEV
            ? "http://localhost:8000"
            : "https://gestureconnect-aqiz.onrender.com",
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };
});
