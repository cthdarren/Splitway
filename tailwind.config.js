/** @type {import('tailwindcss').Config} */
import colors from "./colors"

module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: colors.primary,
                secondary: colors.secondary,
                inactive: colors.inactive,
                danger: colors.danger 
            }
        }
    },
    plugins: []
};
