import { useTranslation } from 'react-i18next'

/** Returns list position used for accessibilityValues */
export function useA11yListPosition(index: number, total: number): string {
  const { t } = useTranslation()

  return t('listPosition', {
    position: index + 1,
    total,
  })
}
