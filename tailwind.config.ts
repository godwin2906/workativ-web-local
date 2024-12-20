import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      textColor: {
        brand: {
          primary: "#000000",
          secondary: "#21243D",
          text_blue: "#1C5CFF",
          text_gray: "#A49D9D",
          text_lightGray: "#666",

          text_white: "#FFF",
        },
      },
      backgroundColor: {
        brand: {
          primary: "#E3FC87",
          secondary: "#EDF1F9",
          card: "#F4F3F3",
          bg_white: "#FFFFFF",
          bg_blue: "#1C5CFF",
        },
      },
      borderColor: {
        brand: {
          primary: "#1C5CFF",
          secondary: "#F4F3F3",
          card: "#F4F3F3",
          border_blue: "#1C5CFF",
          border_black: "#000000",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
