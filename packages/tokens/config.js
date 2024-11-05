module.exports = {
  source: [
    '../../node_modules/@department-of-veterans-affairs/css-library/dist/tokens/json/variables.json',
    'src/tokens/**/*.json',
  ],
  platforms: {
    rn: {
      transformGroup: 'rn',
      buildPath: './dist/',
      prefix: '',
      files: [
        // Indexes
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations/module',
        },
        {
          destination: 'js/index.js',
          format: 'javascript/es6/vads-module-export',
        },
        {
          destination: 'js/font/index.js',
          format: 'javascript/es6/fontIndex',
        },
        {
          destination: 'types/font/index.d.ts',
          format: 'typescript/es6-declarations/fontIndex',
        },
        // JS defs
        {
          destination: 'js/colors.js',
          format: 'javascript/es6/simple-key-value',
          filter: 'filter/color/is-color',
          options: {
            exportName: 'colors',
          },
        },
        {
          destination: 'js/font/family.js',
          format: 'javascript/es6/simple-key-value',
          filter: 'filter/font/family-npm',
          options: {
            exportName: 'family',
          },
        },
        {
          destination: 'js/font/letterSpacing.js',
          format: 'javascript/es6/simple-key-value',
          filter: 'filter/font/letter-spacing-npm',
          options: {
            exportName: 'letterSpacing',
            noSort: true,
          },
        },
        {
          destination: 'js/font/lineHeight.js',
          format: 'javascript/es6/simple-key-value',
          filter: 'filter/font/line-height-npm',
          options: {
            exportName: 'lineHeight',
            noSort: true,
          },
        },
        {
          destination: 'js/font/size.js',
          format: 'javascript/es6/simple-key-value',
          filter: 'filter/font/size-npm',
          options: {
            exportName: 'size',
            noSort: true,
          },
        },
        {
          destination: 'js/font/typography.js',
          format: 'javascript/es6/simple-key-value',
          filter: 'filter/font/composite-npm',
          options: {
            exportName: 'typography',
          },
        },
        {
          destination: 'js/spacing.js',
          format: 'javascript/es6/simple-key-value',
          filter: 'filter/spacing/is-spacing',
          options: {
            exportName: 'spacing',
            noSort: true,
          },
        },
        {
          destination: 'js/themes.js',
          format: 'javascript/es6/vads-colors-themes',
        },
        // TS defs
        {
          destination: 'types/colors.d.ts',
          format: 'typescript/es6-declarations/simple-key-value',
          filter: 'filter/color/is-color',
          options: {
            exportName: 'colors',
            tokenTyping: 'string',
            noGlobalDoc: true,
          },
        },
        {
          destination: 'types/font/family.d.ts',
          format: 'typescript/es6-declarations/simple-key-value',
          filter: 'filter/font/family-npm',
          options: {
            exportName: 'family',
            tokenTyping: 'string',
          },
        },
        {
          destination: 'types/font/letterSpacing.d.ts',
          format: 'typescript/es6-declarations/simple-key-value',
          filter: 'filter/font/letter-spacing-npm',
          options: {
            exportName: 'letterSpacing',
            noSort: true,
          },
        },
        {
          destination: 'types/font/lineHeight.d.ts',
          format: 'typescript/es6-declarations/simple-key-value',
          filter: 'filter/font/line-height-npm',
          options: {
            exportName: 'lineHeight',
            noSort: true,
          },
        },
        {
          destination: 'types/font/size.d.ts',
          format: 'typescript/es6-declarations/simple-key-value',
          filter: 'filter/font/size-npm',
          options: {
            exportName: 'size',
            noSort: true,
          },
        },
        {
          destination: 'types/font/typography.d.ts',
          format: 'typescript/es6-declarations/composite',
          filter: 'filter/font/composite-npm',
          options: {
            exportName: 'typography',
          },
        },
        {
          destination: 'types/spacing.d.ts',
          format: 'typescript/es6-declarations/simple-key-value',
          filter: 'filter/spacing/is-spacing',
          options: {
            exportName: 'spacing',
            noSort: true,
          },
        },
        {
          destination: 'types/themes.d.ts',
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
          destination: `fonts.json`,
          format: 'json/dtcg',
          filter: 'filter/font-figma',
          options: {
            noSort: true,
          },
        },
        {
          destination: `light.json`,
          format: 'json/dtcg',
          filter: 'filter/color/light-mode',
        },
        {
          destination: `spacing.json`,
          format: 'json/dtcg',
          filter: 'filter/spacing/is-spacing',
          options: {
            noSort: true,
          },
        },
      ],
    },
  },
}
