import { initReactI18next } from 'react-i18next'
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector'
import i18n from 'i18next'

import * as enTranslation from './en.json'

export const resources = {
  en: { translation: enTranslation },
}

// Initialize the internationalization library

// Use RNLanguageDetector only if mobile
if (process.env.STORYBOOK_WEB !== 'true') {
  i18n.use(RNLanguageDetector)
}

if (i18n.isInitializing || i18n.isInitialized) {
  i18n.use(initReactI18next).createInstance({
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
} else {
  i18n.use(initReactI18next).init({
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
}

export default i18n
