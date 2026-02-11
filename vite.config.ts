import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // No backend proxy - use Supabase directly. For chat: `netlify dev` runs the chat function.
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('dsaProblems500') || id.includes('dsaProblems') || id.includes('dsaTestCases')) {
            return 'dsa-data';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@radix-ui')) {
            return 'vendor-ui';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-animations';
          }
        },
      },
    },
    cssCodeSplit: true,
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
