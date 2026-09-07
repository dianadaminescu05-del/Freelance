import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this project from /Freelance/, not the domain root.
//
// Keyed on `mode`, not `command`: `command` is 'serve' for BOTH `vite dev`
// and `vite preview`, so keying on it leaves preview serving at '/' while
// the build emits '/Freelance/' paths — preview 404s every asset and silently
// falls back to index.html. `mode` is 'production' for build and preview
// alike, so preview exercises the same paths Pages will.
//
// Both the router basename and the public asset URLs read this back via
// import.meta.env.BASE_URL, so a rename or a custom domain is a one-line change.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/Freelance/' : '/',
}));
