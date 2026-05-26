import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Config>{
  darkMode: 'class',
  plugins: [typography],
  content: [
    './app/**/*.{vue,ts,js}',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        // 使用 CSS 变量，方便暗色模式切换
        background: 'var(--color-bg)',
        'background-secondary': 'var(--color-bg-secondary)',
        foreground: 'var(--color-text)',
        'foreground-secondary': 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
      },
      maxWidth: {
        content: '720px',
        wide: '1280px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
