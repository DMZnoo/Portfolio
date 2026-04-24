import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "#e1f7fd",
        "primary-100": "#b4ebfa",
        "primary-200": "#82dff6",
        "primary-300": "#4fd2f0",
        "primary-400": "#26c8eb",
        "primary-500": "#09bee5",
        "primary-600": "#01B0D1",
        "primary-700": "#009ab6",
        "primary-800": "#00869d",
        "primary-900": "#006370",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
