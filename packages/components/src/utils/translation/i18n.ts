import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

import * as enTranslation from './en.json'

export const resources = {
  en: { translation: enTranslation },
}

// Initialize the internationalization library
i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
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
