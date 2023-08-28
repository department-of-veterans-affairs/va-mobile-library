import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import * as enTranslation from './en.json'

let localization
try {
  localization = require('expo-localization')
} catch {
  localization = require('react-native-localize')
}

const fallbackLanguage = { languageTag: 'en', isRTL: false }
const defaultLanguage = localization.getLocales()[0] || fallbackLanguage

export const resources = {
  en: { translation: enTranslation },
}

// Initialize the internationalization library
i18n.use(initReactI18next).init({
  lng: defaultLanguage.languageTag,
  resources,
  keySeparator: false,
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  debug: true,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    useSuspense: true,
  },
})

export default i18n
