import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      screens: {
				// sm: "576px",
				// md: "768px",
				// lg: "992px",
				// xl: "1200px",
				// xd: "1300px",
				// "xxl": "1600px",
			},
      colors: {
        green: "#3E9767",
      }
    },
    fontFamily: {
      sans: ["Roboto", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};



