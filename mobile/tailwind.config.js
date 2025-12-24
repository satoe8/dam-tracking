/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B",
        secondary: "#FBBF24",
        accent: "#10B981",
        danger: "#EF4444",
        background: "#FEF3C7",
        card: "#FFFBEB",
      },
    },
  },
  plugins: [],
}
