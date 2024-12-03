module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure these paths match your structure
    theme: {
        extend: {
            colors: {
                green: "#1D8541",
                gray: "#F1F1F1",
                black: "#000",
                white: "#FFFFFF",
                "gray-text": "#767676",
                "space-everyday": "#91F187",
                "space-save": "#F3B476",
                "space-borrow": "#A19FF8",
                "space-insure": "#EBB5EE",
            },
            fontFamily: {
                sans: ["GT Ultra Standard", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
