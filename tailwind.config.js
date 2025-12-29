/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./stories/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hai: {
          bg: "#f8f9fa",
          border: "#dee2e6",
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
      },
      height: {
        "hai-xs": "34px",
        "hai-sm": "45px",
        "hai-md": "62px",
        "hai-lg": "78px",
        "hai-xl": "101px",
      },
      spacing: {
        "hai-gap": "2px",
        "furo-gap": "8px",
      },
    },
  },
  plugins: [],
};
