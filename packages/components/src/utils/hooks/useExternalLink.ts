import { Alert, Linking } from 'react-native'
import { useTranslation } from 'react-i18next'

import { LinkAnalytics } from '../../components/Link/Link'
import { leaveAppPromptText } from '../OSfunctions'

/**
 * Hook to handle a link that leaves the app; conditionally displays alert prior to leaving
 */
export function useExternalLink(): (
  url: string,
  analytics?: LinkAnalytics,
  text?: leaveAppPromptText,
) => void {
  const { t } = useTranslation()

  return async (
    url: string,
    analytics?: LinkAnalytics,
    text?: leaveAppPromptText,
  ) => {
    if (analytics?.onPress) analytics.onPress()

    const onCancelPress = () => {
      if (analytics?.onCancel) analytics.onCancel()
    }

    const onOKPress = async () => {
      try {
        if (analytics?.onConfirm) analytics.onConfirm()
        await Linking.openURL(url)
      } catch (e) {
        if (analytics?.onOpenURLError) analytics.onOpenURLError(e, url)
      }
    }

    const body = text?.body ? text.body : t('leaveAppAlert.body')
    const cancel = text?.cancel ? text.cancel : t('goBack')
    const confirm = text?.confirm ? text.confirm : t('leave')
    const title = text?.title ? text.title : t('leaveAppAlert.title')

    if (url.startsWith('http')) {
      Alert.alert(title, body, [
        {
          text: cancel,
          style: 'cancel',
          onPress: onCancelPress,
        },
        {
          text: confirm,
          onPress: async (): Promise<void> => onOKPress(),
          style: 'default',
        },
      ])
    } else {
      try {
        await Linking.openURL(url)
      } catch (e) {
        if (analytics?.onOpenURLError) analytics.onOpenURLError(e, url)
      }
    }
  }
}
