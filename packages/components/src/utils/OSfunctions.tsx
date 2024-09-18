/** A file for functions that leverage OS functionality */

import { Platform } from 'react-native'

// Export related hooks
export { useExternalLink } from './hooks/useExternalLink'

/** True if iOS; a function to pull real time for unit tests so it can be changed */
export const isIOS = () => Platform.OS === 'ios'

/** True if Android; a function to pull real time for unit tests so it can be changed */
export const isAndroid = () => Platform.OS === 'android'

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

  if (isIOS()) {
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
