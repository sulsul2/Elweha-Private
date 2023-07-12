/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { lato: ["Lato", "sans-serif", "system-ui"] },
      colors: {
        kOrange: {
          100: "#FFD7BC",
          200: "#F5BA93",
          300: "#FF9954",
          400: "#FD6701",
          500: "#C85100",
        },
        kGreen: "#00C653",
        kBlue: "#3D8DF5",
        kRed: "#EE0000",
        kText: "#424242",
        kGrey: { 100: "#B8B5B5", 200: "#A8A8A8", 300: "#6B6B6B" },
        background: "#FFFAF6",
        seccondaryWhite: "#F5F5F5",
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        36: "36px",
        40: "40px",
        44: "44px",
        48: "48px",
        52: "52px",
        56: "56px",
        60: "60px",
      },
      dropShadow: {
        button: "0px 4px 4px rgba(50, 50, 71, 0.08)",
        card: "0px 12px 12px rgba(50, 50, 71, 0.08)",
      },
      boxShadow: {
        button: "0px 4px 4px rgba(50, 50, 71, 0.08)",
        card: "0px 12px 12px rgba(50, 50, 71, 0.08)",
      },
    },
  },
  plugins: [],
};
