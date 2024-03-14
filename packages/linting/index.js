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
        name: 'ClickToCallPhoneNumber',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        name: 'AttachmentLink',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
  },
}
