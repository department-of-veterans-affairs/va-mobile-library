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
    ],
    'deprecate/import': [
      'warn',
      {
        name: 'ClickForActionLink',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
    'deprecate/import': [
      'warn',
      {
        name: 'ClickToCallPhoneNumber',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
    'deprecate/import': [
      'warn',
      {
        name: 'AttachmentLink',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
  },
}
