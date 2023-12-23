/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
   daisyui: {
     themes: [
       {
         dark: {
           "primary": "#5793ce",
           "secondary": "#040404",
         "accent": "#F8F1E8",
           "neutral": "#5793ce",
           "base-200": "#979798",
           "base-300": "#59636d",
      
          }
       }, {
         light: {
           "primary": "#5793ce",
           "secondary": "#5793ce",
         "accent": "#212529",
           "neutral": "#040404",
           "base-200": "#5793ce",
           "base-300": "white",
          
       }
       }],
  },
}

