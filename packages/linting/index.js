module.exports = {
  plugins: ['deprecate'],
  rules: {
    semi: [1, 'always'],
    'deprecate/import': [
      'warn',
      {
        name: 'SegmentedControl',
        module: 'components',
        use: 'SegmentedControl from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        name: 'VAButton',
        module: 'components',
        use: 'Button from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
  },
}
