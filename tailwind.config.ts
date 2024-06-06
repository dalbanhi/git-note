import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "custom-checkbox": {
          DEFAULT: "#f00",
          checked: "#0f0",
        },
        primary: {
          gradientStart: "#43b7fe",
          gradientEnd: "#4f48e6",
          500: "rgb(var(--primary))",
          800: "rgb(var(--primary-800)",
          900: "rgb(var(--primary) / 0.1)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warning: {
          500: "rgb(var(--warning-500))",
          900: "rgb(var(--warning-500) / 0.15)",
        },
        myBlack: {
          600: "rgb(var(--my-black-600))",
          700: "rgb(var(--my-black-700))",
          800: "rgb(var(--my-black-800))",
          900: "rgb(var(--my-black-900))",
        },
        myWhite: {
          100: "rgb(var(--my-white-100))",
          300: "rgb(var(--my-white-300))",
          500: "rgb(var(--my-white-500))",
        },
        myPurple: {
          500: "rgb(var(--my-purple))",
          900: "rgb(var(--my-purple) / 0.1)", //do 10%
        },
        myGreen: {
          400: "rgb(var(--my-green-400))",
          500: "rgb(var(--my-green-500))",
          900: "rgb(var(--my-green-500) / 0.1)", //do 10%
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
} satisfies Config;

export default config;
