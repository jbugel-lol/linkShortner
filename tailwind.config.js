/** @type {import('tailwindcss').Config} */

import catppuccin from '@catppuccin/daisyui';
import { default as catppuccin_tailwindcss } from "@catppuccin/tailwindcss";
import daisyui from 'daisyui';


export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },

  plugins: [
    catppuccin_tailwindcss({
      prefix: 'ctp',
      defaultFlavour: 'mocha'
    }),
    daisyui
  ],
  daisyui: {
    themes: [
      catppuccin('mocha', { primary: 'lavender', secondary: 'green' }),
    ],
  },
};