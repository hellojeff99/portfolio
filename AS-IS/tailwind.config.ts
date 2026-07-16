import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: "#1e3a8a",
                    light: "#1e40af",
                    pale: "#eff6ff",
                },
            },
        },
    },
    plugins: [],
};

export default config;