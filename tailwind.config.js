/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        'blue-500': '#3b82f6',
        'blue-600': '#2563eb',
        'purple-500': '#8b5cf6',
        'purple-600': '#7c3aed',
        'green-500': '#10b981',
        'green-600': '#059669',
        'red-500': '#ef4444',
        'red-600': '#dc2626',
        'yellow-500': '#f59e0b',
        'yellow-600': '#d97706',
        'pink-500': '#ec4899',
        'pink-600': '#db2777',
        'indigo-500': '#6366f1',
        'indigo-600': '#4f46e5',
        'gray-500': '#6b7280',
        'gray-600': '#4b5563',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}