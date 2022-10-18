module.exports = {
  content: ['./src/**/*.{html,js}'],

  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [require('autoprefixer'), require('@tailwindcss/forms')],
};
