import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-to-br': 'bg-gradient-to-b from-neutral-50 to-sky-100'
      }
    },
  },
  plugins: [],
} satisfies Config;
