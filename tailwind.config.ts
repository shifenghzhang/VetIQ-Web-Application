import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        customSkyBlue: 'rgb(230, 237, 240)',
        customDarkBlue: 'rgb(0, 146, 226),',
        customBlack: 'rgb(50, 48, 47)'
      }
    },
  },
  plugins: [],
} satisfies Config;
