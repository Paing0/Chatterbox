/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-blue": "rgb(59,71,213)",
        graphite: "rgb(45,45,45)",
      },
    },
  },
  plugins: [],
};
