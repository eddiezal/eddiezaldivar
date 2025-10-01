import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}","./app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0F172A", // Midnight Navy
        taupe:    "#8B7570", // Taupe Clay
        warm:     "#F7F5F4", // Warm White
        skysoft:  "#B8CDD9", // Soft Sky
        mist:     "#E5E7EB", // Mist Gray
      },
      borderRadius: { "2xl": "1rem" },
      boxShadow: { soft: "0 6px 20px -6px rgba(16,185,129,0.30)" }
    }
  },
  plugins: []
} satisfies Config;
