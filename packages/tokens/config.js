module.exports = {
  source: [
    '../../node_modules/@department-of-veterans-affairs/css-library/dist/tokens/json/variables.json',
    'src/tokens/color/uswds.json',
    'src/tokens/color/semantic-light.json',
    'src/tokens/color/component-light.json',
    'src/tokens/color/semantic-dark.json',
    'src/tokens/color/component-dark.json',
  ],
  platforms: {
    rn: {
      transformGroup: 'rn',
      buildPath: './dist/',
      prefix: '',
      files: [
        {
          destination: 'js/colors.js',
          format: 'javascript/es6/vads-colors',
          filter: 'filter/color/is-color',
        },
        {
          destination: 'js/themes.js',
          format: 'javascript/es6/vads-colors-themes',
        },
        {
          destination: 'js/index.js',
          format: 'javascript/es6/vads-module-export',
        },
        {
          destination: 'types/colors.d.ts',
          format: 'typescript/es6-declarations/colors',
          filter: 'filter/color/is-color',
        },
        {
          destination: 'types/theme.d.ts',
          format: 'typescript/es6-declarations/theme',
          filter: 'filter/color/light-mode',
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations/module',
        },
      ],
    },
    figma: {
      transformGroup: 'figma',
      buildPath: './figma/',
      files: [
        {
          destination: `light.json`,
          format: 'json/dtcg',
          filter: 'filter/color/light-mode',
        },
        {
          destination: `dark.json`,
          format: 'json/dtcg',
          filter: 'filter/color/dark-mode',
        },
      ],
    },
  },
}
