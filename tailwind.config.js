/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hai: {
          bg: "#f8f6f0",
          border: "#c9c5b8",
          shadow: "rgba(0, 0, 0, 0.1)",
          manzu: "#8B4513",
          pinzu: "#DC143C",
          souzu: "#228B22",
          jihai: "#1a1a1a",
          selected: "#2563EB",
          highlighted: "#FEF3C7",
        },
      },
      width: {
        "hai-xs": "24px",
        "hai-sm": "32px",
        "hai-md": "44px",
        "hai-lg": "56px",
        "hai-xl": "72px",
        // 回転時用（高さと幅が入れ替わる）
        "hai-xs-rotated": "34px",
        "hai-sm-rotated": "45px",
        "hai-md-rotated": "62px",
        "hai-lg-rotated": "78px",
        "hai-xl-rotated": "101px",
      },
      height: {
        "hai-xs": "34px",
        "hai-sm": "45px",
        "hai-md": "62px",
        "hai-lg": "78px",
        "hai-xl": "101px",
        // 回転時用（高さと幅が入れ替わる）
        "hai-xs-rotated": "24px",
        "hai-sm-rotated": "32px",
        "hai-md-rotated": "44px",
        "hai-lg-rotated": "56px",
        "hai-xl-rotated": "72px",
      },
      spacing: {
        "hai-gap": "2px",
        "furo-gap": "8px",
      },
      boxShadow: {
        hai: "0 1px 2px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
        "hai-back": "0 1px 2px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
