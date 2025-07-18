import { NativeModules } from 'react-native'

NativeModules.SettingsManager = {
  ...NativeModules.SettingsManager,
  settings: { AppleLocale: 'en_US' },
}

NativeModules.I18nManager = {
  ...NativeModules.I18nManager,
  localeIdentifier: 'en_US',
}
