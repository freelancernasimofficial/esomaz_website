import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        sm2: "15px",
        sm3: "14px",
        sm4: "13px",
        sm5: "12px",
        sm6: "11px",
        sm7: "10px",
      },
      screens: {
        xs: "420px",
        // => @media (min-width: 420px) { ... }
        sm2: "500px",
        // => @media (min-width: 500px) { ... }

        md2: "868px",
        // => @media (min-width: 868px) { ... }

        lg2: "1124px",
        // => @media (min-width: 1124px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
