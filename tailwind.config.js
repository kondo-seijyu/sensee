console.log("✅ tailwind.config.js 読み込まれてるよ！");

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto)', ...defaultTheme.fontFamily.sans],
        rounded: ['var(--font-kosugi)', 'sans-serif',],
      },
      colors: {
        primary: '#A7D8DE',         // スカイブルー（主軸色）
        secondary: '#F6F4EB',       // くすみアイボリー（サブ色）
        accentGreen: '#B5D8B1',     // ナチュラルグリーン（アクセント1）
        accentMustard: '#EAC67A',   // ハニーマスタード（アクセント2）
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
  plugins: [require('@tailwindcss/line-clamp'),],
};