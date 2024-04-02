/** A file for functions that leverage OS functionality */

import { Alert, Linking, Platform } from 'react-native'
import { LinkAnalytics } from '../components/Link/Link'
import { useTranslation } from 'react-i18next'

export const isIOS = Platform.OS === 'ios'

type address = {
  street: string
  city: string
  /** 2 letter state abbreviation */
  state: string
  zipCode: string
}

type hasAddress = {
  name: string
  address: address
  latitude?: number
  longitude?: number
}

type hasLatLong = {
  name: string
  address?: address
  latitude: number
  longitude: number
}

export type LocationData = hasAddress | hasLatLong

const APPLE_MAPS_BASE_URL = 'https://maps.apple.com/'
const GOOGLE_MAPS_BASE_URL = 'https://www.google.com/maps/dir/'

/** Function to convert location data into a URL for handling by Apple/Google Maps */
export const FormDirectionsUrl = (location: LocationData): string => {
  const { name, address, latitude, longitude } = location
  const addressString = Object.values(address || {}).join(' ')

  if (isIOS) {
    const queryString = new URLSearchParams({
      t: 'm', // type: map
      daddr: `${addressString}+${name}+${latitude},${longitude}`,
    }).toString()
    return `${APPLE_MAPS_BASE_URL}?${queryString}`
  } else {
    const queryString = new URLSearchParams({
      api: '1',
      destination: addressString || `${latitude},${longitude}`,
    }).toString()
    return `${GOOGLE_MAPS_BASE_URL}?${queryString}`
  }
}

export type leaveAppPromptText = {
  body?: string
  cancel?: string
  confirm?: string
  title?: string
}

/**
 * Hook to handle a link that leaves the app; conditionally displays alert prior to leaving
 */
export function useExternalLink(): (
  url: string,
  analytics?: LinkAnalytics,
  text?: leaveAppPromptText,
) => void {
  const { t } = useTranslation()

  return (
    url: string,
    analytics?: LinkAnalytics,
    text?: leaveAppPromptText,
  ) => {
    if (analytics?.onPress) analytics.onPress()
    console.log('useExternalLink: ', url, analytics, text)

    const onCancelPress = () => {
      if (analytics?.onCancel) analytics.onCancel()
    }

    const onOKPress = () => {
      if (analytics?.onConfirm) analytics.onConfirm()
      return Linking.openURL(url)
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
          onPress: (): Promise<void> => onOKPress(),
          style: 'default',
        },
      ])
    } else {
      Linking.openURL(url)
    }
  }
}
