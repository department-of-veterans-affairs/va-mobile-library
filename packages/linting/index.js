module.exports = {
  plugins: ['deprecate'],
  rules: {
    'deprecate/import-va-button': [
      'warn',
      {
        name: 'VAButton',
        module: 'components',
        use: 'Button from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
    'deprecate/import-click-for-action-link': [
      'warn',
      {
        name: 'ClickForActionLink',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
    'deprecate/import-click-to-call-phone-number': [
      'warn',
      {
        name: 'ClickToCallPhoneNumber',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
    'deprecate/import-attachment-link': [
      'warn',
      {
        name: 'AttachmentLink',
        module: 'components',
        use: 'Link from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
  },
}
