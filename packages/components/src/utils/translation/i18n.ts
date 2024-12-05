import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import * as enTranslation from './en.json'

export const resources = {
  en: { translation: enTranslation },
}

// TODO: Detect language on mobile

// If i18n is already initialized (in app), add our translations to the common namespace
if (i18n.isInitializing || i18n.isInitialized) {
  i18n.addResourceBundle('en', 'common', resources.en.translation)
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
