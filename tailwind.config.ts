import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const toSingleLine = (string: string) => string.replaceAll("\n", " ").replace(/\s+/g, " ").trim()

const apply = (classes: TemplateStringsArray) => ({
  [`@apply ${toSingleLine(classes[0]!)}`]: {},
})

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,css}"],
  theme: {
    extend: {
      animation: {
        "popover-content-fade-in": "popover-content-fade-in 200ms ease-in",
        "popover-content-fade-out": "popover-content-fade-out 200ms ease-in",
        "dialog-content-fade-in": "dialog-content-fade-in 500ms ease-in-out",
        "dialog-content-fade-out": "dialog-content-fade-out 500ms ease-in-out",
        "dialog-backdrop-fade-in": "dialog-backdrop-fade-in 500ms ease-in-out",
        "dialog-backdrop-fade-out": "dialog-backdrop-fade-out 500ms ease-in-out",
        "bounce-slight": "bounce-slight 2s ease-in-out infinite",
        "bounce-medium": "bounce-medium 2s ease-in-out infinite",
        "bounce-rotate-slight": "bounce-rotate-slight 2s ease-in-out infinite",
      },
      keyframes: {
        "popover-content-fade-in": {
          from: { opacity: "0", transform: "translateY(4px) scale(0.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "popover-content-fade-out": {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(4px) scale(0.98)" },
        },
        "dialog-content-fade-in": {
          from: { opacity: "0", transform: "translateY(-40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dialog-content-fade-out": {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-40px)" },
        },
        "dialog-backdrop-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "dialog-backdrop-fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "bounce-slight": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "none" },
        },
        "bounce-medium": {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "none" },
        },
        "bounce-rotate-slight": {
          "0%, 100%": { transform: "translateY(-2%) rotate(2deg)" },
          "50%": { transform: "translateY(2%) rotate(-2deg)" },
        },
      },
      boxShadow: {
        "solid-base": "0 2px rgba(0, 0, 0, 0.8)",
        "solid-lg": "0 4px rgba(0, 0, 0, 0.8)",
      },
      fontFamily: {
        hand: ["Virgil", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        // Absolute positioning
        ".absolute-center": apply`absolute transform top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`,
        ".absolute-center-x": apply`absolute transform left-[50%] -translate-x-1/2`,
        ".absolute-center-y": apply`absolute transform top-[50%] -translate-y-1/2`,
        // Fixed positioning
        ".fixed-center": apply`fixed transform top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2`,
        ".fixed-center-x": apply`fixed transform left-[50%] -translate-x-1/2`,
        ".fixed-center-y": apply`fixed transform top-[50%] -translate-y-1/2`,
        // Hide scrollbars
        ".no-scrollbars": {}, // See src/app/main.css
        // Style underlines
        ".styled-marks": {
          "mark,strong": apply`inline-block px-1 rounded-md`,
        },
      })
    }),
  ],
} satisfies Config
