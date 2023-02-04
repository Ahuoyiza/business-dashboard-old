/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Arial', 'Helvetica', 'sans-serif'],
      },
      keyframes: {
        appear: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        appear: 'appear 300ms ease-in',
      },
      colors: {
        'daabo-primary': {
          DEFAULT: '#6B4EFF',
          50: '#FFFFFF',
          100: '#F3F1FF',
          200: '#D1C8FF',
          300: '#AFA0FF',
          400: '#8D77FF',
          500: '#6B4EFF',
          600: '#3C16FF',
          700: '#2400DD',
          800: '#1B00A5',
          900: '#12006D',
        },
        'daabo-white': '#f3f3f3',
        'daabo-grey': '#808080',
        'daabo-light-grey': '#e5e5e5',
        'daabo-black': '#060809',
      },
      spacing: {
        gutter: 'var(--gutter)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};
