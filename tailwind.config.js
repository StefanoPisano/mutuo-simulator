/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
        colors: {
            "antiflash-white": "#E8E9ED",
            "yimin-blue": "#355070",
            "french-gray": "#BABFD1",
            "chocolate-cosmos": "#49111C",
            "coral": "#EF8354"
        },
        fontFamily: {
            title: ["Science Gothic", "sans-serif"]
        }
    },
  },
  plugins: [],
}