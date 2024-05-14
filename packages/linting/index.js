module.exports = {
  plugins: ['deprecate'],
  rules: {
    'deprecate/import': [
      'warn',
      {
        name: 'VAButton',
        module: 'components',
        use: 'Button from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        name: 'ClickForActionLink',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        name: 'AlertBox',
        module: 'components',
        use: 'Alert from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        name: 'CollapsibleAlert',
        module: 'components',
        use: 'Alert from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
  },
}
