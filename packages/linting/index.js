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
        name: 'snackbar',
        use: 'useSnackbar hook from @department-of-veterans-affairs/mobile-component-library',
      },
      {
        name: 'ToastType',
        module: 'react-native-toast-notifications/lib/typescript/toast',
      },
      {
        name: 'ToastOptions',
        module: 'react-native-toast-notifications/lib/typescript/toast',
      },
      {
        name: 'ToastContainer',
        module: 'react-native-toast-notifications',
      },
      {
        name: 'Toast',
        module: 'react-native-toast-notifications/lib',
      },
    ],
  },
}
