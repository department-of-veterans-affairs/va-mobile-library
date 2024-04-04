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
          destination: 'js/index.js',
          format: 'javascript/es6/vads-colors',
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations/colors',
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
          filter: 'notDarkMode',
        },
        {
          destination: `dark.json`,
          format: 'json/dtcg',
          filter: 'notLightMode',
        },
      ],
    },
  },
}
