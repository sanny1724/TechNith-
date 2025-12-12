/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'tech-bg': '#0f172a', // Slate 900
                'tech-card': '#1e293b', // Slate 800
                'tech-primary': '#3b82f6', // Blue 500
                'tech-accent': '#06b6d4', // Cyan 500
            }
        },
    },
    plugins: [],
}
