import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          accent: "var(--color-bg-accent)",
          surface: "var(--color-surface)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        border: "var(--color-border)",
        "accent-green": "var(--color-accent-green)",
        "accent-brown": "var(--color-accent-brown)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
      },
      fontSize: {
        h1: ["var(--text-h1)", { lineHeight: "var(--leading-h1)" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--leading-h2)" }],
        h3: ["var(--text-h3)", { lineHeight: "1.4" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        small: ["var(--text-small)", { lineHeight: "var(--leading-small)" }],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        hover: "var(--shadow-hover)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      spacing: {
        section: "var(--space-section)",
        card: "var(--space-card)",
      },
    },
  },
  plugins: [],
};

export default config;
