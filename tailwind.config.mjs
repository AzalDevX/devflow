/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Nueva paleta principal
        primary: {
          50: '#f4eef4',
          100: '#e8dce8',
          200: '#d1bad1',
          300: '#b997ba',
          400: '#a275a3',
          500: '#985f99', // pomp-and-power base
          600: '#7a4c7a',
          700: '#5b395c',
          800: '#3d263d',
          900: '#1e131f',
          950: '#0f090f',
        },
        secondary: {
          50: '#f5f3f7',
          100: '#ebe7ef',
          200: '#d7cfdf',
          300: '#c3b7cf',
          400: '#af9fbf',
          500: '#9684a1', // mountbatten-pink base
          600: '#786a81',
          700: '#5a4f60',
          800: '#3c3440',
          900: '#1e1a20',
          950: '#0f0d10',
        },
        neutral: {
          50: '#f7f7f8',
          100: '#eff0f1',
          200: '#dee0e2',
          300: '#cecfd3',
          400: '#bdbec3',
          500: '#aaacb0', // french-gray base
          600: '#88898d',
          700: '#66676a',
          800: '#444446',
          900: '#222223',
          950: '#111112',
        },
        nature: {
          50: '#f8faf8',
          100: '#f0f4f1',
          200: '#e1e9e3',
          300: '#d2ddd4',
          400: '#c4d2c6',
          500: '#b6c9bb', // ash-gray base
          600: '#92a196',
          700: '#6d7970',
          800: '#49504b',
          900: '#242825',
          950: '#121413',
        },
        accent: {
          50: '#f9fdf9',
          100: '#f2fbf3',
          200: '#e6f7e7',
          300: '#d9f4db',
          400: '#ccf0cf',
          500: '#bfedc1', // tea-green base
          600: '#99be9a',
          700: '#738e74',
          800: '#4c5f4d',
          900: '#262f27',
          950: '#131813',
        },
        // Mantener surface para contraste en modo oscuro
        surface: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#2e2e2e',
        },
      },
      // Añadir gradientes personalizados
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--tw-colors-primary-500), var(--tw-colors-secondary-500))',
        'gradient-nature': 'linear-gradient(135deg, var(--tw-colors-nature-500), var(--tw-colors-accent-500))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

