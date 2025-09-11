import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        forest: '#0b3d2e',
        brown: '#66513c',
        stone: '#6b7280',
        accent: '#0ea5e9',
        accent7: '#0369a1',
        paper: '#f8fafc'
      },
      fontFamily: {
        ui: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        head: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
      }
    }
  },
  plugins: []
}
export default config
