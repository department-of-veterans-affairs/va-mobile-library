import { AccessibilityValue } from 'react-native'
import { useTranslation } from 'react-i18next'

/** Returns list position used for accessibilityValues */
export function useA11yListPosition(
  index: number,
  total: number,
): AccessibilityValue {
  const { t } = useTranslation()

  return {
    text: t('listPosition', {
      position: index + 1,
      total,
    }),
  }
}
