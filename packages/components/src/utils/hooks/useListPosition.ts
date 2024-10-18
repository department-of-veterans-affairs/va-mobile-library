import { useTranslation } from 'react-i18next'
import { AccessibilityValue } from 'react-native'

/** Returns list position used for accessibilityValues */
export function useListPosition(
  position: number,
  total: number,
): AccessibilityValue {
  const { t } = useTranslation()

  return {
    text: t('listPosition', {
      position,
      total,
    }),
  }
}
