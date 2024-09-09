module.exports = {
  source: [
    '../../node_modules/@department-of-veterans-affairs/css-library/dist/tokens/json/variables.json',
    'src/tokens/color/uswds.json',
    'src/tokens/color/semantic-light.json',
    'src/tokens/color/component-light.json',
    'src/tokens/color/semantic-dark.json',
    'src/tokens/color/component-dark.json',
    'src/tokens/spacing/spacing.json',
  ],
  platforms: {
    rn: {
      transformGroup: 'rn',
      buildPath: './dist/',
      prefix: '',
      files: [
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations/module',
        },
        {
          destination: 'js/colors.js',
          format: 'javascript/es6/vads-colors',
          filter: 'filter/color/is-color',
        },
        {
          destination: 'js/index.js',
          format: 'javascript/es6/vads-module-export',
        },
        {
          destination: 'js/spacing.js',
          format: 'javascript/es6/vads-spacing',
          filter: 'filter/spacing/is-spacing',
        },
        {
          destination: 'js/themes.js',
          format: 'javascript/es6/vads-colors-themes',
        },
        {
          destination: 'types/colors.d.ts',
          format: 'typescript/es6-declarations/colors',
          filter: 'filter/color/is-color',
        },
        {
          destination: 'types/spacing.d.ts',
          format: 'typescript/es6-declarations/spacing',
          filter: 'filter/spacing/is-spacing',
        },
        {
          destination: 'types/theme.d.ts',
          format: 'typescript/es6-declarations/theme',
          filter: 'filter/color/light-mode',
        },
      ],
    },
    figma: {
      transformGroup: 'figma',
      buildPath: './figma/',
      files: [
        {
          destination: `dark.json`,
          format: 'json/dtcg',
          filter: 'filter/color/dark-mode',
        },
        {
          destination: `light.json`,
          format: 'json/dtcg',
          filter: 'filter/color/light-mode',
        },
      ],
    },
  },
}
