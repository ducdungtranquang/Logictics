module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      screens: {
        "custom-screen": "1415px",
      },
      zIndex: {
        100: "100",
      },
      colors: {
        primary: "#F0B90B",
        border_color: "#fcd535",
        button_color: "#e5a663",
      },
      backgroundImage: {
        history: "url('/src/assets/images/vietnamwhite.png')",
      },
      keyframes: {
        up: {
          '0%': {
            transform: 'translateY(25px)',
            opacity: 0
          },
          '100%':{
            transform: 'translateY(0)',
            opacity: 1
          }
        },
        modal:{
          '0%':{
            opacity: 0,
            transform: 'translateY(-150px)',
          },
          '100%':{
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        menu_in:{
          '0%':{
            opacity: 0,
            transform: 'translateX(-150px)',
          },
          '100%':{
            opacity: 1,
            transform: 'translateX(0)'
          }
        },

      },
      animation:{
        'up':'up 0.3s ease-in-out',
        'modal_in':'modal 0.3s ease',
        'menu_in':'menu_in 0.3s ease-in-out',
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@media (min-width: 640px)": {
            maxWidth: "640px",
          },
          "@media (min-width: 768px)": {
            maxWidth: "768px",
          },
          "@media (min-width: 1024px)": {
            maxWidth: "960px",
          },
          "@media (min-width: 1280px)": {
            maxWidth: "1140px",
          },
        },
      });
    },
    require("@tailwindcss/line-clamp"),
  ],
};
