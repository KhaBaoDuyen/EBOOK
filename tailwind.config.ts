import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {},
    },
    plugins: [
        require("tailwind-scrollbar-hide")
    ],
};

export default config;
