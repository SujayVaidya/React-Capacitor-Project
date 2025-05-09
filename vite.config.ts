import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // 🔥 Capacitor looks for this folder
  },
  server: {
    host: true, // 🔥 Allow access from Android emulator/device
  },
  base: "./", // only if you're facing missing asset issues on APK
});
