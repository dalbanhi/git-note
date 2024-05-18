import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          gradientStart: "#43b7fe",
          gradientEnd: "#4f48e6",
          500: "rgb(var(--color-primary))",
          800: "#0C3247",
          900: "rgb(var(--color-primary) / 0.1)", //fix to make 10% light
        },
        myBlack: {
          600: "#2E3757",
          700: "#1D2032",
          800: "#131625",
          900: "#10121E",
        },
        myWhite: {
          100: "rgb(var(--color-white))",
          300: "#ADB3CC",
          500: "#55597D",
        },
        myPurple: {
          500: "rgb(var(--color-purple))",
          800: "rgb(var(--color-purple) / 0.1)", //do 10%
        },
        myGreen: {
          400: "#68D1BF",
          500: "rgb(var(--color-green))",
          900: "rgb(var(--color-green) / 0.1)", //do 10%
        },
      },
      fontSize: {
        display1: [
          "32px",
          { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: 700 },
        ],
        display2: [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: 700 },
        ],
        h1Md: ["20px", { lineHeight: "28px", fontWeight: 500 }],
        h2Md: ["16px", { lineHeight: "24px", fontWeight: 500 }],
        p1Bold: ["18px", { lineHeight: "28px", fontWeight: 700 }],
        p2Bold: ["16px", { lineHeight: "24px", fontWeight: 700 }],
        p3Bold: ["14px", { lineHeight: "20px", fontWeight: 700 }],
        p1Med: ["18px", { lineHeight: "28px", fontWeight: 500 }],
        p3Med: ["14px", { lineHeight: "20px", fontWeight: 500 }],
        p4Med: ["12px", { lineHeight: "16px", fontWeight: 500 }],
        p1Reg: ["18px", { lineHeight: "28px", fontWeight: 400 }],
        p2Reg: ["16px", { lineHeight: "24px", fontWeight: 400 }],
        p3Reg: ["14px", { lineHeight: "20px", fontWeight: 400 }],
        p4Reg: ["12px", { lineHeight: "16px", fontWeight: 400 }],
        subtitle: ["10px", { lineHeight: "12px", fontWeight: 400 }],
        caption: ["10px", { lineHeight: "12px", fontWeight: 500 }],
      },
    },
  },
  plugins: [],
};
export default config;
