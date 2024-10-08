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
      {
        name: 'LoadingComponent',
        module: 'components',
        use: 'LoadingIndicator from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        name: 'showSnackBar',
        module: 'utils/common',
        use: 'SnackbarProvider with useSnackbar hook from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        nameRegExp: 'react-native-toast-notifications',
        use: 'SnackbarProvider with useSnackbar hook from @department-of-veterans-affairs/mobile-component-library',
      },
    ],
  },
}
