console.log("✅ tailwind.config.js 読み込まれてるよ！");

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'sensee-sky': '#3A77F5',
        'sensee-green': '#3AC18E',
        'sensee-ivory': '#FAFAF8',
        'sensee-cream': '#FFFDF8',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};