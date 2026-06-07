import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        civic: {
          ink: "#17212b",
          muted: "#5c6b73",
          line: "#d7dee3",
          panel: "#f6f8fa",
          blue: "#235b8c",
          teal: "#157a6e",
          amber: "#936b13",
          red: "#9a3412"
        }
      }
    }
  }
};

export default config;
