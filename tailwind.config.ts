import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin'

/**
 * utility class presets
 */
function _presets() {
  const shapes = ['circle', 'ellipse'];
  const pos = {
    c: 'center',
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    tl: 'top left',
    tr: 'top right',
    bl: 'bottom left',
    br: 'bottom right',
  };
  let result = {};
  for (const shape of shapes)
    for (const [posName, posValue] of Object.entries(pos))
      result[`${shape}-${posName}`] = `${shape} at ${posValue}`;

  return result;
}

const radialGradientPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        // map to bg-radient-[*]
        'bg-radient': value => ({
          'background': `radial-gradient(farthest-corner at 170px 40px, #26c8eb42, transparent 400px),
          radial-gradient(farthest-corner at 80% 80%, #26c8eb42, transparent 400px)`,
        }),
      },
      { values: theme('radialGradients') }
    )
  },
  {
    theme: {
      radialGradients: _presets(),
    },
  }
)

const config: Config = {
  corePlugins: {
    fontFamily: false
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-50': '#e1f7fd',
        'primary-100': '#b4ebfa',
        'primary-200': '#82dff6',
        'primary-300': '#4fd2f0',
        'primary-400': '#26c8eb',
        'primary-500': '#09bee5',
        'primary-600': '#01B0D1',
        'primary-700': '#009ab6',
        'primary-800': '#00869d',
        'primary-900': '#006370',
        'secondary-50': '#cbf4ff',
        'secondary-100': '#a7def5',
        'secondary-200': '#87c2dd',
        'secondary-300': '#62a7c5',
        'secondary-400': '#4593b3',
        'secondary-500': '#1c7fa1',
        'secondary-600': '#01708f',
        'secondary-700': '#005c79',
        'secondary-800': '#004963',
        'secondary-900': '#00344b',
        'neutral-50': '#f8f8fc',
        'neutral-100': '#f0f0f4',
        'neutral-200': '#e6e6ea',
        'neutral-300': '#d6d6da',
        'neutral-400': '#b2b2b6',
        'neutral-500': '#929295',
        'neutral-600': '#6a6a6d',
        'neutral-700': '#56565a',
        'neutral-800': '38383b',
        'neutral-900': '#18181b',
        'success-10': '#05bb851A',
        'success-30': '#05bb854D',
        'success-100': '#05BB85',
        'error-10': '#D143431A',
        'error-30': '#D143434D',
        'error-100': '#D14343',
        'warning-main': '#F2A818',
        'warning-10': '#FEF7E8',
        'success-main': '#05BB85',
        dark: {
          'primary-50': '#e4e8ef',
          'primary-100': '#bcc5d8',
          'primary-200': '#91a0be',
          'primary-300': '#677ba3',
          'primary-400': '#466192',
          'primary-500': '#214782',
          'primary-600': '#1a407a',
          'primary-700': '#0E3163',
          'neutral-700': '#10376f',
          'primary-800': '#082e63',
          'primary-900': '#001e4c',
        },
      }
    },
  },
  plugins: [radialGradientPlugin],
};
export default config;
