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
          primary: '#21243D',
          secondary:'#1C5CFF'
        }
      },
      backgroundColor:{
        brand:{
          primary:"#E3FC87",
          secondary:"#EDF1F9"
        }
      },
      borderColor: {
        brand: {
          primary: '#1C5CFF'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
